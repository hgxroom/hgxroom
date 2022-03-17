<template>
  <div class="login__form">
    <div class="login__form__title">生产进度追溯系统</div>
    <div class="login__form__content">
      <t-form ref="form" :data="formData" :colon="true" :label-width="0" @reset="onReset" @submit="onSubmit">
        <div class="login__form__text">用户名：</div>
        <t-form-item name="account">
          <t-input v-model="formData.account" clearable placeholder="请输入用户名">
            <template #prefix-icon>
              <desktop-icon />
            </template>
          </t-input>
        </t-form-item>
        <div class="login__form__text">密码：</div>
        <t-form-item name="password">
          <t-input v-model="formData.password" type="password" clearable placeholder="请输入密码">
            <template #prefix-icon>
              <lock-on-icon />
            </template>
          </t-input>
        </t-form-item>
        <t-form-item style="padding-top: 8px">
          <t-button theme="primary" type="submit" block>登录</t-button>
        </t-form-item>
      </t-form>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import { DesktopIcon, LockOnIcon } from 'tdesign-icons-vue-next';

const INITIAL_DATA = {
  account: '',
  password: '',
};

export default defineComponent({
  components: {
    DesktopIcon,
    LockOnIcon,
  },
  setup() {
    const formData = ref({ ...INITIAL_DATA });

    const onReset = () => {
      MessagePlugin.success('重置成功');
    };

    const onSubmit = ({ validateResult, firstError }) => {
      if (validateResult === true) {
        MessagePlugin.success('提交成功');
      } else {
        console.log('Validate Errors: ', firstError, validateResult);
        MessagePlugin.warning(firstError);
      }
    };

    return {
      formData,
      onReset,
      onSubmit,
    };
  },
});
</script>
<style lang="less">
.login__form{
  background: white;
  width: 400px;
  margin: 0 auto;
  border-radius: 16px;
  &__title {
    font-size: 28px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.9);
    line-height: 40px;
    text-align: center;
    padding: 40px 0px;
  }
  &__content {
    margin: 0px 40px;
    padding-bottom: 40px;
  }
  &__text{
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.6);
    line-height: 40px;
  }
}
</style>
