'use strict';

const { Service } = require('@hapipal/schmervice');
const {notifyUsersNewMovie} = require("./mailService");

module.exports = class MovieService extends Service {

    async create(movie) {

        const {Movie} = this.server.models();
        await notifyUsersNewMovie(movie);
        return Movie.query().insertAndFetch(movie);
    }

    list() {
        const {Movie} = this.server.models();
        return Movie.query();
    }

    delete(id) {
        const {Movie} = this.server.models();
        return Movie.query().deleteById(id);
    }

    modify(movieId, updateData) {
        const {Movie} = this.server.models();
        return Movie.query().patchAndFetchById(movieId, updateData);
    }
}