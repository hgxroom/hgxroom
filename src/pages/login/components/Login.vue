<template>
  <div class="login__form">
    <div class="login__form__title">生产进度追溯系统</div>
    <div class="login__form__content">
      <t-form ref="form" :data="formData" :rules="FORM_RULES" :colon="true" label-align="top" @submit="onSubmit">
        <t-form-item label="用户名" name="username">
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
import { useRouter } from 'vue-router';
import { DesktopIcon, LockOnIcon } from 'tdesign-icons-vue-next';
import { showMessage } from '@/utils/notice';
import { useUserStore } from '@/store';

const userStore = useUserStore();

const INITIAL_DATA = {
  username: '',
  password: '',
};

const FORM_RULES = {
  username: [{ required: true, message: '用户名必填', type: 'error' }],
  password: [{ required: true, message: '密码必填', type: 'error' }],
};

const formData = ref({ ...INITIAL_DATA });

const router = useRouter();

const onSubmit = async ({ validateResult }) => {
  if (validateResult !== true) {
    return;
  }
  try {
    await userStore.login(formData.value);
    showMessage('登录成功', 'success');
    router.push({ path: '/data' });
  } catch (error) {
    console.log(error, 'login_page');
  }
};
</script>
<style lang="less" scoped>
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
    margin: 50px 0 0;
  }
}
.login-btn {
  border-radius: 4px;
  height: 40px;
}
</style>
