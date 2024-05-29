import { IClient, IOrderConstructor, IOrderData, IOrderDataBuilder, TContactsInfo, TDeliveryInfo, TPurchasesInfo } from "../../types";
import { IEvents } from "../base/events";
import { Model } from "./Model";

/** Класс OrderDataBuilder
Расширяет класс Model. Класс является билдером класса OrderData. Т.к. формирование заказа происходит в 3 этапа:
    1 - добавление товаров в корзину, 
    2 - указание способа покупки и адреса доставки, 
    3 - указание email и телефона. 
Экземпляр класса OrderData также создается поэтапно, благодаря классу OrderDataBuilder. */
export class OrderDataBuilder extends Model implements IOrderDataBuilder {
    protected order: IOrderData;// экземпляр интерфейса IOrderData (такой же как экземпляр класс OrderData)

    constructor(events: IEvents, orderConstructor: IOrderConstructor) {
        super(events);
        this.order = new orderConstructor();
    }

    set purchasesInfo(info: TPurchasesInfo) {// добавление товаров в корзину
        this.order.total = info.total;
        this.order.items = info.items;
    }

    set deliveryInfo(info: TDeliveryInfo) {// указание способа покупки и адреса доставки
        this.order.payment = info.payment;
        this.order.address = info.address;
    }

    set contactsInfo(info: TContactsInfo) {// указание email и телефона
        this.order.email = info.email;
        this.order.phone = info.phone;
    }

    getOrderData(): IClient { // возвращает всю информацию и сеттеров выше в заказ для показа готового списка
        return this.order;
    }
}
