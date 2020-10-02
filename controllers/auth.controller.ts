import { makeJwt, setExpiration, Jose, Payload } from "https://deno.land/x/djwt/create.ts";
import { config } from 'https://deno.land/x/dotenv/mod.ts';

import { users } from './users.controller.ts';

// Getting th secret set in '.env' file.
const secret = config()['SECRET'];

const header: Jose = {
    alg: "HS256",
    typ: "JWT"
};

// @desc Get API token by providing username and password in body of the requeset.
// @route GET /api/token
const getToken = async ({ request, response }: { request: any, response: any }) => {
    const body = await request.body();

    if(request.hasBody) {
        const value = await body.value;

        for(const user of users) {
            if(value.username === user.username || value.password === user.password) {
                // Setting partial user data as the payload as it will later be required in auth middleware.
                const payload: Payload = {
                    username: user.username,
                    id: user.id,
                    exp: setExpiration(new Date().getTime() + 60000)
                };

                const jwt = await makeJwt({ key: secret, header, payload });

                if(jwt) {
                    response.status = 200;
                    response.body = {
                        message: "Success: Authenticated.",
                        token: jwt,
                        status: 200,
                    };
                } else {
                    response.status = 500,
                    response.body = {
                        message: "Error: Something went wrong.",
                        status: 500,
                    };
                }

                return;
            }
        }

        response.status = 400;
        response.body = {
            message: "Error: Wrong username or password.",
            status: 400
        };
    }
};

export const authController = {
    getToken
}