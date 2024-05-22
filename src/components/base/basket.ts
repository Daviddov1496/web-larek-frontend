import { IBasketModel } from "../../types";
import { IEvents } from "./events";

/** класс корзины в который имплементируется интерфейс */ 
export class BasketModel implements IBasketModel {   
    constructor( protected events: IEvents) {}
    product: Map<string, number>;
    // this._changed();
    items: Map<string, number> = new Map();

    add(id: string): void {
        if(!this.items.has(id)) this.items.set(id, 0); // создаю новый
        this.items.set(id, this.items.get(id) ! + 1); // прибавляю колличество
    };
    remove(id: string): void {
        //this._changed();
        if(!this.items.has(id)) return; // если нет ,то ничего не делает
        if(this.items.get(id)! > 0) { // если есть и больше нуля...
            this.items.set(id, this.items.get(id)! - 1); // уменьшение
            if(this.items.get(id) === 0) this.items.delete(id); // если счетчик опуститя до нуля, то список удаляется
        }
    }

   protected _changed() { // метод генерирующий уведомление об изменениях
      this.events.emit('basket:change', { items: Array.from(this.items.keys()) }) // команда инициации события
   }
}