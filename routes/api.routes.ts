import { Router } from 'https://deno.land/x/oak/mod.ts';

import { getNotes, getNote, addNote, updateNote, deleteNote } from './../controllers/notes.controller.ts';

const router = new Router();

router.get("/", ({ response }: { response: any }) => {
    response.body = `Denote is running on port 108`;
});

router.get('/api/notes', getNotes)
    .get('/api/notes/:id', getNote)
    .post('/api/notes/add', addNote)
    .put('/api/notes/:id/update', updateNote)
    .delete('/api/notes/delete/:id', deleteNote);

export default router;