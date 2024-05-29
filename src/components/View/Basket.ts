import { TBasket } from "../../types";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { View } from "./View";

/** Класс Basket расширяет класс View. Отображает корзину с добавленными товарами. */
export class Basket extends View<TBasket> {
    protected _cardsList: HTMLUListElement;// Отвечает за отображение списка карточек в корзине
    protected _totalPrice: HTMLSpanElement;// Отвечает за отображение общей стоимости товаров
    protected buttonCheckout: HTMLButtonElement;// кнопка "Оформить"
    
    constructor(container: HTMLElement, events: IEvents) {
        super(container, events);
        this._cardsList = ensureElement<HTMLUListElement>('.basket__list', container);
        this._totalPrice = ensureElement<HTMLSpanElement>('.basket__price', container);
        this.buttonCheckout = ensureElement<HTMLButtonElement>('.basket__button', container);
        this.buttonCheckout.addEventListener('click', () => this.events.emit('modal-order:open'))
      }

    set cardsList(cards: HTMLElement[]) {// устанавливает список карточек добавленных товаров в корзину
        this._cardsList.replaceChildren(...cards)
    }

    set emptyCheck(state: boolean) {// для блокировки кнопки "Оформить" в пустой корзине
        this.buttonCheckout.disabled = state; 
    }

    set total(value: number) {// устанавливает общую стоимость товаров
        this._totalPrice.textContent = String(value) + ' синапсов';
    }
}