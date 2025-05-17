import { AbstractComponent } from '../framework/view/abstract-component.js';
function createMovieListComponentTemplate() {
    return (
        `<ul id="movie-list" class="card-container">
            
            </ul>`
      );
}


export default class MoviesListComponent extends AbstractComponent{
  constructor(){
    super();
  }
  get template() {
    return createMovieListComponentTemplate();
  }
  getList(){
    if (!this.element) {
        this.element = createElement(this.template);
      }
  
  
      return document.getElementById('movie-list');
  }
}