import { Router } from "express"
import { PageConrtoller } from "../controllers/pageController"
import { isLogged } from "../middlewares/isLogged"



const pageRouter = Router()
const conrtoller = new  PageConrtoller()

pageRouter.get('/home', isLogged, conrtoller.renderHomePage)
pageRouter.get('/register', conrtoller.renderRegisterPage)
pageRouter.get('/login', conrtoller.renderLoginPage)

export default pageRouter