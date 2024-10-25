import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  try {
    // CORS Activation// Initialize the NestJS application
    const app = await NestFactory.create(AppModule);
    app.enableCors();// CORS Activation

    // ValidationPipe Activate 
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true, // Retire empty fields
      forbidNonWhitelisted: true, // Reject queries that contain undeclared fileds
    }));

    // Start the microservice in 3001 port
    const microservice = app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.TCP,
      options: {
        port: 3001,
      },
    });

    await app.startAllMicroservices();
    await app.listen(3000);
  } catch (error) {
    console.error('Error starting the application', error);
  }
}
// Intitialize the application, connect and start the microservice and listen for the HTTP request
bootstrap();
