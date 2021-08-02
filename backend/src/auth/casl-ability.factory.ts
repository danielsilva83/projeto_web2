import {
  AbilityTuple,
  MatchConditions,
  PureAbility,
  Ability,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { PermissionRepository } from '../permissions/entities/permission.repository';

export type AppAbility = PureAbility<AbilityTuple, MatchConditions>;

@Injectable()
export class CaslAbilityFactory {
  constructor(
    @InjectRepository(PermissionRepository)
    private permissionRepository: PermissionRepository,
  ) {}

  async getUserPermissions(user: User) {
    const rules = await this.permissionRepository.findRolePermissions(
      user.roleEager,
      user,
    );

    return new Ability(rules);
  }
}
