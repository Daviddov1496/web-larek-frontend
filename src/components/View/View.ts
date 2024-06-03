import { IEvents } from "../base/events";

/** Абстрактный класс View является дженериком и служит шаблоном для классов слоя представления */
export abstract class View<T> {
    protected container: HTMLElement;// DOM элемент, передаваемый в конструкторе
    protected events: IEvents;// объект класса `EventEmitter` для инициации событий при изменении данных
    private _wrapper: HTMLButtonElement;
    private _valid: any;
    public get valid(): any {
        return this._valid;
    }
    public set valid(value: any) {
        this._valid = value;
    }


    constructor(container: HTMLElement, events: IEvents) {
        this.container = container;// DOM элемент компонента
        this.events = events;// объект класса `EventEmitter` для инициации событий при изменении данных
    }

    // Инструментарий для работы с DOM в дочерних компонентах

    // Переключить класс
    toggleClass(element: HTMLElement, className: string, force?: boolean) {
        element.classList.toggle(className, force);
    }

    // Установить текстовое содержимое
    protected setText(element: HTMLElement, value: unknown) {
        if (element) {
            element.textContent = String(value);
        }
    }

    // Сменить статус блокировки
    setDisabled(element: HTMLElement, state: boolean) {
        if (element) {
            if (state) element.setAttribute('disabled', 'disabled');
            else element.removeAttribute('disabled');
        }
    }

    // Скрыть
    protected setHidden(element: HTMLElement) {
        element.style.display = 'none';
    }

    // Показать
    protected setVisible(element: HTMLElement) {
        element.style.removeProperty('display');
    }

    // Установить изображение с алтернативным текстом
    protected setImage(element: HTMLImageElement, src: string, alt?: string) {
        if (element) {
            element.src = src;
            if (alt) {
                element.alt = alt;
            }
        }
    }

    render(data?: Partial<T>): HTMLElement {//возвращает отрисованный html элемент по переданным данным
        Object.assign(this as object, data ?? {});
        return this.container;
    }
}