'use strict';

const Joi = require('joi');
const {Model} = require("@hapipal/schwifty");

module.exports = class Movie extends Model {

    static get tableName() {

        return 'movie';
    }

    static get joiSchema() {

        return Joi.object({
            title: Joi.string().required(),
            description: Joi.string().required(),
            releaseDate: Joi.date().required(),
            director: Joi.string().required(),
        });
    }
}
