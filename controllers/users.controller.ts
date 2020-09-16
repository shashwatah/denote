import { v4 } from 'https://deno.land/std/uuid/mod.ts';

import { User } from './../types/main.interfaces.ts';
import { notes } from './notes.controller.ts';


const users: Array<User> = [{
    id: "user-1",
    username: "araekiel",
    password: "shash",
    notes: []
}];


// @desc Get all the users
// @route /api/users
const getUsers = ({ response }: { response: any }) => {};

// @desc Add a user
// @route /api/users/add
const addUser = ({ request, response }: { request: any, response: any }) => {};

// @desc Get one particular user
// @route /api/users/:id
const getUser = ({ params, response }: { params: { id: string }, response: any}) => {};

// @desc Get all the notes by a particular user
// @route /api/users/:id/notes
const getUserNotes = ({ params, response }: { params: { id: string }, response: any }) => {};

// @desc Delete a user
// @route /api/users/delete/:id
const deleteUser = ({ params, response }: { params: { id: string }, response: any }) => {};

export const usersController = {
    getUsers,
    addUser,
    getUser,
    getUserNotes,
    deleteUser
};