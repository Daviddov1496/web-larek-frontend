import { IEvents } from "../components/base/events";

/** Описание товара  */
export interface IProduct {
    id: string;
    title: string;
    description: string;
    category: string;
    image: string;
    price: number | null;
}

/**  Интерфейс корзины  */
export interface IBasketModel { 
    product: Map<string, number>;
    add(id: string): void;
    remove(id: string): void;
}

/** Интерфейс для хранения списка товаров */ 
export interface CatalogModel { 
    product: IProduct[]; // список товаров
    setItems(items: IProduct[]): void; // чтобы установить после загрузки апи // Метод чтобы сохранить с сервера
    getProduct(id: string): IProduct; // чтобы получить при рендере сприсков // метод чтобы получать список по необходимости
}

/** Интерфейс для модального окна заказа */
export interface IOrderForm {
    payment?: string;
    address?: string;
    phone?: string;
    email?: string;
    total?: string | number;
}

/** интерфейс конструктора ,на входе d контейнер в который будем выводить */
export interface IViewConstructor { 
    new (container: HTMLElement, events?: IEvents): IView; 
}

/** интерфейс отображения */ 
export interface IView { // устанавливаем данные и возвращаем контейнер  
    render(data?: object): HTMLElement; // Он получает данные и возвращает разметку с заполненными данными
}