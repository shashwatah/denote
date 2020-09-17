import { validateJwt } from "https://deno.land/x/djwt/validate.ts";
import { makeJwt, setExpiration, Jose, Payload } from "https://deno.land/x/djwt/create.ts";
import { config } from 'https://deno.land/x/dotenv/mod.ts';

import { users } from './users.controller.ts';

const secret = await config()['SECRET'];

const header: Jose = {
    alg: "HS256",
    typ: "JWT"
};

export const getToken = async ({ request, response }: { request: any, response: any }) => {
    const { value } = await request.body();

    if(request.hasBody) {
        for(const user of users) {
            if(value.username === user.username || value.password === user.password) {
                const payload: Payload = {
                    username: user.username,
                    id: user.id,
                    exp: setExpiration(new Date().getTime() + 60000)
                };

                const jwt = await makeJwt({ secret, header, payload });

                if(jwt) {
                    response.status = 200;
                    response.body = {
                        message: "Sucess!",
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
