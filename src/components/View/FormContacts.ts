import { IFormContacts, TFormContacts } from "../../types";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { Form } from "./Form";

/** Класс FormContacts расширяет класс Form. Форма для указания телефона и почты покупателя. */
export class FormContacts extends Form<TFormContacts> implements IFormContacts {
    protected _inputEmail: HTMLInputElement;// поле для email
    protected _inputPhone: HTMLInputElement;// поле для номера телефона

    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events); 
        this._inputEmail = ensureElement<HTMLInputElement>('input[name=email]', container);
        this._inputPhone = ensureElement<HTMLInputElement>('input[name=phone]', container);
    }

    get email() {// возвращает email из поля email
        return this._inputEmail.value;
    }

    get phone() {// возвращает номер телефона из поля phone
        return this._inputPhone.value;
    }

   /**  get valid() {// возвращает валидность формы
        if(Boolean(this._inputEmail.value) && Boolean(this._inputPhone.value)) {
            this.errorMessage= '';
            return false;
        } else if(super.valid) {
            this.errorMessage ='Введите электронную почту и номер телефона';
            return true
        } else if(!Boolean(this._inputEmail.value) && Boolean(this._inputPhone.value)) {
            this.errorMessage ='Введите электронную почту';
            return true
        } else if(Boolean(this._inputEmail.value) && !Boolean(this._inputPhone.value)) {
            this.errorMessage ='Введите номер телефона';
            return true
        }
    }

    set valid(value: boolean) {// запись для блокировки кнопки submit
        this.setDisabled(this._submitButton, value);
    }*/
}