import { Router } from "express";
import { BoardController } from "../controllers/BoardController";
import { isLogged } from "../middlewares/isLogged";

const controller = new BoardController()

const boardRouter = Router()

boardRouter.post('/createBoard', controller.createBoard)
boardRouter.put('/update/:id', controller.updateBoard )
boardRouter.get('/getBoard/:id' , controller.getBoardById)
boardRouter.put('/status' , controller.changeStatusById)

export default boardRouter 