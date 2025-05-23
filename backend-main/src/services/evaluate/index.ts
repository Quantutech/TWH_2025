import Service from '../../decorators/service';
import DBService from '../core/database';
import Inject from '../../decorators/inject';
import { BadRequestError } from '../../errors/custom-errors';
import { Sequelize } from 'sequelize-typescript';
import {
  EvaluateWithClient,
  WaitingTimeEnum,
  WaitingTimeLabels,
} from '../../types/common-types';
import Evaluate from '../../models/Evaluate';
import Client from '../../models/Client';

@Service()
export default class EvaluateService {
  constructor(@Inject() private readonly databaseManager: DBService) {}

  public async giveEvaluation(
    providerId: number,
    clientId: number,
    comment: string,
    rating: number,
    suggestion: boolean,
    waitingTime?: WaitingTimeEnum
  ) {
    if (rating < 1 || rating > 5) {
      throw new BadRequestError('Rating must be in range 1-5.');
    }

    await Evaluate.upsert({
      providerId,
      clientId,
      comment,
      rating,
      suggestion,
      waitingTime,
    });

    return { message: 'Evaluation submitted successfully' };
  }

  public async getAvgEvaluation(providerId: number) {
    const [avgRating, suggestionRate, avgWaitingTime, comments] =
      await Promise.all([
        this.getAverageRating(providerId),
        this.getAverageSuggestion(providerId),
        this.getAverageWaitingTime(providerId),
        this.getComments(providerId),
      ]);

    return { avgRating, suggestionRate, avgWaitingTime, comments };
  }

  public async getPaginatedEvaluations(
    providerId: number,
    page: number,
    limit: number
  ) {
    const offset = (page - 1) * limit;

    const result = await Evaluate.findAndCountAll({
      where: { providerId },
      limit,
      offset,
      include: [
        {
          model: Client,
          attributes: ['id', 'firstName', 'lastName'],
        },
      ],
    });

    const evaluations = result.rows.map((eva: EvaluateWithClient) => {
      const firstName = eva.client?.firstName ?? null;
      const lastName = eva.client?.lastName ?? null;

      const avgTime =
        eva.waitingTime !== undefined && eva.waitingTime !== null
          ? parseFloat(eva.waitingTime)
          : null;

      const waitingTime =
        avgTime === null
          ? 'Unknown'
          : avgTime <= 0.5
          ? WaitingTimeLabels[WaitingTimeEnum.ZeroToThirty]
          : avgTime <= 1.5
          ? WaitingTimeLabels[WaitingTimeEnum.ThirtyToSixty]
          : WaitingTimeLabels[WaitingTimeEnum.MoreThanSixty];

      return {
        ...eva.toJSON(),
        firstName,
        lastName,
        waitingTime,
        client: undefined,
      };
    });

    return {
      count: result.count,
      evaluations,
    };
  }

  public async getComments(providerId: number) {
    const result = await Evaluate.findAll({
      attributes: ['comment'],
      where: { providerId },
      raw: true,
    });

    if (!result || result.length === 0) {
      return { message: 'No comments found for this provider.' };
    }

    return result.map((comment) => comment.comment);
  }

  async getAverageRating(providerId: number) {
    const result = (await Evaluate.findOne({
      attributes: [
        [Sequelize.fn('AVG', Sequelize.col('rating')), 'averageRating'],
      ],
      where: { providerId },
      raw: true,
    })) as { averageRating?: string | null };

    return result?.averageRating ? parseFloat(result.averageRating) : null;
  }

  async getAverageSuggestion(providerId: number) {
    const result = (await Evaluate.findOne({
      attributes: [
        [Sequelize.literal('SUM(suggestion::int)'), 'trueCount'],
        [Sequelize.fn('COUNT', Sequelize.col('suggestion')), 'totalCount'],
      ],
      where: { providerId },
      raw: true,
    })) as { trueCount?: string | null; totalCount?: string | null };

    const trueCount = result?.trueCount ? parseInt(result.trueCount) : 0;
    const totalCount = result?.totalCount ? parseInt(result.totalCount) : 0;
    return totalCount > 0 ? (trueCount / totalCount) * 100 : null;
  }

  async getAverageWaitingTime(providerId: number) {
    const result = (await Evaluate.findOne({
      attributes: [
        [Sequelize.fn('AVG', Sequelize.col('waiting_time')), 'avgWaitingTime'],
      ],
      where: { providerId },
      raw: true,
    })) as { avgWaitingTime?: string | null };

    if (!result?.avgWaitingTime) return null;

    const avgTime = parseFloat(result.avgWaitingTime);
    if (avgTime <= 0.5) return WaitingTimeLabels[WaitingTimeEnum.ZeroToThirty];
    if (avgTime <= 1.5) return WaitingTimeLabels[WaitingTimeEnum.ThirtyToSixty];
    return WaitingTimeLabels[WaitingTimeEnum.MoreThanSixty];
  }
}
