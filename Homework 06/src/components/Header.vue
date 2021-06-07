<template>
    <header>
      <input v-model="searhLine" type="text" class="goods-search" />
      <button class="search-button" type="button" @click="searchButtonClick">Искать</button>
      <button class="cart-button" type="button" @click="$emit('toggle-cart')">Корзина</button>
    </header>
</template>

<script>
export default {
  data: () => ({
    searhLine: '',
  }),

  methods: {
    searchButtonClick() {
      this.$emit('callToFilter', this.searhLine);
    }
  },

  watch: {
    searhLine() {
      this.searchButtonClick();
    }
  }
}
</script>

<style >

header {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  box-shadow: 0px 5px 8px 0px rgba(34, 60, 80, 0.2);
}

.goods-search,
.search-button {
  height: 100%;
}

</style>