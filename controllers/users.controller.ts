import { v4 } from 'https://deno.land/std/uuid/mod.ts';

import { User } from './../types/main.interfaces.ts';
import { notes } from './notes.controller.ts';


export let users: Array<User> = [{
    id: "user-admin",
    username: "admin",
    password: "admin",
}];


// @desc Get all the users
// @route /api/users
const getUsers = ({ response }: { response: any }) => {
    response.status = 200;
    response.body = {
        message: "Success: Users found!",
        data: users,
        status: 200
    };
};

// @desc Add a user
// @route /api/users/add
const addUser = async ({ request, response }: { request: any, response: any }) => {
    const body = await request.body();

    if(request.hasBody) {
        const user: User = await body.value;
        user.id = `user-${v4.generate()}`;
        users.push(user);
        response.status = 201;
        response.body = {
            message: "Success: User Added!",
            data: user,
            status: 201
        };
    } else {
        response.status = 400;
        response.body = {
            message: "Error: Enter some data.",
            status: 400
        };
    }
};

// @desc Get one particular user
// @route /api/users/:id
const getUser = ({ params, response }: { params: { id: string }, response: any }) => {
    const user: User | undefined  = users.find(u => u.id === params.id);

    if(user) {
        response.status = 200;
        response.body = {
            message: "Success: User found!",
            data: user,
            status: 200
        };
    } else {
        response.status = 404;
        response.body = {
            message: "Error: User does not exist.",
            status: 404
        };
    }
};

// @desc Get all the notes by a particular user
// @route /api/users/:id/notes
const getUserNotes = ({ params, response }: { params: { id: string }, response: any }) => {
    const user: User | undefined = users.find(u => u.id === params.id);

    if(user) {
        const userNotes = notes.filter(n => n.userid === params.id);
        response.status = 200;
        if(userNotes.length) {
            response.body = {
                message: "Success: Notes found!",
                data: userNotes,
                status: 200
            };
        } else {
            response.body = {
                message: "Error: User hasn't created any notes.",
            };
        }
    } else {
        response.status = 404;
        response.body = {
            message: "Error: User does not exist.",
            status: 404
        };
    }
};

// @desc Delete a user
// @route /api/users/delete/:id
const deleteUser = ({ params, response }: { params: { id: string }, response: any }) => {
    const user: User | undefined = users.find(u => u.id === params.id);
    
    if(user) {
        users = users.filter(u => u.id != params.id);

        response.status = 200;
        response.body = {
            message: "Success: User Deleted!",
            data: user,            
            status: 200
        };
    } else {
        response.status = 404;
        response.body = {
            message: "Error: User does not exist.",
            status: 404
        };
    }
};

export const usersController = {
    getUsers,
    addUser,
    getUser,
    getUserNotes,
    deleteUser
};