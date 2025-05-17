import { AbstractComponent } from '../framework/view/abstract-component.js';
function createMovieFilterComponentTemplate() {
    return (
        ` <fieldset>
                <legend>Статус:</legend>
                <label><input type="radio" name="status-filter" value="all" checked /> Все</label>
                <label><input type="radio" name="status-filter" value="Watched" /> Просмотренные</label>
                <label><input type="radio" name="status-filter" value="Unwatched" /> Непросмотренные</label>
            </fieldset>
`
      );
}


export default class MovieFilterComponent extends AbstractComponent{
  constructor() {
    super();
  }
  
  get template() {
    return createMovieFilterComponentTemplate();
  }
}