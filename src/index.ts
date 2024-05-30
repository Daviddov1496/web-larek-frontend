// Необходиме импорты для приложения
import { EventEmitter } from './components/base/events';
import './scss/styles.scss';
import { API_URL, CDN_URL } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';
import { ApiExtender } from './components/ApiExtender';
import { ProductsData } from './components/Model/ProductData';
import { BasketData } from './components/Model/BasketData';
import { OrderData } from './components/Model/OrderData';
import { OrderDataBuilder } from './components/Model/OrderDataBuilder';
import { SuccessData } from './components/Model/SuccessData';
import { CardCatalog } from './components/View/CardCatalog';
import { CardBasket } from './components/View/CardBasket';
import { CardPreview } from './components/View/CardPreview';
import { Page } from './components/View/Page';
import { Basket } from './components/View/Basket';
import { Modal } from './components/View/Modal';
import { FormOrder } from './components/View/FormOrder';
import { FormContacts } from './components/View/FormContacts';
import { Success } from './components/View/Success';
import { IProduct, TCardCatalog, TId, TSuccessData } from './types';

// Контейнеры и темплейты для классов представления
const containerPage = ensureElement<HTMLElement>('.page');
const containerModal = ensureElement<HTMLDivElement>('#modal-container');
const templateCardCatalog = ensureElement<HTMLTemplateElement>('#card-catalog');
const templateCardPreview = ensureElement<HTMLTemplateElement>('#card-preview');
const templateCardBasket = ensureElement<HTMLTemplateElement>('#card-basket');
const templateBasket = ensureElement<HTMLTemplateElement>('#basket');
const templateOrder = ensureElement<HTMLTemplateElement>('#order');
const templateContacts = ensureElement<HTMLTemplateElement>('#contacts');
const templateSuccess = ensureElement<HTMLTemplateElement>('#success');

// Необходимые экземпляры классов ApiExtender и EventEmitter
const api = new ApiExtender(CDN_URL, API_URL);
const events = new EventEmitter();

// Необходимые экземпляры классов слоя Model
const productsData = new ProductsData(events);
const basketData = new BasketData(events);
const orderDataBuilder = new OrderDataBuilder(events, OrderData);
const successData = new SuccessData(events);

//Создаем необходимые экземпляры классов слоя Presenter
const page = new Page(containerPage, events);
const modal = new Modal(containerModal, events);
const cardPreview = new CardPreview(cloneTemplate(templateCardPreview), events);
const basket = new Basket(cloneTemplate(templateBasket), events);
const formOrder = new FormOrder(cloneTemplate(templateOrder), events);
const formContacts = new FormContacts(cloneTemplate(templateContacts), events);
const success = new Success(cloneTemplate(templateSuccess), events);

// Обработаем события изменения данных
// получение данных о продуктах с сервера
api.getProducts().then((data) => {
  productsData.products = data
}).catch(console.error)

// реагируем на изменение (получение) данных о продуктах 
events.on('products:changed', (products: IProduct[]) => {
  const cardsList = products.map((product) => {
    const card = new CardCatalog<TCardCatalog>(cloneTemplate(templateCardCatalog), events);
    return card.render(product)
 })
 page.render({catalog: cardsList})
});

//Прежде чем переходить к пользовательски событиям, обработаем поведение модального окна 
//обработаем событие открытия модального окна
events.on('modal:open', () => {
  page.lockScreen(true);
});

//обработаем событие закрытия модального окна
events.on('modal:close', () => {
  page.lockScreen(false);
});

//Далее идет обработка пользовательских событий 
//обработаем событие, когда покупатель кликнул по иконке(кнопке) корзины на главной старанице
events.on('modal-basket:open', () => {
  modal.render({ content: basket.render({total: basketData.getTotal(), emptyCheck: basketData.getQuantity() === 0})});
  modal.open();
});

//обработаем событие, когда покупатель кликнул по какой-нибудь карточке в каталоге на главной странице
events.on('modal-card:open',(data: TId) => {
  const productCorrect = productsData.getProduct(data.id);
  if(productCorrect) { 
  modal.render({ content: cardPreview.render({...productCorrect, priceCheck: Boolean(productCorrect.price), state: basketData.checkProduct(productCorrect.id)})});
  modal.open();
  }
});

//обработаем событие добавления товара в корзину
events.on('purchases:add', (data: TId) => {
  basketData.addPurchase(productsData.getProduct(data.id))
});

//обработаем событие удаления товара из корзины 
events.on('purchases:delete', (data: TId) => {
  basketData.deletePurchase(data.id)
});

//обработаем событие на изменения в покупках пользователя и сформируем корзину
events.on('purchases:changed', (data: TId) => {
  cardPreview.render({priceCheck: true, state: !basketData.checkProduct(data.id)});
  page.render({counter: basketData.getQuantity()});
  const purchasesList = basketData.purchases.map((purchase, index) => {
    const cardBasket = new CardBasket(cloneTemplate(templateCardBasket), events);
    return cardBasket.render({...purchase, index: ++index})
  });
  basket.render({cardsList: purchasesList, total: basketData.getTotal(), emptyCheck: basketData.getQuantity() === 0})
});

//после того, как определились с покупками, записываем данные с корзины, необходмые для заказа и переходим к форме доставки: обработаем данное событие
events.on('modal-order:open', () => {
  orderDataBuilder.purchasesInfo = {total: basketData.getTotal(), items: basketData.getIdList()};
  modal.render({content: formOrder.render({valid: formOrder.valid})})
});

//обработаем взаимодействие пользователя с полями формы доставки
events.on('order:valid', () => {
  formOrder.valid = formOrder.valid;
  orderDataBuilder.deliveryInfo = {payment: formOrder.payment, address: formOrder.address}
});

//после заполнения формы доставки и записи для заказа соответствующих данных для заказа, переходи к форме контактных данных: обработаем данное событие
events.on(`order:submit`, () => {
  modal.render({content: formContacts.render({valid: formContacts.valid})})
});

//обработаем взаимодействие пользователя с полями формы контактных данных
events.on('contacts:valid', () => {
  formContacts.valid = formContacts.valid;
  orderDataBuilder.contactsInfo = {email: formContacts.email, phone: formContacts.phone};
});

/*
после успешного заполнения формы контактных данных отправляем сформированный заказ на сервер,
получаем от сервера данные, записываем их и очищаем корзину и формы: обработаем данное событие
*/
events.on('contacts:submit', () => {
  const order = orderDataBuilder.getOrderData().clientInfo;
  api.postOrder(order).then((data: TSuccessData) => {
    successData.orderSuccess = data;
    formOrder.clear();
    formContacts.clear();
    basketData.clear();
  }).catch(console.error)
});

//реагируем на получение данных с сервера и записываем в соответсвующий объект класса слоя данных
events.on('success:changed', (data: TSuccessData) => {
  modal.render({content: success.render({description: String(data.total)})})
});

//событие об успешной покупке обрабатываем путем закрытия окна нажатием на кнопку "За новыми покупками"
events.on('success:confirm', () => {
  modal.close();
})
