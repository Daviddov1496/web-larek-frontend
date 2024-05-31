import { ICardBasket, TCardBasket } from "../../types";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { Card } from "./Card";

/** Класс CardBasket расширяет класс Card. Служит для отображения карточки товара в корзине. */
export class CardBasket extends Card<TCardBasket> implements ICardBasket {
    protected _index: HTMLSpanElement;// html элемент, отвечающий за отображение порядкового номера в корзине
    protected deleteCardButton: HTMLButtonElement;// иконка корзины, по клику на которую удаляется соответствующая карточка

    constructor(container: HTMLElement, events: IEvents) {
        super(container, events);
        this._index = ensureElement<HTMLSpanElement>('.basket__item-index', container);
        this.deleteCardButton = ensureElement<HTMLButtonElement>('.basket__item-delete', container);
        this.deleteCardButton.addEventListener('click', () => this.events.emit('purchases:delete', {id: this.id}));
    }

    set index(value: number) {// записывает порядковый номер карточки в корзине
        this._index.textContent = String(value);
    }
}