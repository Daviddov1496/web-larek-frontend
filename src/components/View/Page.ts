import { IPage, TPage } from "../../types";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { View } from "./View";

/** Класс Page расширяет класс View. За основной контейнер берет главную страницу приложения. Служит для отображения корзины в шапке сайта и показа количества добавленного товара в ней, также данный класс служит за отображение блока с карточками товаров. */
export class Page extends View<TPage> implements IPage {
    protected _catalog: HTMLElement;// контейнер для отображения карточек товаров
    protected _counter: HTMLSpanElement;// показывает количество добавленных товаров в корзину
    protected buttonBasket: HTMLButtonElement;// иконка-кнопка, которая открывает модальное окно корзины
    protected pageContent: HTMLDivElement;// отвечает за внутренннее содержимое страницы

    constructor(container: HTMLElement, events: IEvents) {
        super(container, events);
        this.buttonBasket = ensureElement<HTMLButtonElement>('.header__basket', container);
        this.buttonBasket.addEventListener('click', () => events.emit('modal-basket:open'));
        this._counter = ensureElement<HTMLSpanElement>('.header__basket-counter', this.buttonBasket);
        this._catalog = ensureElement<HTMLElement>('.gallery', container);
        this.pageContent = ensureElement<HTMLDivElement>('.page__wrapper', container)
       }

    set catalog(cards: HTMLElement[]) {// записывает карточки в _catalog для отображения их на главной странице
        this._catalog.replaceChildren(...cards);
    }

    set counter(value: number) {// записывает количество добавленных товаров в корзину
        this.setText(this._counter, String(value));
    }

    lockScreen(value: boolean): void {// метод для блокировки прокрутки при открытии модального окна
        if(value) {
            this.pageContent.classList.add('page__wrapper_locked');
        } else (
            this.pageContent.classList.remove('page__wrapper_locked')
        )
    }
}