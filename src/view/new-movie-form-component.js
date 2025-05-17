import { AbstractComponent } from '../framework/view/abstract-component.js';
function createFormAddMovieComponentTemplate() {
    return (
        `<form id="movie-form">
                <label for="movie-title">Название фильма:</label>
                <input type="text" id="movie-title" placeholder="Например, Начало" required />
                
                <div class="watched-toggle">
                    <label for="movie-status">Отметить как просмотренный:</label>
                    <label class="switch">
                        <input type="checkbox" id="movie-status">
                        <span class="slider"></span>
                    </label>
                </div>

                <button type="submit">Добавить Фильм</button>
            </form>`
      );
}


export default class FormAddMovieComponent extends AbstractComponent{
  #handleClick = null;
  constructor({onClick}) {
    super();
    this.#handleClick = onClick;
    this.element.addEventListener('submit', this.#clickHandler);
  }
  
  get template() {
    return createFormAddMovieComponentTemplate();
  }

  #clickHandler=(evt)=>{
    evt.preventDefault();
    this.#handleClick();
  }
}