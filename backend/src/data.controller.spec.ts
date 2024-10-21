import { Test, TestingModule } from '@nestjs/testing';
import { DataController } from './data.controller';
import { FakeProbeService } from './services/fake-probe.service';

describe('DataController', () => {
  let appController: DataController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [DataController],
      providers: [FakeProbeService],
    }).compile();

    appController = app.get<DataController>(DataController);
  });

  describe('root', () => {
    it('should return an object with data', () => {
      expect(appController.getRawData()).toEqual({ data: [] });
    });
  });
});

