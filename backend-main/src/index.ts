import 'reflect-metadata';
import * as dotenv from 'dotenv';
dotenv.config();
import ApplicationLoader from './loaders/application-loader';
import container from './configs/inversify-config';

async function main() {
  const applicationLoader = container.get(ApplicationLoader);
  await applicationLoader.loadAll();
}

main();
