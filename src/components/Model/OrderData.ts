import { IClient, IOrderData, TPayment } from "../../types";

/** Класс OrderData
Класс отвечает за хранение и логику данных при оформлении заказа в корзине. */
export class OrderData implements IOrderData {
    protected _customerInfo: IClient;
    protected _payment: TPayment; // способ оплаты
    protected _email: string; //  почта покупателя
    protected _phone: string; // телефон покупателя
    protected _address: string; // адрес покупателя
    protected _total: number; // общая стоимость заказа
    protected _items: string[]; // список id товаров заказа
    
    constructor() {

    }

    set payment(value: TPayment) {// список id товаров заказа
        this._payment = value;
    }

    set email(value: string) {// запись email покупателя
        this._email = value;
    }

    set address(value: string) {// запись адреса покупателя
        this._address = value;
    }

    set phone(value: string) {// запись номера телефона
        this._phone = value;
    }

    set total(value: number) {// запись общей суммы покупок
        this._total = value;;
    }

    set items(value: string[]) {// запись id товаров заказа
        this._items = value;
    }

    get customerInfo() {// возвращение всей информации о заказе в формате необходимом для отправки в теле post запроса на сервер. 
        return {
            payment: this._payment,
			email: this._email,
			phone: this._phone,
			address: this._address,
			total: this._total,
			items: this._items
        }
    }
}