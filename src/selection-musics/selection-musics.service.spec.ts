import { Test, TestingModule } from '@nestjs/testing';
import { SelectionMusicsService } from './selection-musics.service';

describe('SelectionMusicsService', () => {
  let service: SelectionMusicsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SelectionMusicsService],
    }).compile();

    service = module.get<SelectionMusicsService>(SelectionMusicsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
