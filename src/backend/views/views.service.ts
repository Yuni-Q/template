import { Injectable, OnModuleInit } from '@nestjs/common';
import next from 'next';
import * as next_1 from 'next/dist/server/next';

@Injectable()
export class ViewsService implements OnModuleInit {
  private server; //: NextServer;

  async onModuleInit(): Promise<void> {
    try {
      this.server = next({ dev: process.env.NODE_ENV !== 'production', dir: './src/front' });
      await this.server.prepare();
    } catch (error) {
      console.log(error);
    }
  }

  getNextServer(): next_1.NextServer {
    return this.server;
  }
}
