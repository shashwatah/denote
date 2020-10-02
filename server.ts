import { Application } from "https://deno.land/x/oak/mod.ts";
import { config } from 'https://deno.land/x/dotenv/mod.ts';

import router from './routes/api.routes.ts';

const port: number = parseInt(config()["PORT"]);

const server: Application = new Application();

server.use(router.routes());
server.use(router.allowedMethods());

console.log(`Denote is running on port ${port}`);
await server.listen({ port });
