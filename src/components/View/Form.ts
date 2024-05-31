import { IForm, TForm } from "../../types";
import { ensureAllElements, ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { View } from "./View";

/** Класс Form расширяет класс View. Является абстрактным классом дженериком и шаблоном для форм приложения. Реализует пользовательский функционал с формами. */
export abstract class Form<T> extends View<TForm> implements IForm {
    protected _errorMessage: HTMLSpanElement;// для отображения ошибок формы
    protected container: HTMLFormElement;// форма
    protected _inputList: HTMLInputElement[];// массив инпутов формы
    protected _submitButton: HTMLButtonElement;// кнопка отправки формы(сабмита)

    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);
        this._inputList = ensureAllElements<HTMLInputElement>('.form__input', container);
        this._submitButton = ensureElement<HTMLButtonElement>('button[type=submit]', container);
        this._errorMessage = ensureElement<HTMLSpanElement>('.form__errors' , container);
        this.container.addEventListener('submit', (event: Event) => {
            event.preventDefault();// отключаю поведение по-умолчанию
            this.events.emit(`${this.container.name}:submit`)
        });
        this._inputList.forEach(input => {
            input.addEventListener('input', () => this.events.emit(`${this.container.name}:valid`))
        });
    }
    
    get valid() {// проверка на валидность формы
        return this._inputList.every(input => input.value.length === 0);
    }

    set valid(value: boolean) {// для актиации кнопки отправки формы
        this._submitButton.disabled = value;
    }

    set errorMessage(value: string) {// установка ошибок
        this._errorMessage.textContent = value;
    }

    clear(): void {// очистка формы
        this.container.reset();
    }

    render(data: Partial<T> & TForm ): HTMLElement {// рендер с учетом валидности и сообшений об ошибках
        const {valid, ...otherFormData} = data;
        this.valid = valid;
        return super.render(otherFormData)
    }
}