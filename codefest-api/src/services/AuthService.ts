import { UserModel } from "../models/UserModel";
import jwt from "jsonwebtoken";
import bc from "bcrypt";
import { ServiceError } from "../utils/errors/service.error";
import { HttpStatusCode } from "../router/RouterTypes";
import { Conection } from "../database/Conection";

export class AuthService {

    constructor(
        private readonly conection: Conection
    ) { }

    login = (email: string, password: string): Promise<string> => {
        return new Promise(async (res, rej) => {
            const client = await this.conection.connect();
            const userModel = new UserModel(client);
            try {
                const _user = await userModel.getByEmail(email);

                if (_user) {
                    if (await bc.compare(password, _user.password)) {

                        const token = jwt.sign({
                            user_id: _user.id
                        }, process.env.JWT_SECRET!, {
                            expiresIn: "24h"
                        });
                        this.conection.commit(client);
                        res(token);
                    }
                    else {
                        throw new ServiceError("Contraseña incorrecta.", HttpStatusCode.UNAUTHORIZED);
                    }
                } else {
                    throw new ServiceError("Correo no encontrado.", HttpStatusCode.UNAUTHORIZED);
                }
            } catch (error) {
                await this.conection.rollback(client);
                rej(error)
            }
        });
    }

}