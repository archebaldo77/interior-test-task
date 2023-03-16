// eslint-disable-next-line no-unused-vars
import style from "./scss/style.scss";

import { items } from "./mocks/items";

let mocks = [...items];

class InteriorItem {
  constructor(item, type) {
    this._element = null;

    this._id = item.id;
    this._title = item.title;
    this._price = item.price;
    this._description = item.description;
    this._min = item.min;
    this._max = item.max;
    this._image = item.image;
    this._inCart = item.inCart;
    this._currentCount = item.currentCount;
    this._type = type;

    this.getElement()
      .querySelector(`.interior-item__button--cart`)
      .addEventListener(`click`, this._onCartClickHandler);

    this.getElement()
      .querySelector(`.interior-item__counter`)
      .addEventListener(`change`, this._onCartChangeItems);

    this.getElement()
      .querySelector(`.interior-item__button--delete`)
      .addEventListener(`click`, this._onCartDeleteItem);
  }

  _onCartClickHandler = () => {
    const index = mocks.findIndex(({ id }) => this._id === id);

    if (index > -1) {
      mocks = [
        ...mocks.slice(0, index),
        {
          id: this._id,
          title: this._title,
          price: this._price,
          description: this._description,
          min: this._min,
          max: this._max,
          image: this._image,
          inCart: !this._inCart,
          type: this._type,
          currentCount: !this._inCart ? 1 : 0,
        },
        ...mocks.slice(index + 1),
      ];
    }

    return mocks;
  };

  _onCartChangeItems = (evt) => {
    let value =
      evt.target.value < this._min
        ? 1
        : evt.target.value > this._max
        ? this._max
        : evt.target.value;
    this.getElement().querySelector(`.interior-item__counter`).value =
      evt.target.value;

    const index = mocks.findIndex(({ id }) => this._id === id);

    if (index > -1) {
      mocks = [
        ...mocks.slice(0, index),
        {
          id: this._id,
          title: this._title,
          price: this._price,
          description: this._description,
          min: this._min,
          max: this._max,
          image: this._image,
          inCart: this._inCart,
          type: this._type,
          currentCount: value,
        },
        ...mocks.slice(index + 1),
      ];
    }

    renderCart();
  };

  _onCartDeleteItem = () => {
    const index = mocks.findIndex(({ id }) => this._id === id);

    if (index > -1) {
      mocks = [
        ...mocks.slice(0, index),
        {
          id: this._id,
          title: this._title,
          price: this._price,
          description: this._description,
          min: this._min,
          max: this._max,
          image: this._image,
          inCart: false,
          type: this._type,
          currentCount: 0,
        },
        ...mocks.slice(index + 1),
      ];
    }

    renderCart();
  };

  getElement() {
    if (!this._element) {
      const div = document.createElement(`div`);
      div.innerHTML = this.getTemplate();

      this._element = div.firstElementChild;

      return this._element;
    }

    return this._element;
  }

