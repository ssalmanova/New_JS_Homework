const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'

/*const makeGETRequest = (url, callback) => {
    let xhr;
  
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) { 
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
  
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        callback(xhr.responseText);
      }
    }
  
    xhr.open('GET', url, true);
    xhr.send();
}*/

const makeGETRequest = (url, callback) => {

    return new Promise((resolve, reject) => {
        let xhr;
  
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) { 
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
  
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        callback(xhr.responseText);
        resolve();
      }
      /*else {
          reject();
      }*/
    }
  
    xhr.open('GET', url, true);
    xhr.send();

})
}
   

class GoodsItem {

    constructor(product_name, price) {
        this.product_name = product_name;
        this.price = price;
    };

    render() {
        return `<div class="goods-item"><h3>${this.product_name}</h3><p>${this.price}</p><button class="button-add-to-cart" id="${this.product_name}">Добавить в корзину</button>
        </div>`;
    }
}


class CartItem extends GoodsItem {

    constructor(product_name, price, i) {
        super(product_name, price);
        this.cartGoodID = i;
    }
    
    render() {
        return `<div class="goods-item"><h3>${this.product_name}</h3><p>${this.price}</p><button class="button-delete-from-cart" id="${this.cartGoodID}">Удалить товар</button>
        </div>`;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
    }

    fetchGoods(cb) {
        makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
          this.goods = JSON.parse(goods);
          cb();
        })
    }

    render(callback) {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.product_name, good.price);
            good.quantityInCart = 0;

            listHtml += goodItem.render();
        });

        document.querySelector('.goods-list').innerHTML = listHtml;

        listHtml = 'Общая стоимость товаров, взятых по 1 штуке: ' + this.totalCostSummator();

        document.querySelector('.total-cost').innerHTML = listHtml;

        callback();
        
    }

    //для GoodsList метод, определяющий суммарную стоимость всех товаров

    totalCostSummator() {
        let totalCost = 0;
        this.goods.forEach(element => {
            totalCost += element.price;
        });
        return totalCost;
    }
}

//Корзина товаров:

class Cart extends GoodsList{

    constructor() {
        super();
        this.goodsInCart = [];
    }

    render() {
        let listHtml = '';
        this.goodsInCart.forEach(function(goodsInCart, i, ) {

            const goodItem = new CartItem(goodsInCart.product_name, goodsInCart.price, i);
            listHtml += goodItem.render();
        });
        document.querySelector('.cart').innerHTML = listHtml;

        this.removeFromCartMethodRender();

        listHtml = 'Общая стоимость товаров в корзине: ' + this.totalCostSummator();

        /*if (this.totalCostSummator() > 0) {
            listHtml += `<p><button class=".button-delete-from-cart">Очистить корзину</button></p>`;
        }*/

        document.querySelector('.total-cost-cart').innerHTML = listHtml;
        //this.clearCartMethod();
    }

    // Навесить обработчик нажатий на гудслист

    addToCartMethodRender() {
        let elements = document.querySelectorAll('.button-add-to-cart');
        for (let elem of elements) {
            elem.addEventListener('click', () => this.addToCart(elem));
          }
    }

    // Добавить товар в корзину

    addToCart(itemToCart) {
        this.goods.forEach(good => {
            if (good.product_name == itemToCart.id) {
                this.goodsInCart.push(good);
            }
        });

        this.render();
    }

    // Обработчик нажатия кнопки очистки

    /*clearCartMethod() {
        let element = document.querySelector('.button-delete-from-cart');
        element.addEventListener('click', () => this.clearCart());
    }

    // Метод очистки корзины

    clearCart() {
        this.goodsInCart = [];
        this.render();
    }*/

    // Метод подсчёта общей стоимости корзины
    totalCostSummator() {
        let totalCost = 0;
        this.goodsInCart.forEach(element => {
            totalCost+=element.price;
        });
        return(totalCost);
    }
    // Метод подсчёта кол-ва позиций — я зашьюсь щас прописывать, мб потом
    // Метод изменения кол-ва товара в корзине — я зашьюсь щас прописывать, мб потом
    // Удалить конкретный товар
    removeFromCart(itemDelFromCart) {
        this.goodsInCart[itemDelFromCart.id];
        this.goodsInCart.splice(itemDelFromCart.id, 1);
        
        this.render();
    }
    // Навесить обработчик на кнопку удаления
    removeFromCartMethodRender() {
        let elements = document.querySelectorAll('.button-delete-from-cart');
        for (let elem of elements) {
            elem.addEventListener('click', () => this.removeFromCart(elem));
          }
    }
}


const list = new GoodsList();
const cartList = new Cart();

list.fetchGoods(() => {
    list.render( () => {
        cartList.fetchGoods(() => {
            cartList.addToCartMethodRender();
        });
    });
});

