import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppService } from './app.service';
import { FakeProbeService } from './services/fake-probe.service';
import { DataController } from './data.controller';
import { FilteringService } from './services/filtering.service';
import { UserModule } from './user/user.module'; // Assure-toi que le chemin est correct

@Module({
  imports: [
    // Connection to MongoDB
    MongooseModule.forRoot('mongodb://bh-test-mongo-1:27017/mydatabase'),
    UserModule,
  ],
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
