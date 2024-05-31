import { ISuccessData, TSuccessData } from "../../types";
import { IEvents } from "../base/events";
import { Model } from "./Model";

/** Класс SuccessData
Расширяет класс Model. Класс отвечает за данные, получаемые с сервера после успешного оформления заказа */
export class SuccessData extends Model implements ISuccessData  {
    protected _orderSuccess: TSuccessData;// получает данные с сервера об успешном заказе

    constructor(events: IEvents) {
        super(events);
    }

    set orderSuccess(value: TSuccessData) {// получение и запись данных с сервера об оформлении заказа
        this._orderSuccess = value;
        this.events.emit('success:changed', this._orderSuccess)
    }

    get orderSuccess() {// Возвращение данных об успешном оформлении заказа
        return this._orderSuccess;
    }
}