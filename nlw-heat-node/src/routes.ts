import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateMessageController } from "./controllers/CreateMessageController";
import { GetLast3MessagesController } from "./controllers/GetLast3MessagesController";
import { ProfileUserController } from "./controllers/ProfileUserController";
import { ensureAuthenticated } from "./middleware/ensureAuthenticated";

const router = Router();

//Rota authenticacao de user
router.post("/authenticate", new AuthenticateUserController().handle);

//Rota de messages
router.post("/messages", ensureAuthenticated, new CreateMessageController().handle)

//Rota buscar 3 ultimas msgs
router.get("/messages/last3", new GetLast3MessagesController().handle);

//Rota para pegar dados de perfil do user
router.get("/profile", ensureAuthenticated, new ProfileUserController().handle);


export { router };