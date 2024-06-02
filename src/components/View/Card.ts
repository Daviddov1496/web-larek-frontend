import { ICard } from "../../types";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { View } from "./View";


/** Класс Card расширяет класс View. Является абстрактным классом, имеющий общие поля у трех разновидностей карточек в приложении: 
    - карточка в каталоге на главной странице (CardCatalog) 
    - карточка подробного описания товара в модальном окне (CardPreview) 
    - карточка товара в корзине (CardBasket). */
export abstract class Card<T> extends View<T> implements ICard {
    protected _id: string;
    protected _title: HTMLHeadingElement;
    protected _price: HTMLSpanElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container, events);
        this._title = ensureElement<HTMLHeadingElement>('.card__title', container);
        this._price = ensureElement<HTMLSpanElement>('.card__price', container);
    }

    set id(value: string) {// запись id карточки товара
        this._id = value;
    }

    get id() {// получение id карточки товара 
        return this._id;
    }

    set title(value: string) {//запись имени карточки товара
        this.setText(this._title, value);
    }

    get title() {// получение имени карточки товара
        return this._title.textContent ?? '';
    }

    set price(value: string) {// запись цены товара
        this.setText(this._price, value ? `${value} синапсов` : `Бесценно`)
      }
    
      get price() {// получение цены товара
        return this._price.textContent ?? ''
      }
}