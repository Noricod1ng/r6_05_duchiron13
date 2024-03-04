'use strict';

const iut_encrypt = require('@castanie-valentin/iut-encrypt');
const Joi = require('joi');

module.exports = [
    {
        method: 'post',
        path: '/user',
        options: {
            auth: false,
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    firstName: Joi.string().required().min(3).example('Noa').description('Firstname of the user'),
                    lastName: Joi.string().required().min(3).example('Duchiron').description('Lastname of the user'),
                    username: Joi.string().required().example('duchiron13').description('Username of the user'),
                    mail: Joi.string().email().required().example('noa.duchiron@etu.unilim.fr').description('Email of the user'),
                    password: Joi.string().min(8).required().example('password123').description('Password of the user')
                })
            }
        },
        handler: async (request, h) => {

            const {userService} = request.services();

            return await userService.create(request.payload);
        }
    },
    {
        method: 'get',
        path: '/users',
        options: {
            auth : {
                scope: [ 'admin', 'user' ]
            },
            tags: ['api']
        },
        handler: async (request, h) => {
            const {userService} = request.services();
            return userService.list();
        }
    },
    {
        method: 'delete',
        path: '/user/{id}',
        options: {
            auth : {
                scope: [ 'admin' ]
            },
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: Joi.number().required().description('Id of the user')
                })
            }
        },
        handler: async (request, h) => {
            const {userService} = request.services();

            await userService.delete(request.params.id);

            return '';
        }
    },
    {
        method: 'PATCH',
        path: '/user/{id}',
        options: {
            auth : {
                scope: [ 'admin' ]
            },
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: Joi.number().required().description('Id of the user')
                }),
                payload: Joi.object({
                    firstName: Joi.string().optional().min(3).example('NoaH').description('Firstname of the user'),
                    lastName: Joi.string().optional().min(3).example('Duchiron').description('Lastname of the user'),
                    username: Joi.string().optional().example('duchiron13').description('Username of the user'),
                    mail: Joi.string().email().optional().example('noa.duchiron@etu.unilim.fr').description('Email of the user'),
                    password: Joi.string().min(8).optional().example('123password').description('Password of the user'),
                    scope: Joi.array().items(Joi.string().lowercase().valid('admin', 'user').default('user')).description('Roles of the user'),
                })
            }
        },
        handler: async (request, h) => {
            const {userService} = request.services();
            const userId = request.params.id;
            const updateData = request.payload;

            if (updateData.password) {
                updateData.password = await iut_encrypt.sha1(updateData.password);
            }

            await userService.modify(userId, updateData);

            return h.response({message: 'User updated successfully'}).code(200);
        }
    },
    {
        method: 'post',
        path: '/user/login',
        options: {
            auth: false,
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    mail: Joi.string().email().required().example('noa.duchiron@etu.unilim.fr').description('Email of the user'),
                    password: Joi.string().min(8).required().example('password123').description('Password of the user')
                })
            }
        },
        handler: async (request, h) => {
            const {userService} = request.services();
            const {mail, password} = request.payload;

            try {
                const user = await userService.authenticate(mail, password);
                if (!user) {
                    return h.response({error: 'Invalid email or password'}).code(401);
                }
                return {message: 'Login successful', userId: user.id};
            } catch (error) {
                return h.response({error: 'An error occurred during login'}).code(500);
            }
        }
    },
];