import { Test, TestingModule } from '@nestjs/testing';
import { SelectionMusicsController } from './selection-musics.controller';

describe('SelectionMusicsController', () => {
  let controller: SelectionMusicsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SelectionMusicsController],
    }).compile();

    controller = module.get<SelectionMusicsController>(SelectionMusicsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
