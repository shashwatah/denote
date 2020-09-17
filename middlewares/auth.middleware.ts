import { validateJwt, JwtValidation } from "https://deno.land/x/djwt/validate.ts";
import { config } from 'https://deno.land/x/dotenv/mod.ts';

const secret = config()["SECRET"];

export const authenticate = async ({ request, response}: { request: any, response: any }, next: any) => {
    const headers: Headers = await request.headers;

    const authHeader = headers.get('Authorization');

    if(!authHeader) {
        response.status = 401;
        response.body = {
            message: "Unauthorized!",
            status: 401
        };
        return;
    }
    
    const jwt = authHeader.split(' ')[1];
    if(!jwt) {
        response.status = 401;
        response.body = {
            message: "Unauthorized!",
            status: 401
        };
        return;
    }

    const validation: JwtValidation  = await validateJwt({ jwt, key: secret, algorithm: "HS256" });
    if(validation.isValid) {
        const payload: any =  validation.payload;
        request.headers.set("user-id", payload.id);
        await next();
        return;
    }

    response.status = 401;
    response.body = {
        message: "Invalid Token.",
        status: 401
    };
};

