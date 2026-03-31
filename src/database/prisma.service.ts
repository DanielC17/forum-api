import { Injectable } from '@nestjs/common';
import { PrismaClient } from '../generated/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      adapter: new PrismaBetterSqlite3({
        connectionString: process.env['DATABASE_URL'],
      }),
    });
  }
}
