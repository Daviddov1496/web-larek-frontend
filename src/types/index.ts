import { EventEmitter, IEvents } from "../components/base/events"

/**  Интерфейс корзины  */
export interface IBasketModel { 
    items: Map<string, number>;
    add(id: string): void;
    remove(id: string): void;
}

/** Описание товара  */
export interface IProduct {
    id: string;
    title: string;
}

/** Интерфейс для хранения списка товаров */ 
export interface CatalogModel { 
    items: IProduct[];
    setItems(items: IProduct[]): void; // чтобы установить после загрузки апи // Метод чтобы сохранить с сервера
    getProduct(id: string): IProduct; // чтобы получить при рендере сприсков // метод чтобы получать список по необходимости
}

/** Реализация компонентов отображения 
/* интерфейс конструктора  
/* на входе контейнер в который будем выводить */
export interface IViewConstructor { 
    new (container: HTMLElement, events?: IEvents): IView; 
}
/** интерфейс отображения */ 
export interface IView { 
    render(data?: object): HTMLElement; 
    // устанавливаем данные и возвращаем контейнер 
    // Он получает данные и возвращает разметку с заполненными данными
}


 /** класс корзины в который имплементируется интерфейс */ 
 export class BasketModel implements IBasketModel {
    constructor( protected events: IEvents) {}
    items: Map<string, number>;

    add(id: string): void {
        //...
        this._changed();
    }
    remove(id: string): void {
        //...
        this._changed();
    }

    protected _changed() { // метод генерирующий уведомление об изменениях
        this.events.emit('basket:change', { items: Array.from(this.items.keys()) })
    }
}

/** Реализация отображения товара в корзине */
export class BasketItemView implements IView {
    // элементы внутри контейнера
    protected title: HTMLSpanElement;
    protected addButton: HTMLButtonElement;
    protected removeButton: HTMLButtonElement;

    // данные, которые хотим сохрнить на будущее
    protected id: string | null = null;

    constructor(protected container: HTMLElement, protected events: IEvents) {
        // иницализируем, чтобы не сискат повторно
        this.title = container.querySelector('.basket-item__title') as HTMLSpanElement;
        this.addButton = container.querySelector('.basket-item__add') as HTMLButtonElement;
        this.removeButton = container.querySelector('.basket-item__remove') as HTMLButtonElement;
        
        // устанавливаем событие
        this.addButton.addEventListener('click', () => {
            // генерируем событие в брокере
            this.events.emit('ui:basket-add', { id: this.id })
        });
        this.addButton.addEventListener('click', () => {
            this.events.emit('ui:basket-remove', { id: this.id })
        });
    }

    render(data: { id: string, title: string }) {
        if(data) {
            //если есть данные, то заполнит их и выведет в интерфейс
            this.id = data.id;
            this.title.textContent = data.title;
        }
        return this.container;
    }
}
/** отображение передаваемого списка */ 
export class BasketView implements IView { 
    constructor(protected container: HTMLElement) {}
        render(data: {items: HTMLElement[] }) {
            if(data) {
                this.container.replaceChildren(...data.items)
            }
            return this.container;
        }
    }