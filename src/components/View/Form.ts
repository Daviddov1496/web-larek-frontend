import { IForm, TForm } from "../../types";
import { ensureAllElements, ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { View } from "./View";

/** Класс Form расширяет класс View. Является абстрактным классом дженериком и шаблоном для форм приложения. Реализует пользовательский функционал с формами. */
export abstract class Form<T> extends View<TForm> implements IForm {
    protected _errorMessage: HTMLElement;// для отображения ошибок формы
    protected container: HTMLFormElement;// форма
    protected _inputList: HTMLInputElement[];// массив инпутов формы
    protected _submitButton: HTMLButtonElement;// кнопка отправки формы(сабмита)

    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);
        this._inputList = ensureAllElements<HTMLInputElement>('.form__input', container);
        this._submitButton = ensureElement<HTMLButtonElement>('button[type=submit]', container);
        this._errorMessage = ensureElement<HTMLElement>('.form__errors' , container);
        this.container.addEventListener('submit', (event: Event) => {
            event.preventDefault();// отключаю поведение по-умолчанию
            this.events.emit(`${this.container.name}:submit`)
        });
        
        this._inputList.forEach(input => {
            input.addEventListener('input', () => this.events.emit(`${this.container.name}:valid`))
        });
        
        this.container.addEventListener('input', (e: Event) => {
            const target = e.target as HTMLInputElement;
            const field = target.name as keyof T;
            const value = target.value;
            this.onInputChange(field, value);
        });
    }

    protected onInputChange(field: keyof T, value: string) {
        this.events.emit(`${this.container.name}.${String(field)}:change`, {
            field,
            value
        });
    }

    get valid() {// проверка на валидность формы
        return this._inputList.every(input => input.value.length === 0);
    }

    set valid(value: boolean) {// для актиации кнопки отправки формы
        this.setDisabled(this._submitButton, value);
    }

    set errorMessage(value: string[]) {// установка ошибок
        this.setText(this._errorMessage, value);
    }

    clear(): void {// очистка формы
        this.container.reset();
    }

    render(data: Partial<T> & TForm ) {// рендер с учетом валидности и сообшений об ошибках
        const {valid, errorMessage, ..._inputList} = data;
        super.render({valid, errorMessage})
        Object.assign(this, _inputList);
        return this.container;
    }
}       
 //const {valid, ...otherFormData} = data;
        //this.valid = valid;
       // return super.render(otherFormData)