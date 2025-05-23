import Client from '../models/Client';
import Provider from '../models/Provider';

type User = Client | Provider;
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
