import { MikroORM } from "@mikro-orm/core";
import { User } from "./entities/user";

export default {
  entities: [User],
  migrations: {
    path: './migrations', // path to the folder with migrations
    pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
  },
  type: 'postgresql',
  host: process.env.POSTGRES_HOST,
  port: 5432,
  dbName: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  debug: true,
} as Parameters<typeof MikroORM.init>[0];
