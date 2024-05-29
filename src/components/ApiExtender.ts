import { IApiExtender, IClient, IProduct, TSuccessData } from "../types";
import { Api, ApiListResponse } from "./base/api";

/** Класс ApiExtender расширяет класс Api и предоставляет методы реализующие взаимодействие с сервером. */
export class ApiExtender extends Api implements IApiExtender {
    protected cdn: string;// базовый путь до изображений карточек, передаваемый в конструкторе

    constructor(cdn: string, baseUrl: string, options: RequestInit = {}) {
        super(baseUrl, options);
        this.cdn = cdn;
    }
    
    getProducts(): Promise<IProduct[]> {// получает с сервера массив объектов всех товаров
        return this.get('/product').then((list: ApiListResponse<IProduct>) => {
          return list.items.map((item) => { return {...item, image: this.cdn + item.image}})
        })
    }

    getProductById(id: string): Promise<IProduct> {// получает с сервера конкретный товар по id
        return this.get('/product/' + id).then((product: IProduct) => {
          return {...product, image: this.cdn + product.image}
        })
    }

    postOrder(order: IClient): Promise<TSuccessData> {// отправляет post запрос на сервер, содержащий данные о заказе и получает номер заказа и общую сумму заказ
        return this.post('/order', order).then((success: TSuccessData) => {
          return success;
        })
    }
}