import { ICardCatalog, TCategoryClasses } from "../../types";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { Card } from "./Card";


/** Класс CardCatalog расширяет класс Card, также является классом дженериком. Служит для отображения карточки в каталоге на главной странице приложения */
export class CardCatalog<T> extends Card<T> implements ICardCatalog {
    protected _image: HTMLImageElement;// html элемент, отвечающий за отображение изображения товара 
    protected _category: HTMLSpanElement;// html элемент, отвечающий за отображение категории товара

    constructor(container: HTMLElement, events: IEvents) {
        super(container, events);
        this._image = ensureElement<HTMLImageElement>('.card__image', container);
        this._category = ensureElement<HTMLSpanElement>('.card__category', container);
        this.container.addEventListener('click', () => this.events.emit('modal-card:open', {id: this.id}))
    }

    protected addCSSClassCategory(value: string) {// метод, для присваивания определенного css класса html элементу категории товара в зависимости от ее названия (установка фонового цвета)
        const categoryCSSClassData: TCategoryClasses = {
          'софт-скил': 'card__category_soft',
          'дополнительное': 'card__category_additional',
          'хард-скил': 'card__category_hard',
          'кнопка': 'card__category_button',
          'другое': 'card__category_other'
        }
        if(value in categoryCSSClassData) {
          this._category.classList.add(categoryCSSClassData[value])
        }
    }

    set image(src: string) {// запись данных изображения товара
        this.setImage(this._image, src, this.title)
       
    }

    set category(value: string) {// запись данных категории товара
        this._category.textContent = value;
        this.addCSSClassCategory(value);
    }

    get category() {// получение названия категории товара
        return this._category.textContent ?? '';
    }      
}