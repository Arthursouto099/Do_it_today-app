import { Router } from "express";
import { UserController } from "../controllers/UserController";


const userRouter = Router() 
const controller = new UserController()

// userRouter.get('/register')
userRouter.post('/register', controller.postUser)
userRouter.post('/login', controller.loginUser)

export default userRouter