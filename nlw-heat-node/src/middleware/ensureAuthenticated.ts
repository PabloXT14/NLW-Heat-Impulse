import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string;
}

//Verificando se o usuário esta authenticado(através do token)
export function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const authToken = request.headers.authorization;

    if (!authToken) {
        return response.status(401).json({
            errorCode: "token.invalid",
        });
    }

    //Bearer 863bad2ee85bf784e6d38e32e8a18334
    //  [0] Bearer
    //  [1] 863bad2ee85bf784e6d38e32e8a18334

    const [, token] = authToken.split(" ")

    try {
        const { sub } = verify(token, process.env.JWT_SECRET) as IPayload

        request.user_id = sub

        return next();
    } catch (err) {
        return response.status(401).json({ errorCode: "token.expired" })
    }
}
