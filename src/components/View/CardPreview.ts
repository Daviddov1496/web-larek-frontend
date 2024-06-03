import { ICardPreview, TCardPreview } from "../../types";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { CardCatalog } from "./CardCatalog"


/** Класс CardPreview расширяет класс CardCatalog. Служит для предварительного просмотра карточки товара с более детальным описанием и возможностью добавления его в корзину. */
export class CardPreview extends CardCatalog<TCardPreview> implements ICardPreview {
    protected _description: HTMLParagraphElement;// html элемент, отвечающий за отображение описания товара
    protected buttonBuyDelete: HTMLButtonElement;// кнопка для покупки товара или удаления товара из корзины в случае, если он уже был добавлен в нее

    constructor(container: HTMLElement, events: IEvents) {
        super(container, events);
        this._description = ensureElement<HTMLParagraphElement>('.card__image', container);
        this.buttonBuyDelete = ensureElement<HTMLButtonElement>('.card__button', container);
        this.buttonBuyDelete.addEventListener('click', () => {
            if(this.buttonBuyDelete.textContent === 'Купить') {
                this.events.emit('purchases:add', {id: this.id});
            } else {
                this.events.emit('purchases:delete', {id: this.id})
            }
        })
    }

    set description(value: string) {// записвает описание товара
        this.setText(this._description, value);
    }

    set priceCheck(value: boolean) {// записывает булево значение для блокировки кнопки добавления в корзину
        this.setDisabled(this.buttonBuyDelete, !value);
    }

    get priceCheck() {// возвращает булево значение для блокировки кнопки добавления в корзину
        return !this.buttonBuyDelete.disabled;
    }

    set state(value: boolean) {// устанавливает состояние кнопки
        if(!this.priceCheck) {
            this.setText(this.buttonBuyDelete, "Не продается");// в модальном окне открыт бесценный товар
        } else {
            if(value) {
                this.setText(this.buttonBuyDelete, "Убрать из корзины")//в модальном окне открыт товар, который уже находится в корзине
            } else 
            this.setText(this.buttonBuyDelete, "Купить");// в модальном окне открыт товар, которого нет в корзине
        }
        }
    }