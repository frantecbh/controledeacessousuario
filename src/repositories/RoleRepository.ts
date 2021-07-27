import { EntityRepository, Repository } from "typeorm";
import { Roles } from '../models/Role'

@EntityRepository(Roles)
class RoleRepository extends Repository<Roles>{

}

export {RoleRepository}