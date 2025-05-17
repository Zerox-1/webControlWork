import MoviesListComponent from "../view/movie-list-component.js"
import MovieItemComponent from "../view/movie-item-component.js"
import { render } from '../framework/render.js';
import { generateID } from "../utils.js";

export default class MoviesBoardPresenter {
    #moviesListComponent = new MoviesListComponent();
    #boardContainer = null;
    #moviesModel = null;

    constructor({ boardContainer, moviesModel }) {
        this.#boardContainer = boardContainer;
        this.#moviesModel = moviesModel;
        this.#moviesModel.addObserver(this.#handleModelChange.bind(this));
    }

    init() {
        this.#renderBoard();
        this.#setupFilterHandler();
    }

    #setupFilterHandler() {
        const radios = document.querySelectorAll('input[name="status-filter"]');
        
        radios.forEach((radio) => {
            radio.addEventListener('change', (evt) => {
                this.#moviesModel.setFilter(evt.target.value.trim());
            });
        });
    }
    

    #renderMovie(movie, container) {
        const cmp = new MovieItemComponent({ movie });

        cmp.element.dataset.id = movie.id;

        cmp.deleteButton.addEventListener('click', () => {
            this.#moviesModel.deleteMovie(movie.id);
        });

        cmp.editButton.addEventListener('click', () => this.#handleEdit(movie));
        render(cmp, container);
    }

    #handleEdit(movie) {
        const listItem = this.#moviesListComponent
            .getList()
            .querySelector(`[data-id="${movie.id}"]`);

        let checkboxStatus="";
        if(movie.type==="Watched"){
            checkboxStatus="checked";
        }
        listItem.innerHTML = `
            <form class="movie-edit-form">
                <input type="text" name="title" value="${movie.title}" required />
                <div class="watched-toggle">
                    <label for="movie-status">Отметить как просмотренный:</label>
                    <label class="switch">
                        <input type="checkbox" id="movie-status" name="status" ${checkboxStatus}>
                        <span class="slider"></span>
                    </label>
                </div>
                <button type="submit">Сохранить</button>
                <button type="button" class="cancel">Отмена</button>
            </form>
        `;

        const form = listItem.querySelector('.movie-edit-form');
        const cancelBtn = form.querySelector('.cancel');

        cancelBtn.addEventListener('click', () => {
            // При отмене сохраняем текущий фильтр
            this.#handleModelChange();
        });

        form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            const formData = new FormData(form);
            let type="Unwatched";
            if(formData.get('status')==="on"){
                type="Watched";
            }
            const updated = {
                title: formData.get('title').trim(),
                type: type,
            };
            this.#moviesModel.updateMovie(movie.id, updated);
        });
    }

    #renderMovieList(container) {
        const movieListComponent = new MoviesListComponent();
        render(movieListComponent, container);
        const movieListElement = movieListComponent.getList();

        const currentMovies = this.movies;

        if (currentMovies.length > 0) {
            currentMovies.forEach((movie) => this.#renderMovie(movie, movieListElement));
        }
    }

    #renderBoard() {
        render(this.#moviesListComponent, this.#boardContainer);
        this.#renderMovieList(this.#moviesListComponent.element);
    }

    createMovie() {
        const movieTitle = document.getElementById('movie-title').value.trim();

        let movieType ;
        if(document.getElementById('movie-status').checked){
            movieType = "Watched";
        }
        else{
            movieType = "Unwatched";
        }
        if (!movieTitle) return;

        this.#moviesModel.addMovie(movieTitle, movieType);
        document.getElementById('movie-title').value = '';
        document.getElementById('movie-status').checked=false;
    }

    get movies() {
        return this.#moviesModel.movies;
    }

    #clearBoard() {
        this.#moviesListComponent.element.innerHTML = '';
    }

    #handleModelChange() {
        this.#clearBoard();
        this.#renderBoard();
    }
}
