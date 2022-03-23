<template>
  <div class="login-wrapper">
    <div class="login__content">
      <div class="login__icon">
        <img src="@/assets/logo-text.png" />
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
  background: url('@/assets/bg/login__background.webp') no-repeat center/cover;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login__icon {
  width: 218px;
  height: 64px;
  margin: 0px auto 40px;
  img {
    width: 100%;
  }
}
</style>
