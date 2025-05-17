import {render} from './framework/render.js';
import MoviesBoardPresenter from './presenter/movie-board-presenter.js';
import FormAddmovieComponent from './view/new-movie-form-component.js';
import BoardMovieComponent from './view/movie-board-component.js'
import MoviesModel from "./model/movie-model.js";
import MovieFilterComponent from './view/movie-filter-component.js';
import MovieFavFilterComponent from './view/movie-favorite-filter.js'

const body = document.querySelector('.body');
const bodyBoard= new BoardMovieComponent();

render(bodyBoard, body);

const moviesFilter=new MovieFilterComponent();
const moviesFilterBody=document.querySelector('.movie-filter');
render(moviesFilter, moviesFilterBody);

const movieFavFilterComponent= new MovieFavFilterComponent();

const formContainer = document.querySelector('.movie-form');
const moviesBoardContainer=document.querySelector('.movie-list');
const moviesModel=new MoviesModel();
const moviesBoardPresenter=new MoviesBoardPresenter({boardContainer:moviesBoardContainer,moviesModel:moviesModel,});

moviesBoardPresenter.init();

render(movieFavFilterComponent,moviesFilterBody)

const formAddmovieComponent=new FormAddmovieComponent({
    onClick: handleNewmovieButtonClick

});

function handleNewmovieButtonClick(){
    moviesBoardPresenter.createMovie();
}

render(formAddmovieComponent, formContainer);