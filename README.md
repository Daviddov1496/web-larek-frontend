# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```
## Стиль написания кода
Именование переменных:
```
- Имена переменных и функций написаны в стиле camelCase;

- Имена переменных — существительные, отражающие то, что в них хранится;

- D проекте есть несколько переменных с похожими данными, по их наименованиям понятно, что хранится в каждой переменной;

- Имена классов и типов данных написаны в стиле PascalCase;

- Имена массивов — существительные во множественном числе;

- Имена функций начинаются с глагола, отражающего то, что они делают;

- Для именования не используется транслит и неуместные сокращения.
```

## Описание базовых классов

events.ts:
```
"EventEmitter" - обеспечивает работу событий. Его функции: возможность установить и снять слушателей событий, вызвать слушателей при возникновении события
```

api.ts:
```
"API" - предоставляет методы для отправки GET и POST запросов на сервер. Имеет конструктор, который принимает "baseUrl" и настройки для запроса. Содержит метод "handleResponse" для обработки ответа от сервера - в случае успешного ответа возвращает данные в формате JSON, если данные не получены, возвращает ошибку.

Метод "GET" отправляет "GET" запрос на сервер с указанным "URI" и возвращает данные в виде "Promise".

Метод "POST" отправляет "POST" запрос на сервер с указанным "URI", данными в формате JSON и опционально указанным методом (POST, PUT, DELETE).

В коде определены типы "ApiListResponse" и "ApiPostMethods", которые объявляют структуру ответа от сервера и доступные методы для отправки запросов (POST, PUT, DELETE).
```

utils.ts:
```
"pascalToKebab" - Преобразует строку из pascalCase в kebab-case.

"isSelector" - Проверяет, является ли переданное значение строкой и имеет длину больше 1.

"isEmpty" - Проверяет, является ли значение пустым (null или undefined).

"ensureAllElements" - Возвращает массив всех элементов, соответствующих переданному селектору.

"ensureElement" - Возвращает один элемент, соответствующий переданному селектору.

"cloneTemplate" - Клонирует содержимое HTML шаблона и возвращает его как элемент.

"bem" - Генерирует имена и классы для использования в методологии BEM.

"getObjectProperties" - Возвращает имена свойств объекта, фильтруя их по заданной функции.

"setElementData" - Устанавливает dataset атрибуты для элемента.

"getElementData" - Получает типизированные данные из dataset атрибутов элемента.

"isPlainObject" - Проверяет, является ли объект простым объектом.

"isBoolean" - Проверяет, является ли значение boolean.

"createElement" - функция для создания DOM элементов с заданными атрибутами и дочерними элементами.
```

constants.ts:
```
Определены константы "API_URL" и "CDN_URL", которые содержат URL-адреса для доступа к API и содержимому веб-сервиса "weblarek". Они используют process.env.API_ORIGIN для получения базового URL-адреса API.

Присутствует объект "settings", который на данный момент содержит пустой объект {}. В дальнейшем этот объект может быть использован для хранения и передачи различных настроек и параметров в приложении.
```

index.ts:
```
Этот код представляет шаблон для создания компонентов отображения товаров в корзине с возможностью добавления, удаления и отображения списка товаров в корзине.

IBasketModel - интерфейс корзины, который содержит методы для добавления и удаления товаров.

IProduct - интерфейс для описания товара, включающий id и название.

CatalogModel - интерфейс для хранения списка товаров, включая методы для установки списка товаров и получения конкретного товара по id.

IViewConstructor - интерфейс конструктора компонентов отображения, который содержит метод для создания нового экземпляра класса отображения.

IView - интерфейс отображения, который содержит метод для отрисовки данных.

BasketModel - класс корзины, который реализует интерфейс IBasketModel и содержит методы для добавления и удаления товаров, а также метод для генерации события об изменениях.

BasketItemView - класс отображения товара в корзине, который реализует интерфейс IView и содержит элементы товара (название, кнопки добавления и удаления) и метод для отрисовки данных.

BasketView - класс отображения списка товаров в корзине, который реализует интерфейс IView и содержит метод для отрисовки списка элементов.
```