import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME || "dental_clinic_saas";

if (!uri) {
  throw new Error("MONGODB_URI is not set");
}

/**
 * Serverless-safe connection caching. Vercel functions can reuse a warm container between
 * invocations — without this cache, every request would open a brand-new MongoDB connection
 * and quickly exhaust Atlas's connection limit across all tenants sharing this backend.
 */
declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function getClientPromise(): Promise<MongoClient> {
  if (!global._mongoClientPromise) {
    const client = new MongoClient(uri as string, {
      maxPoolSize: 10,
    });
    global._mongoClientPromise = client.connect();
  }
  return global._mongoClientPromise;
}

export async function getDb(): Promise<Db> {
  const client = await getClientPromise();
  return client.db(dbName);
}
