import { validateJwt } from "https://deno.land/x/djwt/validate.ts";
import { makeJwt, setExpiration, Jose, Payload } from "https://deno.land/x/djwt/create.ts";
import { config } from 'https://deno.land/x/dotenv/mod.ts';

import { users } from './users.controller.ts';

const secret = await config()['SECRET'];

const header: Jose = {
    alg: "HS256",
    typ: "JWT"
};

const getToken = async ({ request, response }: { request: any, response: any }) => {
    const body = await request.body();

    if(request.hasBody) {
        const value = await body.value;

        for(const user of users) {
            if(value.username === user.username || value.password === user.password) {
                const payload: Payload = {
                    username: user.username,
                    id: user.id,
                    exp: setExpiration(new Date().getTime() + 60000)
                };

                const jwt = await makeJwt({ key: secret, header, payload });

                if(jwt) {
                    response.status = 200;
                    response.body = {
                        message: "Success!",
                        status: 200,
                        data: jwt
                    };
                } else {
                    response.status = 500,
                    response.body = {
                        message: "Something went wrong.",
                        status: 500,
                    };
                }

                return;
            }
        }

        response.status = 400;
        response.body = {
            message: "Wrong username or password.",
            status: 400
        };
    }
};

export const authController = {
    getToken
}