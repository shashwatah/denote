import { serve } from "https://deno.land/std@0.53.0/http/server.ts";

const port: number = 108;

const server = serve({
    port: port
});

console.log(`App is running on port ${port}`);

for await(const req of server) {
    req.respond({
        body: "Denote is up and running"
    });
}