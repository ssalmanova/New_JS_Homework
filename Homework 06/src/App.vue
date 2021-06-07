<template>
  <div id="app">
    <Header @callToFilter="filterGoods" @toggle-cart="toggleCartStatus"/>
    <main>
      <GoodsList :goods="filteredGoods" />
      <br />
      <Cart :isVisibleCart="isVisibleCart" />
    </main>
  </div>
</template>

<script>
// 1. Вынести весь хэдер в компонент
// 2. Вынести корзину в компонент
import GoodsList from './components/GoodsList';
import Header from './components/Header';
import Cart from './components/Cart.vue';

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'

export default {
  components: {
    GoodsList,
    Header,
    Cart,
  },
  data: () => ({
    goods: [],
    filteredGoods: [],
    isVisibleCart: false,
  }),
  mounted() {
    this.makeGETRequest(`${API_URL}/catalogData.json`)
  },
  methods: {
    makeGETRequest(url) {
      fetch(url)
        .then((data) => data.json())
        .then((data) => {
          this.goods = data;
          this.filteredGoods = data;
        }) 
    },
    filterGoods(searhLine) {
      const regexp = new RegExp(searhLine, 'i');
      this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name));
    },
    toggleCartStatus() {
      this.isVisibleCart = !this.isVisibleCart;
    }
  },
}
</script>

<style>
*{
  outline: unset;
}

body {
  margin: unset;
}

main {
  padding: 20px 5%;
}

.goods-item-image-container {
  width: 100%;
  height: 200px;
}
</style>
