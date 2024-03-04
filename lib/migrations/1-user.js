'use strict';

module.exports = {
    async up(knex) {
        const hasPassword = await knex.schema.hasColumn('user', 'password');
        const hasMail = await knex.schema.hasColumn('user', 'mail');
        const hasUsername = await knex.schema.hasColumn('user', 'username');

        await knex.schema.table('user', (table) => {
            if (!hasPassword) {
                table.string('password').notNullable();
            }
            if (!hasMail) {
                table.string('mail').notNullable().unique();
            }
            if (!hasUsername) {
                table.string('username').notNullable();
            }
        });
    },

    async down(knex) {
        await knex.schema.table('user', (table) => {
            table.dropColumn('password');
            table.dropColumn('mail');
            table.dropColumn('username');
        });
    }
};
