import { Request,Response } from "express";
import { UserModel } from "../models/UserModel";
import session from "express-session";
import bcrypt from 'bcrypt'


const model = new UserModel()


export class UserController {
    

    

    async postUser(req: Request, res: Response) {
        const newUser = await model.createUser({
            name: req.body.name,
            age: Number(req.body.age),
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8)
        })

        if(newUser.data?.name  && newUser.data.email && newUser.data.id) {
            req.session.user = {name: newUser.data?.name, email: newUser.data?.email, id: newUser.data?.id}
        }


        res.status(200).redirect('/home')
    }

    async loginUser(req: Request, res: Response) {
        const user = await model.isLogged({email: req.body.email, password: req.body.password})
        
        if(!user.ok) { res.status(400).render('pages/loginPage', {errorMessage: user.message}) 
            return
        }
        
        req.session.user = {name: req.body.name, email: req.body.email, id: Number(user.data?.id)}
        
        res.status(200).redirect('/home')
    }

  

    


}