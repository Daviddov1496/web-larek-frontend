import { IBasketData, IProduct } from "../../types";
import { IEvents } from "../base/events";
import { Model } from "./Model";

/** Класс отвечает за хранение и логику товаров, добавленных покупателем в корзину */
export class BasketData extends Model implements IBasketData {
    protected _purchases: IProduct[]; // массив добавленных товаров в корзине покупателя

    constructor(events: IEvents) {
        super(events);// передается объект events, который используется для работы с событиями
        this._purchases = [];// Поле _purchases содержит массив продуктов, которые добавлены в корзину
    }

    get purchases() {// получить массив добавленных товаров в корзину _purchases
        return this._purchases;
    }

    addPurchase(value: IProduct): void {// добавить товар в массив _purchases (в корзину)
        if(!this._purchases.find(purchase => {purchase.id === value.id;})) {// при условии что такого продукта еще нет в корзине
        this._purchases.push(value);
        this.events.emit('purchases:changed', { id: value.id });// и вызывает событие purchases:changed.
        }
    }

    deletePurchase(id: string): void {// удалить товар из массива _purchases по id
        this._purchases = this._purchases.filter(purchase => purchase.id !== id);
        this.events.emit('purchases:changed', {id})
    }

    getQuantity(): number {// получить общее количество добавленных товаров в корзину
        return this._purchases.length
    }

    checkProduct(id: string) {// проверяет наличие продукта в корзине по id
        return Boolean(this._purchases.find(purchase => purchase.id === id));
    }

    getTotal() {// получить общую сумму и стоимость всех товаров, добавленных в корзину
        return this._purchases.reduce((sum, purchase) => {
            return sum + purchase.price;
        }, 0)
    }

    getIdList() {// получить список id товаров добавленных в корзину (нужен для post запроса при оформлении заказа)
        return this._purchases.map(purchase => {
            return purchase.id
          })
    }

    clear(): void {// очистка корзины после успешно оформленного заказа
        this._purchases = [];
        this.events.emit('purchases:changed', {});
    }
}