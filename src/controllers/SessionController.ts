import { compare } from "bcryptjs";
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { getCustomRepository} from 'typeorm';
import { UserRepository } from "../repositories/UserRepository";

class SessionController{

  async create(request: Request, response: Response){

    const {username, password} = request.body;

    const userRepository = getCustomRepository(UserRepository)

    const user = await userRepository.findOne({username}, {relations: ["roles"]})

    if(!user){
      return response.status(400).json({error: "User not found!"})
    }

    const matchPassword = await compare(password, user.password)

    if(!matchPassword){
      return response.status(400).json({error: "Incorrect password or username"})
    }

    const roles = user.roles.map(role => role.name)

    const token = sign( {roles},"4bdff350efc73ec26baf755d4ac8154b",{
      subject: user.id,
      expiresIn: '1d'

    })
    delete user.password; 
    return response.json({
      token,
      user
    })



  }

}

export {SessionController}