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
}