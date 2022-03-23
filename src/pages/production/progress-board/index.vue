<template>
  <div class="app-container">
    <!-- 缸号列表 -->
    <div class="progress-list">
      <div class="progress-list__title">缸号</div>
      <div class="progress-list__content">
        <div
          v-for="(item, index) in orderList"
          :key="item.number"
          class="list-item"
          :class="{ active: item.active }"
          @click="clickOrderNum(index)"
        >
          {{ item.number }}
        </div>
      </div>
    </div>
    <!-- 缸号详情 -->
    <div class="progress-info">
      <TitleHeader title="总进度">
        <t-progress theme="line" :percentage="30" />
      </TitleHeader>
      <div class="progress-info__step">
        <div class="single-step" v-for="item in setpList" :key="item.id">
          <t-progress theme="circle" :percentage="item.schedule" :size="item.active ? 'large' : 'medium'" />
          <div class="">{{ item.label }}</div>
        </div>
      </div>
      <div class="progress-info__list">
        <TitleHeader title="生产进度"> </TitleHeader>
        <div class="specific-process">
          <div class="detail-list">
            <div class="detail-list__title">
              <div>ID</div>
              <div>开始时间</div>
            </div>
            <div class="detail-list__content">
              <t-steps layout="vertical" theme="dot" :current="1" readonly>
                <t-step-item title="AE36473647" />
                <t-step-item title="AE36473647" />
                <t-step-item title="AE36473647" />
                <t-step-item title="AE36473647" />
              </t-steps>
              <t-steps class="no-line" layout="vertical" theme="dot" :current="1" readonly>
                <t-step-item title="2022-2-21 12:23" />
                <t-step-item title="2022-2-21 12:23" />
                <t-step-item title="2022-2-21 12:23" />
                <t-step-item title="2022-2-21 12:23" />
              </t-steps>
            </div>
          </div>
          <div class="detail-image"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import TitleHeader from '../components/TitleHeader.vue';

const orderList = ref([]);
orderList.value = [
  { number: 'H37483741', active: false },
  { number: 'H37483742', active: false },
  { number: 'H37483743', active: false },
  { number: 'H37483744', active: true },
  { number: 'H37483745', active: false },
  { number: 'H37483746', active: false },
  { number: 'H37483747', active: false },
  { number: 'H37483748', active: false },
  { number: 'H37483749', active: false },
  { number: 'H37483750', active: false },
  { number: 'H37483751', active: false },
  { number: 'H37483752', active: false },
  { number: 'H37483753', active: false },
  { number: 'H37483754', active: false },
  { number: 'H37483755', active: false },
  { number: 'H37483756', active: false },
  { number: 'H37483757', active: false },
  { number: 'H37483758', active: false },
  { number: 'H37483759', active: false },
  { number: 'H37483760', active: false },
  { number: 'H37483761', active: false },
  { number: 'H37483762', active: false },
];
function clickOrderNum(index: number) {
  orderList.value.forEach((item) => {
    item.active = false;
  });
  orderList.value[index].active = true;
}
// 步骤进度图
const setpList = ref([]);
setpList.value = [
  {
    id: 1,
    label: '备胚',
    schedule: 30,
  },
  {
    id: 2,
    label: '定胚',
    schedule: 40,
  },
  {
    id: 3,
    label: 'XX',
    schedule: 50,
    active: true,
  },
  {
    id: 4,
    label: 'YY',
    schedule: 60,
  },
  {
    id: 5,
    label: 'YY',
    schedule: 60,
  },
  {
    id: 6,
    label: 'YY',
    schedule: 60,
  },
  {
    id: 7,
    label: 'YY',
    schedule: 60,
  },
  {
    id: 8,
    label: 'YY',
    schedule: 60,
  },
  {
    id: 9,
    label: 'YY',
    schedule: 60,
  },
];
</script>
<style lang="less" scoped>
.app-container {
  background-color: #fff;
  display: flex;
}
.progress-list {
  width: 220px;
  flex-shrink: 0;
  &__title {
    padding: 15px 20px;
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.9);
    line-height: 25px;
  }
  &__content {
    height: 840px;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 12px;
      background: transparent;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 6px;
      border: 4px solid transparent;
      background-clip: content-box;
      background-color: transparent;
    }
    &:hover::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.25);
    }
  }
  .list-item {
    padding: 10px 15px;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.6);
    line-height: 20px;
    cursor: pointer;
    position: relative;
    transition: all 0.2s;
    &::after {
      content: '';
      display: block;
      width: 3px;
      height: 24px;
      background: transparent;
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      transition: all 0.2s;
    }
    &.active {
      color: #0052d9;
      background-color: #ecf2fe;
      &::after {
        background: #0052d9;
      }
    }
  }
}
.progress-info {
  width: 100%;
  overflow: hidden;
  &__step {
    display: flex;
    overflow-x: scroll;
    margin: 0 40px;
    &::-webkit-scrollbar {
      width: 12px;
      background: transparent;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 8px;
      border: 4px solid transparent;
      background-clip: content-box;
      background-color: rgba(0, 0, 0, 0.25);
    }
  }
  .single-step {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 10px 20px;
  }
  &__list {
    padding: 15px 10px;
  }
}
.specific-process {
  display: flex;
  .detail-list {
    width: 400px;
    flex-shrink: 0;
    &__title {
      display: flex;
      margin-bottom: 18px;
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #242424;
      line-height: 22px;
      & > div:first-child {
        margin-left: 56px;
        margin-right: 163px;
      }
    }
    &__content {
      display: flex;
      :deep(.t-steps-item__content) {
        padding-left: 40px;
      }
    }
  }
  .detail-image {
    width: 100%;
    height: 500px;
    background: url('@/assets/images/process-dyeing.png') center no-repeat;
    background-size: auto 100%;
  }
}

// 步骤条特殊处理
.no-line {
  :deep(.t-steps-item__icon) {
    border-color: transparent !important;
    background-color: transparent !important;
  }
  .t-steps-item:not(:last-child)::before {
    border-color: transparent !important;
    background: transparent !important;
  }
  :deep(.t-steps-item__content) {
    padding-left: 20px !important;
  }
}
</style>
