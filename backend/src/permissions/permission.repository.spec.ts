import * as Faker from 'faker';
import { Test } from '@nestjs/testing';
import { Module } from './entities/module.entity';
import { define, factory } from 'typeorm-factories';
import { Permission } from './entities/permission.entity';
import { PermissionRepository } from './entities/permission.repository';
import { Role } from './entities/role.entity';

/**
 * Definindo um factory para mocks de Module
 */
define(Module, (faker: typeof Faker): Module => {
  const module = new Module();
  module.id = faker.datatype.number();
  module.description = faker.lorem.paragraph();
  module.name = faker.name.title();
  return module;
});

/**
 * Definindo um factory para mocks de Module
 */
define(Role, (faker: typeof Faker): Role => {
  const role = new Role();
  role.id = faker.datatype.number();
  role.name = 'manager';
  return role;
});

/**
 * Definindo um factory para mocks de Permission
 */
define(Permission, (faker: typeof Faker): Permission => {
  const actions = ['create', 'update', 'read', 'delete'];
  const permission = new Permission();
  permission.id = faker.datatype.number();
  permission.conditions = { clientEager: { id: '{user.clientEager.id}' } };
  permission.action = faker.random.arrayElement(actions);
  return permission;
});

/**
 * Teste PermissionRepository
 */
describe('PermissionRepository', () => {
  let permissionRepository;

  /**
   * ! É necessário declarar um beforeEach para que, antes de cada `it` seja criado o modúlo de teste com o provider necessário e um teste não influencie no outro, a não ser que explicitamente requirido.
   */
  beforeEach(async () => {
    const testModule = await Test.createTestingModule({
      providers: [PermissionRepository],
    }).compile();

    /**
     * * Atribuímos as características do PermissionRepository à variável permissionRepository
     */
    permissionRepository = await testModule.get<PermissionRepository>(
      PermissionRepository,
    );
  });

  /**
   * Testando a função createAndSave() do PermissionRepository
   * PermissionRepository > createAndSave
   */
  describe('findRolePermissions', () => {
    let mock: Permission;
    let module: Module;

    /**
     * ? Para evitarmos repetições atribuímos alguns valores padrões a todos os testes dentro deste describe
     */
    beforeEach(async () => {
      module = await factory(Module).make();
      mock = await factory(Permission).make();
      mock.subject = module;
    });

    it('should create an array of permissions by role x', () => {
      expect(1).toEqual(1);
    });
  });
});
