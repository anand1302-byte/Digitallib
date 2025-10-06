import { MongoClient } from 'mongodb';
import { Logger } from './logger';

if (!process.env.MONGODB_URI) {
  Logger.error('Missing MONGODB_URI environment variable');
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    Logger.info('Creating new MongoDB connection (development)');
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect()
      .then((client) => {
        Logger.success('MongoDB connected successfully (development)');
        return client;
      })
      .catch((error) => {
        Logger.error('MongoDB connection failed (development)', error);
        throw error;
      });
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  Logger.info('Creating new MongoDB connection (production)');
  client = new MongoClient(uri, options);
  clientPromise = client.connect()
    .then((client) => {
      Logger.success('MongoDB connected successfully (production)');
      return client;
    })
    .catch((error) => {
      Logger.error('MongoDB connection failed (production)', error);
      throw error;
    });
}

export default clientPromise;