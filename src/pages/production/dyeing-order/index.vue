<template>
  <div class="dyeing-order">
    <div class="dyeing-order-top">
      <div class="dyeing-order-top__title">订单列表</div>
      <div class="dyeing-order-top__btn-group">
        <t-button variant="outline" theme="default">设置字段</t-button>
        <t-button theme="primary">备胚</t-button>
        <t-button theme="primary">入库</t-button>
      </div>
    </div>
    <div class="dyeing-order-content">
      <div class="dyeing-order-content__list">
        <div class="dyeing-order-content__list-filter"></div>
        <div class="dyeing-order-content__list-content"></div>
      </div>
      <div class="dyeing-order-content__detail">
        <div class="detail-form"></div>
        <div class="detail-schedule"></div>
        <div class="detail-schedule-list"></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup></script>
<style lang="less" scoped>
.dyeing-order {
  background-color: #fff;
  padding: 10px 20px;
  &-top {
    height: 41px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &__title {
      font-size: 18px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.9);
      line-height: 25px;
    }
    &__btn-group {
      & > .t-button {
        margin-left: 16px;
      }
    }
  }
}
</style>
