<template>
  <div class="header-box">
    <div class="title">{{ title }}</div>
    <div class="content"><slot></slot></div>
  </div>
</template>
<script lang="ts" setup>
defineProps({
  title: { typle: String, default: '' },
});
</script>
<style lang="less" scoped>
.header-box {
  padding: 10px 20px;
  display: flex;
  align-items: center;
}
.title {
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.9);
  line-height: 28px;
  margin-right: 36px;
  flex-shrink: 0;
}
.content {
  width: 100%;
}
</style>
