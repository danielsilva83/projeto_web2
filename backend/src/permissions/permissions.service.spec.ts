import { Test } from '@nestjs/testing';
import { PermissionsService } from './permissions.service';
import { PermissionRepository } from './entities/permission.repository';
import { repositoryMockFactory } from '../mock/functions.mock';

describe('PermissionsService', () => {
  let service;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        PermissionsService,
        {
          provide: PermissionRepository,
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = await moduleRef.get<PermissionsService>(PermissionsService);
  });

  describe('exists', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });
});
