import { Router } from 'https://deno.land/x/oak/mod.ts';

import { notesController } from './../controllers/notes.controller.ts';
import { usersController } from './../controllers/users.controller.ts';
import { authController } from './../controllers/auth.controller.ts';

const router = new Router();

router.get("/", ({ response }: { response: any }) => {
    response.body = `Denote is running on port 108`;
});

router.get('/token', authController.getToken)
    .get('/api/users', usersController.getUsers)
    .post('/api/users/add', usersController.addUser)
    .get('/api/users/:id', usersController.getUser)
    .get('/api/users/:id/notes', usersController.getUserNotes)
    .delete('/api/users/delete/:id', usersController.deleteUser)
    .get('/api/notes', notesController.getNotes)
    .get('/api/notes/:id', notesController.getNote)
    .post('/api/notes/add', notesController.addNote)
    .put('/api/notes/:id/update', notesController.updateNote)
    .delete('/api/notes/delete/:id', notesController.deleteNote);

export default router;