  getTemplate() {
    return `
    <article class="interior-item ${
      this._type === `cart` ? `interior-item--cart` : ``
    }">
      <div class="interior-item__menu">
        <button class="interior-item__button interior-item__button--cart">
          <svg
            width="20"
            height="22"
            viewBox="0 0 20 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.00001 7V5C5.00001 3.67392 5.06232 1.93768 6.00001 1C6.93769 0.0623181 8.67392 0 10 0C11.3261 0 13.0623 0.0623181 14 1C14.9377 1.93768 15 3.67392 15 5V7H18C18.2652 7 18.8125 6.81246 19 7C19.1875 7.18754 19 7.73478 19 8V20C19 20.2652 19.1875 20.8125 19 21C18.8125 21.1875 18.2652 21 18 21H2.00001C1.73479 21 1.18754 21.1875 1.00001 21C0.81247 20.8125 1.00001 20.2652 1.00001 20V8C1.00001 7.73478 0.81247 7.18754 1.00001 7C1.18754 6.81246 1.73479 7 2.00001 7H5.00001ZM5.00001 9H3.00001V19H17V9H15V11H13V9H7.00001V11H5.00001V9ZM7.00001 7H13V5C13 4.20435 12.5626 3.56261 12 3C11.4374 2.43739 10.7957 2 10 2C9.20436 2 8.56262 2.43739 8.00001 3C7.4374 3.56261 7.00001 4.20435 7.00001 5V7Z"
              fill="#C4C4C4"
            />
          </svg>
        </button>
        <button
          class="interior-item__button interior-item__button--heart"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.99999 19C9.35499 18.428 8.62599 17.833 7.85499 17.2H7.84499C5.12999 14.98 2.05299 12.468 0.693992 9.458C0.24751 8.49972 0.0108963 7.45712 -1.91116e-05 6.4C-0.00300091 4.94948 0.578763 3.55898 1.6138 2.54276C2.64884 1.52654 4.04978 0.97039 5.49999 0.999995C6.68062 1.00186 7.83583 1.34308 8.82799 1.983C9.26396 2.26596 9.65841 2.60825 9.99999 3C10.3435 2.60979 10.738 2.2677 11.173 1.983C12.1647 1.34295 13.3197 1.00171 14.5 0.999995C15.9502 0.97039 17.3511 1.52654 18.3862 2.54276C19.4212 3.55898 20.003 4.94948 20 6.4C19.9898 7.45881 19.7532 8.50319 19.306 9.463C17.947 12.473 14.871 14.984 12.156 17.2L12.146 17.208C11.374 17.837 10.646 18.432 10.001 19.008L9.99999 19ZM5.49999 3C4.5685 2.98834 3.67006 3.34484 2.99999 3.992C2.35438 4.62616 1.99355 5.49504 1.99991 6.4C2.01132 7.1705 2.18582 7.92985 2.51199 8.628C3.1535 9.9267 4.0191 11.102 5.06899 12.1C6.05999 13.1 7.19999 14.068 8.18599 14.882C8.45899 15.107 8.73699 15.334 9.01499 15.561L9.18999 15.704C9.45699 15.922 9.73299 16.148 9.99999 16.37L10.013 16.358L10.019 16.353H10.025L10.034 16.346H10.039H10.044L10.062 16.331L10.103 16.298L10.11 16.292L10.121 16.284H10.127L10.136 16.276L10.8 15.731L10.974 15.588C11.255 15.359 11.533 15.132 11.806 14.907C12.792 14.093 13.933 13.126 14.924 12.121C15.974 11.1236 16.8397 9.94851 17.481 8.65C17.8131 7.9458 17.9901 7.1785 18 6.4C18.0042 5.49783 17.6435 4.63229 17 4C16.3312 3.34992 15.4326 2.99048 14.5 3C13.3619 2.99032 12.2739 3.46736 11.51 4.311L9.99999 6.051L8.48999 4.311C7.72606 3.46736 6.63807 2.99032 5.49999 3Z"
              fill="#C4C4C4"
            />
          </svg>
        </button>
      </div>
      <div class="interior-item__image">
        <img src="./${this._image}" alt="${this._title}" />
      </div>
      <div class="interior-item__info">
        <h2 class="interior-item__title">${this._title}</h2>
        <p class="interior-item__description">
          ${this._description}
        </p>
        <p class="interior-item__price">${this._price} руб.</p>
        <div class="interior-item__actions">
          <button
            class="interior-item__button interior-item__button--favorite"
          >
            Избранное
          </button>
          <button
            class="interior-item__button interior-item__button--delete"
          >
            Удалить
          </button>
        </div>
      </div>
      <div class="interior-item__counter">
        <input type="number" name="number" min="${this._min}" max="${
      this._max
    }" step="1" value="${this._currentCount}" />
      </div>
    </article>`;
  }
}

class InteriorItems {
  getElement() {
    if (!this._element) {
      const div = document.createElement(`div`);
      div.innerHTML = this.getTemplate();

      this._element = div.firstElementChild;

      return this._element;
    }

    return this._element;
  }

  getTemplate() {
    return `<section class="interior-items"></section>`;
  }
}

class Sort {
  getElement() {
    if (!this._element) {
      const div = document.createElement(`div`);
      div.innerHTML = this.getTemplate();

      this._element = div.firstElementChild;

      return this._element;
    }

    return this._element;
  }

  getTemplate() {
    return `
    <section class="sort main__sort">
    <select class="sort__select">
      <option value="new" class="sort__option">
        Порядок: сперва новые
      </option>
      <option value="old" class="sort__option">
        Порядок: сперва старые
      </option>
      <option value="expensive" class="sort__option">
        Порядок: сперва дорогие
      </option>
      <option value="cheap" class="sort__option">
        Порядок: сперва дешевые
      </option>
    </select>
  </section>
    `;
  }
}

class CartItemsContainer {
  getElement() {
    if (!this._element) {
      const div = document.createElement(`div`);
      div.innerHTML = this.getTemplate();

      this._element = div.firstElementChild;

      return this._element;
    }

    return this._element;
  }

  getTemplate() {
    return `
    <section class="cart-items"></section>
    `;
  }
}

class CartItemsTitles {
  getElement() {
    if (!this._element) {
      const div = document.createElement(`div`);
      div.innerHTML = this.getTemplate();

      this._element = div.firstElementChild;

      return this._element;
    }

    return this._element;
  }

  getTemplate() {
    return `<div class="cart-items__titles">
    <p class="cart-items__text">Товар</p>
    <p class="cart-items__text">К-во</p>
  </div>`;
  }
}

class CartItemsList {
  getElement() {
    if (!this._element) {
      const div = document.createElement(`div`);
      div.innerHTML = this.getTemplate();

      this._element = div.firstElementChild;

      return this._element;
    }

    return this._element;
  }

