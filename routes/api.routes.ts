import { Router } from 'https://deno.land/x/oak/mod.ts';

import { notesController } from './../controllers/notes.controller.ts';
import { usersController } from './../controllers/users.controller.ts';
import { authController } from './../controllers/auth.controller.ts';
import { authenticate } from './../middlewares/auth.middleware.ts';

const router = new Router();

router.get("/", ({ response }: { response: any }) => {
    response.body = `Denote is running on port 108`;
});

router.get('/token', authController.getToken)
    .get('/api/users', authenticate , usersController.getUsers)
    .post('/api/users/add', authenticate, usersController.addUser)
    .get('/api/users/:id', authenticate, usersController.getUser)
    .get('/api/users/:id/notes', authenticate, usersController.getUserNotes)
    .delete('/api/users/delete/:id', authenticate, usersController.deleteUser)
    .get('/api/notes', authenticate, notesController.getNotes)
    .get('/api/notes/:id', authenticate, notesController.getNote)
    .post('/api/notes/add', authenticate, notesController.addNote)
    .put('/api/notes/:id/update', authenticate, notesController.updateNote)
    .delete('/api/notes/delete/:id', authenticate, notesController.deleteNote);

export default router;