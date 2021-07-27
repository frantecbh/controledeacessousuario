import { EntityRepository, Repository } from "typeorm";
import { Permission } from '../models/Premission'

@EntityRepository(Permission)
class PermissionRepository extends Repository<Permission>{

}

export {PermissionRepository}