  getTemplate() {
    return `<ul class="cart-items__list"></ul>`;
  }
}

class CartItem {
  getElement() {
    if (!this._element) {
      const div = document.createElement(`div`);
      div.innerHTML = this.getTemplate();

      this._element = div.firstElementChild;

      return this._element;
    }

    return this._element;
  }

  getTemplate() {
    return `<li class="cart-items__item"></li>`;
  }
}

class CartMenu {
  constructor() {
    this.getElement()
      .querySelector(`.cart-menu__button--clear`)
      .addEventListener(`click`, () => {
        mocks = mocks.map((data) =>
          Object.assign({}, { ...data }, { inCart: false, currentCount: 0 })
        );

        renderCart();
      });

    this.getElement()
      .querySelector(`.cart-menu__button--continue`)
      .addEventListener(`click`, renderCatalog);
  }

  getElement() {
    if (!this._element) {
      const div = document.createElement(`div`);
      div.innerHTML = this.getTemplate();

      this._element = div.firstElementChild;

      return this._element;
    }

    return this._element;
  }

  getTemplate() {
    return `
    <div class="cart-menu">
      <button class="cart-menu__button cart-menu__button--clear">
        Очистить корзину
      </button>
      <button class="cart-menu__button cart-menu__button--continue">
        Продолжить покупки
      </button>
    </div>`;
  }
}

class CartOrder {
  constructor(totalPrice) {
    this._totalPrice = totalPrice;
  }

  getElement() {
    if (!this._element) {
      const div = document.createElement(`div`);
      div.innerHTML = this.getTemplate();

      this._element = div.firstElementChild;

      return this._element;
    }

    return this._element;
  }

  getTemplate() {
    return `
      <section class="cart-order">
        <div class="container cart-order__container">
          <h2 class="cart-order__title">Оформление заказа</h2>
          <form class="cart-order-form">
            <input type="text" placeholder="Имя Фамилия" class="cart-order-form__input">
            <input type="tel" placeholder="+ 7 904 000 80 80" class="cart-order-form__input">
            <input type="text" placeholder="Адрес доставки" class="cart-order-form__input cart-order-form__input--address">
            <p class="cart-order__total">
              Итого:<span class="cart-order__sum">${this._totalPrice} руб.</span>
            </p>
            <button class="cart-order__buy">Оформить заказ</button>
          </form>
        </div>
      </section>`;
  }
}

function renderCatalog() {
  const container = document.querySelector(`.main .container`);
  container.classList.contains(`main__container--cart`) &&
    container.classList.remove(`main__container--cart`);

  container.innerHTML = ``;
  const iteriorItemsElements = mocks.map(
    (data) => new InteriorItem({ ...data }, `catalog`)
  );
  const sortElement = new Sort().getElement();
  const interiorItemsContainer = new InteriorItems().getElement();
  iteriorItemsElements.forEach((el) =>
    interiorItemsContainer.insertAdjacentElement(`beforeend`, el.getElement())
  );
  container.insertAdjacentElement(`beforeend`, sortElement);
  container.insertAdjacentElement(`beforeend`, interiorItemsContainer);
}

function renderCart() {
  const container = document.querySelector(`.main .container`);
  container.innerHTML = ``;
  const totalPrice = mocks
    .filter((data) => data.inCart)
    .reduce((acc, current) => (acc += current.price * current.currentCount), 0);
  container.classList.add(`main__container--cart`);
  const cartItemsContainer = new CartItemsContainer().getElement();
  container.insertAdjacentElement(`beforeend`, cartItemsContainer);
  cartItemsContainer.insertAdjacentElement(
    `beforeend`,
    new CartItemsTitles().getElement()
  );
  const cartItemsListContainer = new CartItemsList().getElement();
  cartItemsContainer.insertAdjacentElement(`beforeend`, cartItemsListContainer);
  const itemsInCart = mocks.filter(({ inCart }) => inCart);
  itemsInCart.forEach((data) => {
    const cartItemElement = new CartItem().getElement();
    const interItemElement = new InteriorItem({ ...data }, `cart`).getElement();

    cartItemElement.insertAdjacentElement(`beforeend`, interItemElement);
    cartItemsListContainer.insertAdjacentElement(`beforeend`, cartItemElement);
  });
  const cartMenuElement = new CartMenu().getElement();
  cartItemsContainer.insertAdjacentElement(`beforeend`, cartMenuElement);
  const cartOrderElement = new CartOrder(totalPrice).getElement();
  container.insertAdjacentElement(`beforeend`, cartOrderElement);
}

const catalogLink = document.querySelector(`.navigation__item--catalog`);
const cartLink = document.querySelector(`.navigation__item--cart`);
const titleLink = document.querySelector(`.header__title`);

catalogLink.addEventListener(`click`, renderCatalog);
cartLink.addEventListener(`click`, renderCart);
titleLink.addEventListener(`click`, renderCatalog);

renderCatalog();
