import { IView } from "../../types";
import { BasketModel } from "./basket";
import { EventEmitter, IEvents } from "./events";

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
        if(data) { //если есть данные, то заполнит их и выведет в интерфейс           
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

// инициализация
const api = new ShopAPI();
const events = new EventEmitter();
const basketView = new BasketView(document.querySelector('.basket'));
const basketModel = new BasketModel(events);
const catalogModel = new CatalogModel(events);

// собрать функции или классы в отдельные экраны с логикой их формирования
function renderBasket(items: string[]) {
    basketView.render(
        items.map(id => {
            const itemView = new BasketItemView(events);
            return itemView.render(catalogModel.getProduct(id));
        })
    );
}

// при изменении рендера
events.on('basket:change',  (event: { items: string[] }) => {
    renderBasket(event.items);
});

// при действиях меняем модель, а после этого случится рендер
events.on('ui:basket-add',  (event: { id: string }) => {
    basketModel.add(event.id);
});

events.on('ui:basket-remove',  (event: { id: string }) => {
    basketModel.remove(event.id);
});

// подгружаем начальные данные и запускаем процессы
api.getCatalog()
    .then(catalogModel.setItems.bind(catalogModel))
    .catch(err => console.error(err));