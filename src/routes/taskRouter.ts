import { Router } from "express";
import router from "./router";
import { TaskController } from "../controllers/TaskController";

const controller = new TaskController()

const taskRouter = Router()

taskRouter.post('/createTask', controller.createTask )
taskRouter.delete('/delete/:id', controller.completeTask)


export default taskRouter