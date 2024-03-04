'use strict';

const Joi = require("joi");
module.exports = {

    async up(knex) {

        await knex.schema.createTable('movie', (table) => {

            table.increments('id').primary();
            table.string('title').notNull();
            table.string('description').notNull()
            table.dateTime('releaseDate').notNull();
            table.string('director').notNull();
        });
    },
    async down(knex) {

        await knex.schema.dropTableIfExists('movie');
    }
};
