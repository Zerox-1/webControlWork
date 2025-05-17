import { generateID } from "../utils.js";
import { movies } from "../mock/movies.js";

export default class MoviesModel {
    #boardmovies = movies;
    #observers = [];
    #currentFilter = 'all';

    get movies() {
        return this.#currentFilter === 'all'
            ? this.#boardmovies
            : this.#boardmovies.filter(b => b.type === this.#currentFilter);
    }

    setFilter(type) {
        this.#currentFilter = type;
        this._notifyObservers();
    }

    getMoviesByType(type) {
        return this.#boardmovies.filter(movie => movie.type === type);
    }

    updateMovie(movieId, updatedFields) {
        this.#boardmovies = this.#boardmovies.map(b =>
            b.id === movieId ? { ...b, ...updatedFields } : b
        );
        this._notifyObservers();
    }

    addMovie(title, type) {
        const newmovie = {
            title,
            type: type,
            id: generateID()
        };
        this.#boardmovies.push(newmovie);
        this._notifyObservers();
        return newmovie;
    }

    deleteMovie(movieId) {
        this.#boardmovies = this.#boardmovies.filter(movie => movie.id !== movieId);
        this._notifyObservers();
    }

    addObserver(observer) {
        this.#observers.push(observer);
    }

    removeObserver(observer) {
        this.#observers = this.#observers.filter((obs) => obs !== observer);
    }

    _notifyObservers() {
        this.#observers.forEach((observer) => observer());
    }
}
