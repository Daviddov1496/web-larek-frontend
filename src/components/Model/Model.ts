import { IEvents } from "../base/events";

/** Абстрактный класс Model служит шаблоном для классов слоя данных. */
export abstract class Model {
    protected events: IEvents // объект класса EventEmitter для инициации событий при изменении данных.

    constructor(events: IEvents) {
        this.events = events;
    }
}