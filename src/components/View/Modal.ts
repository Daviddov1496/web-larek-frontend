import { IModal, TModal } from "../../types";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { View } from "./View";

/** Класс Modal расширяет класс View. Создает модальное окно. Устанавливает слушатели кликов на оверлей и кнопку-крестик для закрытия попапа. */
export class Modal extends View<TModal> implements IModal {
    protected _content: HTMLElement;// содержимое модального окна
    protected buttonClose: HTMLButtonElement;// кнопка закрытия модального окна
    
    constructor(container: HTMLElement, events: IEvents) {
        super(container, events);
        this.container.addEventListener('mouseup', (event) => {
            if(event.target === event.currentTarget) {
                this.close()
            }
        });
        this._content = ensureElement<HTMLElement>('.modal__content', container);
        this.buttonClose = ensureElement<HTMLButtonElement>('.modal__close', container);
        this.buttonClose.addEventListener('click', () => this.close())
    }

    open(): void {// открытие модального окна
        this.container.classList.add('modal_active')
        this.events.emit('modal:open')
    }
    close(): void {// закрытие модального окна
        this.container.classList.remove('modal_active')
        this.events.emit('modal:close')
    }
    
    set content(value: HTMLElement) {// для возможности изменения внутреннего содержимого модального окна
        this._content.replaceChildren(value);
    }
}