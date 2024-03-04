'use strict';

const Joi = require("joi");

module.exports = [
    {
        method: 'POST',
        path: '/film',
        options: {
            auth : {
                scope: [ 'admin' ]
            },
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    title: Joi.string().required(),
                    description: Joi.string().required(),
                    releaseDate: Joi.date().required(),
                    director: Joi.string().required(),
                })
            }
        },
        handler: async (request, h) => {
            const {movieService} = request.services();

            await movieService.create(request.payload);
        },
    },
    {
        method: 'DELETE',
        path: '/movies/{id}',
        options: {
            auth: {
                scope: ['admin', 'user']
            },
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: Joi.number().required()
                })
            }
        },
        handler: async (request, h) => {
            const {movieService} = request.services();

            await movieService.delete(request.params);
        },
    },
    {
        method: 'GET',
        path: '/movies',
        options: {
            tags: ['api']
        },
        handler: async (request, h) => {
            const {movieService} = request.services();

            await movieService.list();
        },
    },
    {
        method: 'PATCH',
        path: '/movie/{id}',
        options: {
            auth : {
                scope: [ 'admin' ]
            },
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: Joi.number().required()
                }),
                payload: Joi.object({
                    title: Joi.string().required(),
                    description: Joi.string().required(),
                    releaseDate: Joi.date().required(),
                    director: Joi.string().required(),
                })
            }
        },
        handler: async (request, h) => {
            const {movieService} = request.services();
            const userId = request.params.id;
            const updateData = request.payload;

            await movieService.modify(userId, updateData);

            return h.response({message: 'Movie updated successfully'}).code(200);
        }
    },

];
