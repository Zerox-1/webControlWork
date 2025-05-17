import { AbstractComponent } from '../framework/view/abstract-component.js';
function createMovieFavFilterComponentTemplate() {
    return (
        `<label><input type="checkbox" id="favorite-filter" /> Показывать только избранное</label>`
      );
}


export default class MovieFavFilterComponent extends AbstractComponent{
  constructor() {
    super();
  }
  
  get template() {
    return createMovieFavFilterComponentTemplate();
  }
}