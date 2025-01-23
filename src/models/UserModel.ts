import { prisma } from "../libs/db";
import { Prisma } from "@prisma/client";
import bcrypt from 'bcrypt'

type Login = {
    email: string
    password: string
}



export class UserModel {


    async getAllUsers() {
        try {
            return {
                data: await prisma.user.findMany(),
                ok: true

            }
        }

        catch(error: any) {
            return {
                data: error.message,
                ok: false
            }
        }
    }

    async getById(id: number) {
        try {
            return prisma.board.findFirst({
                where: {id: id}
            })
        }
        catch(err: any) {
            return null
        }
    }

    async isLogged({email, password}: Login) {
        try {
            const user = await prisma.user.findFirst({where: {email}})

            if(user === null) {
                throw new Error('User not found')
            }
        
            if(user !== null) {
                const compare =  bcrypt.compare(password, user.password )
                
            if(await compare === false) {
                throw new Error('Password incorrect, please try again')
            }
            }
            
        


            return {
                data: user,
                ok: true,
                message: 'You are logged'
            }
            
        }
        catch(err:  any) {
            return {
                ok: false,
                message: err.message,
                data: null
            }
        }
    }

    async createUser(data: Prisma.UserCreateInput) {
        try {
           const newUser = await prisma.user.create({data})
            return {ok: true, message: 'User created successfuly', data: newUser}
        }

        catch(error: any) {
            return {ok: false, message: 'the user was not created, error'}
        }
    }


    
} 