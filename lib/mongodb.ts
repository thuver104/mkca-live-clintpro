import { MongoClient, Db } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable in .env.local");
}

interface Cached {
  client: MongoClient | null;
  db: Db | null;
}

declare global {
  // eslint-disable-next-line no-var
  var _mongoCached: Cached | undefined;
}

const cached: Cached = global._mongoCached ?? { client: null, db: null };

if (!global._mongoCached) {
  global._mongoCached = cached;
}

export async function getDb(): Promise<Db> {
  if (cached.db) return cached.db;

  const client = await MongoClient.connect(MONGODB_URI);
  cached.client = client;
  cached.db = client.db("mkca");

  return cached.db;
}
