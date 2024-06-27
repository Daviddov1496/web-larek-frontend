import { IFormOrder, TFormOrder, TPayment } from "../../types";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { Form } from "./Form";

/** Класс FormOrder расширяет класс Form. Форма для указания способа доставки и адреса доставки */
export class FormOrder extends Form<TFormOrder> implements IFormOrder {
    protected _containerButtons: HTMLDivElement;// контейнер, содержащий кнопки "онлайн" и "при получении"
    protected _buttonCard: HTMLButtonElement;// кнопка "онлайн"
    protected _buttonCash: HTMLButtonElement;// кнопка "при получении"
    protected _inputAddress: HTMLInputElement;// поле для ввода адреса покупателя

    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);
        this._containerButtons = ensureElement<HTMLDivElement>('.order__buttons', container);
        this._buttonCard = ensureElement<HTMLButtonElement>('button[name="card"]', this._containerButtons);
        this._buttonCash = ensureElement<HTMLButtonElement>('button[name="cash"]', this._containerButtons);
        this._inputAddress = ensureElement<HTMLInputElement>('input[name=address]', container);
        this._containerButtons.addEventListener('click', (event) => {
            if((event.target === this._buttonCard) || (event.target === this._buttonCash)) {
              const buttonActive = event.target as HTMLButtonElement;
              this.resetButtons();
              this.toggleClass(buttonActive, 'button_alt-active');// Добавил toggleClass сюда
              this.events.emit('order:valid')
            }
          })
    }

    protected getButtonActive(): HTMLButtonElement | null {// метод: возвращает кнопку, которая активна
        if(this._buttonCard.classList.contains('button_alt-active')) {
          return this._buttonCard
        } else if(this._buttonCash.classList.contains('button_alt-active')) {
          return this._buttonCash
        }
        return null;
    }

    protected resetButtons(): void {// очищает класс активности с кнопок "Онлайн" и "При получении"
        this.toggleClass(this._buttonCard, 'button_alt-active', false );
        this.toggleClass(this._buttonCash, 'button_alt-active', false );
    }

    clear() {// Очищает форму
        super.clear();
        this.resetButtons()
    }
  

    get payment() {// возвращает имя активной кнопки
        const buttonActive = this.getButtonActive();
        
        return buttonActive ? buttonActive.name as TPayment : null; 
    }

    get address() {// возвращает адрес покупателя
        return this._inputAddress.value;
    }
  /** валидация */
    get valid() {
      if(!(super.valid) && Boolean(this.payment)) {
        return false
      }
      else if ((super.valid) && Boolean(this.payment)) {
        return true
      }
      else if ((super.valid) && !Boolean(this.payment)) {
        return true
      }
      return true
    }

    set valid(value: boolean) {
      super.valid = value;
    }

}