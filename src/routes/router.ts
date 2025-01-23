import { Router, Request, Response } from "express";
import userRouter from "./userRoute";
import pageRouter from "./pageRouter";
import boardRouter from "./boardRouter";
import taskRouter from "./taskRouter";



const router = Router()

router.use('/board', boardRouter)
router.use('/users', userRouter)
router.use('/task', taskRouter)
router.use('/', pageRouter)


router.get('/ping', (req: Request, res: Response)=> {
    res.status(200).send('pong')
})


export default router