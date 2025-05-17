import { AbstractComponent } from '../framework/view/abstract-component.js';
function createMovieItemComponentTemplate(movie) {
  
  return (
      `
      <li class="movie-item" data-id="${movie.id}">
        <div class="movie-details">
          <span>${movie.title}</span>
          <span>${movie.type}</span>
        </div>
        <div>
        
          <button class="movie-item__edit">Редактировать</button>
          <button class="movie-item__delete">Удалить</button>
        </div>
      </li>`
    );
}


export default class MovieItemComponent extends AbstractComponent{

  constructor({movie}){
    super();
    this.movie=movie;
  }


  get template() {
    return createMovieItemComponentTemplate(this.movie);
  }

  get deleteButton(){
    return this.element.querySelector('.movie-item__delete')
  }

  get editButton(){
    return this.element.querySelector('.movie-item__edit')
 }
  get id(){
    return this.movie.id;
  }
}