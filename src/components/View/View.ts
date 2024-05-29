import { IEvents } from "../base/events";

/** Абстрактный класс View является дженериком и служит шаблоном для классов слоя представления */
export abstract class View<T> {
    protected container: HTMLElement;// DOM элемент, передаваемый в конструкторе
    protected events: IEvents;// объект класса `EventEmitter` для инициации событий при изменении данных


    constructor(container: HTMLElement, events: IEvents) {
        this.container = container;// DOM элемент компонента
        this.events = events;// объект класса `EventEmitter` для инициации событий при изменении данных
    }

    render(data?: Partial<T>): HTMLElement {//возвращает отрисованный html элемент по переданным данным
        Object.assign(this as object, data ?? {});
        return this.container;
    }
}