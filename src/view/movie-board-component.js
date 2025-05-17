import { AbstractComponent } from '../framework/view/abstract-component.js';
function createBoardMoviesComponent() {
    return (
        `<div class="container">
            <h1>Коллекция Фильмов</h1>

            <section>
                <p>Используйте эту коллекцию для отслеживания фильмов, которые вы посмотрели или хотите посмотреть. Отмечайте фильмы как просмотренные и фильтруйте по статусу.</p>
            </section>

            <div class="movie-form">
                <h2>Добавить Фильм</h2>
            </div>
            
            <div class="movie-filter">
                <h2>Фильтры</h2>
            </div>

            <div class="movie-list">
                <h2>Список Фильмов</h2>
            </div>
        </div>`
      );
}


export default class BoardMovieComponent extends AbstractComponent{
  constructor() {
    super();
  }
  get template() {
    return createBoardMoviesComponent();
  }
}