import { Table } from 'sequelize-typescript';
import container from '../configs/inversify-config';
import { Target } from '../types/types';

export default function DBModel(tableName: string, paranoid = false) {
  return function (target: Target) {
    Table({
      tableName,
      paranoid,
      timestamps: true,
      underscored: true,
    })(target);
    container.bind(target).toSelf();
  };
}
