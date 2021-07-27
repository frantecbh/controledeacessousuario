import { Request, Response } from "express";
import { getCustomRepository} from 'typeorm';
import {hash} from 'bcryptjs'
import { UserRepository } from "../repositories/UserRepository";
import { RoleRepository } from "../repositories/RoleRepository";



class UserController{

  async create(request: Request, response: Response){

    const userRepository = getCustomRepository(UserRepository)
    const rolesRepository = getCustomRepository(RoleRepository)

    const {name, username, password, roles } = request.body

    const existuser = await userRepository.findOne({
      username
  })

  if(existuser){
    return response.status(400).json({message: "User Already exists!"})
  }

  const passwordHashed = await hash(password, 8)

  const existsRoles =  await rolesRepository.findByIds(roles)

  const user = userRepository.create({
    name, 
    username, 
    password: passwordHashed,
    roles: existsRoles
  })

  await userRepository.save(user)

  delete user.password;

  return response.status(201).json(user)


  }

}

export {UserController}