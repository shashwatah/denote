# Denote

<p>A REST API for a generic notes app built with <a href="https://deno.land/">Deno</a>, <a href="https://github.com/oakserver/oak">Oak</a>, and <a href="https://www.typescriptlang.org/">TypeScript</a>.</p>

## Instructions

Follow the standard procedure to clone the repository and then continue with the steps.

Denote uses ***denon*** as a nodemon alternative for deno. After installing run the following command to install denon. 

```bash
$ deno install --allow-read --allow-run --allow-write --allow-net -f -q --unstable https://deno.land/x/denon@2.4.0/denon.ts
```

> It will use the config specified in ***denon.json***.

Run Denote with the following command:

```bash
denon start
```

## API Endpoints

```bash
/api/notes                          # => Get all the notes
/api/notes/:id                      # => Get one particular note
/api/notes/add                      # => Add a note
/api/notes/:id/update               # => Update a note
/api/notes/:id/delete               # => Delete a note
```

## Update checklist

-  JWT Authentication 
-  NoSQL Database

## Authors

- Araekiel - [Github](https://www.github.com/Araekiel)

## License 

[MIT](https://choosealicense.com/licenses/mit/)
