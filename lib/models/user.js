'use strict';

const Joi = require('joi');
const {Model} = require('@hapipal/schwifty');

module.exports = class User extends Model {

    static get tableName() {

        return 'user';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer().greater(0),
            firstName: Joi.string().min(3).example('Noa').description('Firstname of the user'),
            lastName: Joi.string().min(3).example('Duchiron').description('Lastname of the user'),
            username: Joi.string().required().example('duchiron13').description('Username of the user'),
            mail: Joi.string().email().required().example('noa.duchiron@etu.unilim.fr').description('Email of the user'),
            password: Joi.string().min(8).required().example('password123').description('Password of the user'),
            scope: Joi.array().items(Joi.string().lowercase().valid('admin', 'user').default('user')).description('Roles of the user'),
            createdAt: Joi.date(),
            updatedAt: Joi.date()
        });
    }

    $beforeInsert(queryContext) {

        this.updatedAt = new Date();
        this.createdAt = this.updatedAt;
    }

    $beforeUpdate(opt, queryContext) {

        this.updatedAt = new Date();
    }

};