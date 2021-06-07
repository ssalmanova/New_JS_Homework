<template>
    <div v-show="isVisibleCart" class="cart">
        Корзина:
        <div class="cart-list"></div>
      </div>
</template>

<script>
export default {
  props: {
    isVisibleCart: {
      type: Boolean,
      default: false,
    }
  }
}
</script>


<style scoped>
.cart-button {
  font-size: 16px;
  padding: 10px 20px;
  border: unset;
  border-radius: 10px;
  background-color: white;
  transition: .3s;
  box-shadow: 0px 0px 8px 2px rgba(34, 60, 80, 0.2);
  cursor: pointer;
}

.cart-button:hover {
  color: white;
  background-color: black;
}

.cart-list {
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  justify-content: space-around;
}

.cart {
  box-shadow: 0px 0px 8px 2px rgba(34, 60, 80, 0.2);
  padding: 20px;
  width: 800px;
  height: 500px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  overflow: auto;
}
</style>