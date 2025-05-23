import {
  Attributes,
  BulkCreateOptions,
  FindOptions,
  QueryTypes,
  Transaction,
  UpdateOptions,
  WhereOptions,
} from 'sequelize';
import { Model, ModelCtor, Repository } from 'sequelize-typescript';
import { MakeNullishOptional } from 'sequelize/types/utils';
import container from '../../configs/inversify-config';
import { NotFoundError } from '../../errors/custom-errors';
import DBService from '../../services/core/database';

export interface PaginatedResult<T> {
  data: T[];
  meta: {
    totalDocs: number;
    limit: number;
    page: number;
    totalPages: number;
  };
}

interface CountResult {
  totalcount: number;
}

export default abstract class BaseRepository<M extends Model> {
  public model!: Repository<M>;

  constructor(model: ModelCtor<M>) {
    const db = container.get(DBService);
    this.model = db.getConnection().getRepository(model);
  }

  async findAll(options?: FindOptions<M>): Promise<M[]> {
    return this.model
      .findAll<M>(options)
      .then((response) => response.map((result) => result.toJSON()))
      .catch((err) => {
        throw err;
      });
  }

  async findOne(options?: FindOptions<M>): Promise<M | null> {
    return this.model
      .findOne<M>(options)
      .then((response) => response?.toJSON())
      .catch((err) => {
        throw err;
      });
  }

  async paginate(
    options: FindOptions<M>,
    page = 1,
    pageSize = 10
  ): Promise<PaginatedResult<M>> {
    const offset = (page - 1) * pageSize;
    const limit = pageSize;

    const { count, rows } = await this.model.findAndCountAll<M>({
      ...options,
      offset,
      limit,
      distinct: true,
    });

    const totalPages = Math.ceil(count / pageSize);

    return {
      data: rows.map((result) => result.toJSON()),
      meta: { totalDocs: count, totalPages: totalPages, page, limit },
    };
  }

  async create(
    data: MakeNullishOptional<M['_creationAttributes']>,
    transaction?: Transaction
  ): Promise<M> {
    return this.model
      .create<M>(data, { transaction })
      .then((response) => response)
      .catch((err) => {
        throw err;
      });
  }

  async bulkCreate(
    dataArray: MakeNullishOptional<M['_creationAttributes']>[],
    options?: BulkCreateOptions
  ): Promise<M[]> {
    return this.model
      .bulkCreate<M>(dataArray, options)
      .then((response) => response)
      .catch((err) => {
        throw err;
      });
  }

  async update(
    options: FindOptions<M>,
    data: Partial<MakeNullishOptional<M['_creationAttributes']>>,
    transaction?: Transaction
  ): Promise<number> {
    const updateOptions: UpdateOptions = {
      where: options.where as WhereOptions<M>,
      transaction,
    };

    const filteredFilter = Object.fromEntries(
      Object.entries(data).filter(
        ([_, value]) =>
          value === null || (typeof value === 'string' ? value.trim() !== '' : !!value)
      )
    ) as Partial<Attributes<M>>;

    const [affectedCount] = await this.model.update(
      filteredFilter,
      updateOptions
    );

    return affectedCount;
  }


  async delete(
    options: FindOptions<M>,
    transaction?: Transaction
  ): Promise<number> {
    try {
      const result = await this.model.destroy({
        where: options.where as WhereOptions<M>,
        transaction,
      });

      return result;
    } catch (err) {
      throw new Error(`Error during soft delete: ${err}`);
    }
  }

  async bulkUpsert(
    dataArray: MakeNullishOptional<M['_creationAttributes']>[],
    updateFields: (keyof M['_creationAttributes'])[],
    options?: BulkCreateOptions
  ): Promise<M[]> {
    try {
      return await this.model.bulkCreate(dataArray, {
        ...options,
        updateOnDuplicate: updateFields,
      });
    } catch (err) {
      throw new Error(`Bulk upsert error: ${err}`);
    }
  }

  async sqlQueryPaginate<T>(
    query: string,
    countQuery: string,
    page = 1,
    pageSize = 10,
    replacements: { [key: string]: string }
  ): Promise<PaginatedResult<T>> {
    const offset = (page - 1) * pageSize;
    const limit = pageSize;

    const paginatedQuery = `${query} LIMIT ${limit} OFFSET ${offset};`;

    const results = await this.model.sequelize?.query<T[]>(paginatedQuery, {
      type: QueryTypes.SELECT,
      raw: true,
      replacements,
    });

    if (!results || !results[0]) {
      throw new NotFoundError();
    }

    const totalResults = await this.model.sequelize?.query<CountResult>(
      countQuery,
      {
        type: QueryTypes.SELECT,
        raw: true,
        replacements,
      }
    );

    if (!totalResults || !totalResults[0]) {
      throw new NotFoundError();
    }

    const totalDocs = totalResults[0]?.totalcount;
    const totalPages = Math.ceil(totalDocs / pageSize);

    return {
      data: results as T[],
      meta: { totalDocs: Number(totalDocs), totalPages: totalPages, page, limit },
    };
  }

  public async sqlQuerySingleResult<T>(
    query: string,
    replacements: { [key: string]: string }
  ): Promise<T | null> {
    try {
      const results = await this.model.sequelize?.query(query, {
        replacements,
        type: QueryTypes.SELECT,
      });

      if (results && results.length > 0) {
        return results[0] as T;
      }

      return null;
    } catch (error: unknown) {
      if (error instanceof Error) {
        const sqlError = error as { sqlMessage?: string };
        throw new Error(sqlError.sqlMessage || error.message);
      } else {
        throw new Error('An unexpected error occurred');
      }
    }
  }

  async count(options?: FindOptions<M>): Promise<number> {
    try {
      return await this.model.count(options);
    } catch (err) {
      throw err;
    }
  }
}
