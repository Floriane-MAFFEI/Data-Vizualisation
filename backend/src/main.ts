import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {

  // Initialize the NestJS application
  const app = await NestFactory.create(AppModule);

  // Start the microservice in 3001 port
  const microservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      port: 3001,
    },
  });

  await app.startAllMicroservices();
  await app.listen(3000); // HTTP Server in another port
}

// Intitialize the application, connect and start the microservice and listen for the HTTP request
bootstrap();
