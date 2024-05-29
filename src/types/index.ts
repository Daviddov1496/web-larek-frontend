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

/** Массив товаров */ 
export interface IProductsData {
    products: IProduct[];
    getProduct(id: string): IProduct | undefined;
}

/** Массив товаров в корзине */ 
export interface IBasketData {
    purchases: IProduct[];
    addPurchase(value: IProduct): void;
    deletePurchase(id: string): void;
    getQuantity(): number;
    checkProduct(id: string): boolean;
    getTotal(): number;
    getIdList(): string[];
    clear(): void;
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

/** интерфейс принимающий информацию о клиенте */ 
export interface IClient {
    payment: TPayment;
    email: string;
    phone: string;
    address: string;
    total: number;
    items: string[];
}
  
export interface IOrderData extends IClient {
    customerInfo: IClient;
}

export interface IOrderDataBuilder {
    purchasesInfo: TPurchasesInfo;
    deliveryInfo: TDeliveryInfo;
    contactsInfo: TContactsInfo;
    getOrderData(): IClient;
}

/** интерфейс конструктора нового заказа */ 
export interface IOrderConstructor {
    new (): IOrderData;
}

/** интерфейс успешного оформленя заказа */ 
export interface ISuccessData {
    orderSuccess: TSuccessData;
}
/** интерфейс  */
export interface ICard {
    id: string;
    title: string;
    price: string;
}
/** интерфейс  */
export interface ICardCatalog {
    image: string;
    category: string;
}
/** интерфейс  */
export interface ICardBasket {
    index: number;
}
/** интерфейс  */
export interface ICardPreview {
    description: string;
    priceCheck: boolean;
    state: boolean;
}
/** интерфейс  */
export interface IPage {
    catalog: HTMLElement[];
    count: number;
    lockScreen(value: boolean): void;
}
/** интерфейс  */
export interface IModal {
    content: HTMLElement;
    open(): void;
    close(): void;
}
/** интерфейс  */
export interface IForm {
    valid: boolean;
    errorMessage: string;
    clear(): void;
}
/** интерфейс  */
export interface IFormOrder {
    payment: TPayment | null;
    address: string;
    valid: boolean;
    clear(): void; 
    render(data: object ): HTMLElement; 
}
/** интерфейс для указания телефона и email покупателя */
export interface IFormContacts {
    email: string;
    phone: string;
    valid: boolean;
}
/** интерфейс уведомления об успешной покупке */
export interface ISuccess {
    description: string;
}
/** интерфейс предоставляет методы реализующие взаимодействие с сервером */
export interface IApiExtender {
    getProducts(): Promise<IProduct[]>;
    getProductById(id: string): Promise<IProduct>;
    postOrder(order: IClient): Promise<TSuccessData>;
  }

export type TPurchasesInfo = Pick<IClient, 'total' | 'items'>;
export type TDeliveryInfo = Pick<IClient, 'payment' | 'address'>;
export type TContactsInfo = Pick<IClient, 'email' | 'phone' >
export type TCardCatalog = Omit<IProduct, 'description'>;
export type TCategoryClassNames = 'card__category_soft' |'card__category_other' | 'card__category_additional' | 'card__category_button' | 'card__category_hard';
export type TCategoryClasses = Record<string, TCategoryClassNames>;
export type TCardBasket = Pick<IProduct, 'id' | 'title' | 'price'> & {index: number};
export type TCardPreview = IProduct & {priceCheck: boolean; state: boolean};
export type TPage = {counter: number, catalog: HTMLElement[]};
export type TBasket = {cardsList: HTMLElement[]; total: number; emptyCheck: boolean};
export type TModal ={content: HTMLElement};
export type TForm = {valid: boolean}
export type TPayment = 'card' | 'cash';
export type TFormOrder = {payment: TPayment; address: string};
export type TFormContacts = {email: string; phone: string};
export type TSuccessData = {id: string; total: number};
export type TSuccess = {description: string};
export type TId = {id: string};
