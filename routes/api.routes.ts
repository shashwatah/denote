import { Router } from 'https://deno.land/x/oak/mod.ts';

import { notesController } from './../controllers/notes.controller.ts';

const router = new Router();

router.get("/", ({ response }: { response: any }) => {
    response.body = `Denote is running on port 108`;
});

router.get('/api/notes', notesController.getNotes)
    .get('/api/notes/:id', notesController.getNote)
    .post('/api/notes/add', notesController.addNote)
    .put('/api/notes/:id/update', notesController.updateNote)
    .delete('/api/notes/delete/:id', notesController.deleteNote);

export default router;