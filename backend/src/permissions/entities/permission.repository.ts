import { EntityRepository, Repository } from 'typeorm';
import { Permission } from './permission.entity';
import { Role } from './role.entity';
import * as interpolate from 'interpolate';
import { User } from 'src/users/entities/user.entity';

@EntityRepository(Permission)
export class PermissionRepository extends Repository<Permission> {
  async findRolePermissions(role: Role, user: User) {
    const permissions = await this.find({ where: { role } });
    return permissions.map((permission) => {
      const conditions = JSON.parse(
        interpolate(JSON.stringify(permission.conditions), { user }),
      );

      const keys = Object.keys(conditions);

      if (keys.length > 0) {
        keys.forEach((key) =>
          +conditions[key]
            ? (conditions[key] = +conditions[key])
            : conditions[key],
        );
      }

      return {
        action: permission.action,
        subject: permission.subject.name,
        conditions,
      };
    });
  }
}
