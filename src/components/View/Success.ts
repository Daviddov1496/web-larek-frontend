import { ISuccess, TSuccess } from "../../types";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { View } from "./View";

/** Класс Success наследует класс View. Уведомление об успешной покупке, содержит кнопку "за новыми покупками!". */
export class Success extends View<TSuccess> implements ISuccess {
    protected buttonOrderSuccess: HTMLButtonElement;// кнопка "За новыми покупками"
    protected _description: HTMLParagraphElement;// элемент, отвечающий за показ потраченных средств за все покупки.

    constructor(container: HTMLElement, events: IEvents) {
        super(container, events);
        this.buttonOrderSuccess = ensureElement<HTMLButtonElement>('.order-success__close', container);
        this._description = ensureElement<HTMLParagraphElement>('.order-success__description', container);
        this.buttonOrderSuccess.addEventListener('click', () => this.events.emit('success:confirm'))
      }

    set description(total: string) {// устанавливает количество потраченных средств в html элемент _description.
        this._description.textContent = `Списано ${total} синапсов`
    }
}