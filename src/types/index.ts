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

/** Интерфейс корзины  */
export interface IBasketModel { 
    product: Map<string, number>;
    add(id: string): void;
    remove(id: string): void;
}

/** Интерфейс для модального окна заказа */
export interface IOrderForm {
    payment?: string;
    address?: string;
    phone?: string;
    email?: string;
    total?: string | number;
}

/** интерфейс принимающий информацию о клиенте */ 
export interface IClient{
    payment: TPayment;
    email: string;
    phone: string;
    address: string;
    total: number;
    items: string[];
  }
/** интерфейс для хранение данных и логики при оформлении заказа в корзине */
export interface IOrderData extends IClient {
    clientInfo: IClient;
  }

/** интерфейс для 3-х этапного формирование заказа */
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
/** общий интерфейс карточки */
export interface ICard {
    id: string;
    title: string;
    price: string;
}

/** интерфейс для отображения карточки в каталоге на главной странице приложения */
export interface ICardCatalog {
    image: string;
    category: string;
}

/** интерфейс для отображения карточки товара в корзине */
export interface ICardBasket {
    index: number;
}

/** интерфейс для предварительного просмотра карточки товара с более детальным описанием и возможностью добавления его в корзину */
export interface ICardPreview {
    description: string;
    priceCheck: boolean;
    state: boolean;
}

/** интерфейс отображения контента на странице */
export interface IPage {
    catalog: HTMLElement[];
    counter: number;
    lockScreen(value: boolean): void;
}

/** интерфейс модальных окон */
export interface IModal {
    content: HTMLElement;
    open(): void;
    close(): void;
}

/** интерфейс для форм приложения */
export interface IForm {
    valid: boolean;
    errorMessage: string;
    clear(): void;
}

/** интерфейс для указания способа доставки и адреса доставки */
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
    postOrder(order:IClient): Promise<TSuccessData>;
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