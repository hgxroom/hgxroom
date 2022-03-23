<template>
  <div class="login__form">
    <div class="login__form__title">生产进度追溯系统</div>
    <div class="login__form__content">
      <t-form ref="form" :data="formData" :colon="true" :label-width="0" @reset="onReset" @submit="onSubmit">
        <div class="login__form__text">用户名：</div>
        <t-form-item name="username">
          <t-input v-model="formData.username" clearable placeholder="请输入用户名">
            <template #prefix-icon>
              <desktop-icon />
            </template>
          </t-input>
        </t-form-item>
        <t-form-item label="密码" name="password">
          <t-input v-model="formData.password" type="password" clearable placeholder="请输入密码">
            <template #prefix-icon>
              <lock-on-icon />
            </template>
          </t-input>
        </t-form-item>
        <t-form-item>
          <t-button class="login-btn" theme="primary" type="submit" block>登录</t-button>
        </t-form-item>
      </t-form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import { DesktopIcon, LockOnIcon } from 'tdesign-icons-vue-next';
import { login } from '@/api/login';
import { setToken } from '@/utils/auth';
import router from '@/router';

const INITIAL_DATA = {
  username: '',
  password: '',
};
const formData = ref({ ...INITIAL_DATA });
const onReset = () => {
  MessagePlugin.success('重置成功');
};
const onSubmit = () => {
  login(formData.value).then((res) => {
    setToken(res.data.data, 'unicomToken');
    MessagePlugin.success('登录成功');
    router.push({ path: '/data' });
  });
};
</script>
<style lang="less">
.login__form {
  background: #fff;
  width: 400px;
  border-radius: 16px;
  padding: 40px;
  &__title {
    font-size: 28px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.9);
    line-height: 40px;
    text-align: center;
  }
  &__content {
    margin: 0px 40px;
    padding-bottom: 40px;
  }
  &__text {
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.6);
    line-height: 40px;
  }
}
.login-btn {
  border-radius: 4px;
  height: 40px;
}
</style>
