import { validateJwt, JwtValidation } from "https://deno.land/x/djwt/validate.ts";
import { config } from 'https://deno.land/x/dotenv/mod.ts';

const secret = config()["SECRET"];

// Standard auth middleware which will be used across almost all the endpoints.
export const authenticate = async ({ request, response}: { request: any, response: any }, next: any) => {
    const headers: Headers = await request.headers;

    const authHeader = headers.get('Authorization');

    if(!authHeader) {
        response.status = 401;
        response.body = {
            message: "Error: Unauthorized: No token found!",
            status: 401
        };
        return;
    }
    
    const jwt = authHeader.split(' ')[1];
    if(!jwt) {
        response.status = 401;
        response.body = {
            message: "Error: Unauthorized: Invalid token!",
            status: 401
        };
        return;
    }

    const validation: JwtValidation  = await validateJwt({ jwt, key: secret, algorithm: "HS256" });
    if(validation.isValid) {
        // Adding user id from payload to headers so functions like getUserNotes can use it.
        const payload: any =  validation.payload;
        request.headers.set("user-id", payload.id);
        await next();
        return;
    }

    response.status = 401;
    response.body = {
        message: "Error: Unauthorized: Invalid token!",
        status: 401
    };
};


