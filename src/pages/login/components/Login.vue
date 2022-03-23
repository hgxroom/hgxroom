<template>
  <div class="login__form">
    <div class="login__form__title">生产进度追溯系统</div>
    <div class="login__form__content">
      <t-form
        ref="form"
        :data="formData"
        :rules="FORM_RULES"
        :colon="true"
        label-align="top"
        @reset="onReset"
        @submit="onSubmit"
      >
        <t-form-item label="用户名" name="account">
          <t-input v-model="formData.account" clearable placeholder="请输入用户名">
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
<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { MessagePlugin } from 'tdesign-vue-next';
import { DesktopIcon, LockOnIcon } from 'tdesign-icons-vue-next';
import { useUserStore } from '@/store';

const userStore = useUserStore();

const INITIAL_DATA = {
  account: 'admin',
  password: 'admin',
};

const FORM_RULES = {
  account: [{ required: true, message: '账号必填', type: 'error' }],
  password: [{ required: true, message: '密码必填', type: 'error' }],
};
const formData = ref({ ...INITIAL_DATA });

const router = useRouter();

const onReset = () => {
  MessagePlugin.success('重置成功');
};

const onSubmit = ({ validateResult, firstError }) => {
  if (validateResult === true) {
    userStore.login(formData.value).then(() => {
      MessagePlugin.success('登录成功');
      router.push({
        path: '/dashboard/base',
      });
    });
  } else {
    console.log('Validate Errors: ', firstError, validateResult);
    MessagePlugin.warning(firstError);
  }
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
    margin: 50px 0 0;
  }
}
.login-btn {
  border-radius: 4px;
  height: 40px;
}
</style>
