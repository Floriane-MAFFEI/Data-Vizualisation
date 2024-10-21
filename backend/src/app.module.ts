import { MicroserviceOptions } from './../node_modules/@nestjs/microservices/interfaces/microservice-configuration.interface.d';
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { Transport } from '@nestjs/microservices';
import { FakeProbeService } from './services/fake-probe.service';
import { DataController } from './data.controller';
import { FilteringService } from './services/filtering.service';

@Module({
  imports: [],
  // controller to instantiate for the operation of the application
  controllers: [DataController],
  // to be injected for the operation of the application
  providers: [AppService, FakeProbeService, FilteringService],
})
export class AppModule {
  // For configure microservice at the root of the application
  static MicroserviceOptions(): MicroserviceOptions {
    return {
      transport: Transport.TCP,
      options: {
        port: 3001,
      },
    };
  }
}
