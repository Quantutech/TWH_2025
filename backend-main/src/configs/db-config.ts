import { Dialect } from 'sequelize';

const DBConfig = {
  name: process.env.DB_DATABASE,
  driver: (process.env.DB_CONNECTION || 'postgres') as Dialect,
  username: process.env.DB_USERNAME,
  port: Number(process.env.DB_PORT) || 3306,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST || 'localhost',
};

export default DBConfig;
