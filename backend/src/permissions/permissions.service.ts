import { Injectable } from '@nestjs/common';
import { PermissionRepository } from './entities/permission.repository';

@Injectable()
export class PermissionsService {
  constructor(private permissionRepository: PermissionRepository) {}
}
