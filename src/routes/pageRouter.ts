import { Router } from "express"
import { PageController } from "../controllers/pageController"
import { isLogged } from "../middlewares/isLogged"
import {notFound} from '../handlers/errorGlobalHandler'



const pageRouter = Router()
const controller = new  PageController()

pageRouter.get('/', notFound)
pageRouter.get('/home', isLogged, controller.renderHomePage)
pageRouter.get('/register', controller.renderRegisterPage)
pageRouter.get('/login', controller.renderLoginPage)
pageRouter.get('/profile', controller.renderProfilePage )

export default pageRouter