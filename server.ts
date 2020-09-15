import { serve, Server } from "https://deno.land/std@0.69.0/http/server.ts";

const port: number = 108;

const server: Server = serve({
    port: port
});

console.log(`App is running on port ${port}`);

for await(const req of server) {
    req.respond({
        body: `Denote is running on port: ${port}`
    });
}