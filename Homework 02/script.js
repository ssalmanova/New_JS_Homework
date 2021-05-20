/*const goods = [{
        title: 'Shirt',
        price: 150
    },
    {
        title: 'Socks',
        price: 50
    },
    {
        title: 'Jacket',
        price: 350
    },
    {
        title: 'Shoes',
        price: 250
    },
];*/

/*const renderGoodsItem = (title = 'Nothing', price = '-') => {
    return `<div class="goods-item"><h3>${title}</h3><p>${price}</p></div>`;
};*/

/*const renderGoodsList = (list = []) => {
    let goodsList = list.map(item => renderGoodsItem(item.title, item.price));
    document.querySelector('.goods-list').innerHTML = goodsList;
}*/
/*renderGoodsList(goods);*/

class GoodsItem {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    };
    render() {
        return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price}</p></div>`;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
    }

    fetchGoods() {
        this.goods = [{
                title: 'Shirt',
                price: 150
            },
            {
                title: 'Socks',
                price: 50
            },
            {
                title: 'Jacket',
                price: 350
            },
            {
                title: 'Shoes',
                price: 250
            },
        ];
    }
    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.title, good.price);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;

        listHtml = 'Общая стоимость: ' + this.totalCostSummator();

        document.querySelector('.total-cost').innerHTML = listHtml;

        
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

class Cart {
    // Метод очистки корзины
    // Метод подсчёта общей стоимости корзины
    // Метод подсчёта кол-ва позиций
    // Метод изменения кол-ва товара в корзине
    // Удалить конкретный товар
}

/* Не уверена, что поняла, что требовалось.

Поэтому исходила из предположения, что элемент корзины товаров это товар, который юзер положил в корзину, с указанием количества и стоимости.*/

//Элемент корзины товаров:

class CartElement {
    // Изменение кол-ва товара в позиции
    // Удалить позицию
    // Подсчитать стоимость по позиции (кол-во * цену)
}

const list = new GoodsList();
list.fetchGoods();
list.render();

