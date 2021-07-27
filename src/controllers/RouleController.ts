import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { PermissionRepository } from "../repositories/PermissionRepository";
import { RoleRepository } from "../repositories/RoleRepository";


class RouleController{

  async create(request: Request, response: Response){

    const roleRepository = getCustomRepository(RoleRepository)
    const permissionRepository = getCustomRepository(PermissionRepository)

    const {name, description, permission} = request.body;

    const existRoule = await roleRepository.findOne({name});

    if(existRoule){
      return response.status(400).json({err: "Permission already exists!"})
    }

    const existisPermissions = await permissionRepository.findByIds(permission)

    const role = roleRepository.create({
      name,
      description,
      permission: existisPermissions,
    })

    await roleRepository.save(role)

    return response.json(role)

  }

}

export {RouleController}