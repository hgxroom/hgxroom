<template>
  <div class="login-wrapper">
    <div class="login__content">
      <div class="login__icon">
        <img src="./logo.png" />
      </div>
      <login />
    </div>
  </div>
</template>
<script setup lang="ts">
import Login from './components/Login.vue';
</script>
<style lang="less">
.login-wrapper {
  height: 100vh;
  background-size: cover;
  background-position: 100%;
  background: url("./login__background.png");
  display: flex;
  justify-content: center;
  align-items: center;
}

.login__icon {
  width: 218px;
  height: 64px;
  margin: 0px auto;
  img {
    width: 100%;
  }
}
</style>
