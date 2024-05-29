import { IProduct, IProductsData } from "../../types";
import { IEvents } from "../base/events";
import { Model } from "./Model";

/** Класс ProductsData Расширяет класс Model. Класс отвечает за хранение и логику работы с данными товаров. */
export class ProductsData extends Model implements IProductsData {
    protected _products: IProduct[]; // массив объектов товаров.
    
    constructor(events: IEvents) { // инициализируется массив _products, который содержит информацию о продуктах. 
        super(events);
        this._products = [];
    } 

    set products(value: IProduct[]) { // записывает массив продуктов, добавленных в корзину
        this._products = value;
        this.events.emit('products:chaged', this._products); // генерирует событие 'products:changed', которое оповещает другие части программы об изменениях в данных о продуктах.
    }

    get products() { // возвращает массив продуктов, добавленных в корзину
        return this._products;
    }

    getProduct(id: string) { // используется для поиска продукта по его id. Он принимает id в качестве аргумента и возвращает продукт из массива _products, у которого значение свойства id совпадает с переданным id.
        return this._products.find((product) => {
            return (product.id === id)
        })
    }
}