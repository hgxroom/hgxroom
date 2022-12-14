<template>
  <div class="app-container">
    <!-- 缸号列表 -->
    <div class="progress-list">
      <div class="progress-list__title">缸号</div>
      <div class="progress-list__content">
        <div
          v-for="(item, index) in orderList"
          :key="item.id"
          class="list-item"
          :class="{ active: item.active }"
          @click="clickOrderNum(index)"
        >
          {{ item.vatCode }}
        </div>
      </div>
      <t-pagination
        class="pagination-left"
        size="small"
        theme="simple"
        :show-page-size="false"
        :current="pagination.current"
        :page-size="pagination.pageSize"
        :total="pagination.total"
        @current-change="onCurrentChange"
      >
      </t-pagination>
    </div>
    <!-- 缸号详情 -->
    <div class="progress-info">
      <TitleHeader title="总进度">
        <t-progress theme="line" :percentage="allRate" />
      </TitleHeader>
      <div class="progress-info__step">
        <div
          class="single-step"
          :class="item.active ? 'single-step--active' : ''"
          v-for="(item, index) in setpList"
          :key="item.seq"
          @click="clickProcess(item.procedureId, index)"
        >
          <t-progress theme="circle" :percentage="item.rate" />
          <div class="">{{ item.procedureName }}</div>
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
              <t-steps layout="vertical" :current="procedureActive" readonly>
                <t-step-item v-for="item in procedureList" :key="item.uniId" :title="item.sequenceNumber" />
              </t-steps>
              <t-steps class="no-line" layout="vertical" theme="dot" :current="procedureActive" readonly>
                <t-step-item v-for="item in procedureList" :key="item.uniId" :title="item.createTime" />
              </t-steps>
            </div>
          </div>
          <!-- <t-loading class="detail-image-loading" size="medium" :loading="true">

          </t-loading> -->
          <div class="detail-image" :class="processBg"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import _ from 'lodash';
import { getAllVatCode, getBoardListInfo } from '@/api/production/progress-board';
import { getInfoProcess } from '@/api/production/dyeing-order';

import TitleHeader from '../components/TitleHeader.vue';

const pagination = ref({
  pageSize: 30,
  total: 0,
  current: 1,
});

const orderList = ref([]);
// 工序环形图
const setpList = ref([]);
const allRate = ref(0);

const procedureList = ref([]);
const procedureActive = ref(0); // 下标0开始
const activeProcess = ref('');

/** 获取左侧缸号列表 */
function getVatList(data) {
  getAllVatCode(data).then((res) => {
    const { data } = res;
    if (data.total === 0) {
      return;
    }
    data.records.forEach((item) => {
      item.active = false;
    });
    data.records[0].active = true;
    orderList.value = data.records;
    pagination.value = {
      ...pagination.value,
      total: data.total,
      current: data.current,
    };
    getProcessList(data.records[0].id);
  });
}

function onCurrentChange(index, pageInfo) {
  const data = { page: index, size: pageInfo.pageSize };
  getVatList(data);
}

/** 获取工序的具体详情 */
function getProcessInfo(pId) {
  const activeId = orderList.value.find((item) => item.active).id;
  const data = {
    orderId: activeId,
    procedureId: pId,
  };
  procedureList.value = [];
  procedureActive.value = 0;
  getBoardListInfo(data).then((res) => {
    res.data.forEach((item, index) => {
      if (item && item.flag === 1) {
        procedureActive.value = index;
      }
      item.uniId = _.uniqueId();
    });
    procedureList.value = res.data;
  });
}

/** 点击某个工序 */
function clickProcess(id, index) {
  if (setpList.value[index].active) {
    return;
  }

  setpList.value.forEach((item) => {
    item.active = false;
  });
  setpList.value[index].active = true;
  activeProcess.value = setpList.value[index].station;
  getProcessInfo(id);
}

/** 获取右侧顶部总进度和工序进度 */
function getProcessList(id) {
  getInfoProcess(id)
    .then((res) => {
      if (res.data.length === 0) {
        return;
      }

      res.data.details.forEach((item) => {
        item.rate *= 100;
        item.rate = parseInt(item.rate, 10);
      });
      res.data.rate *= 100;
      res.data.rate = parseInt(res.data.rate, 10);

      setpList.value = res.data.details;
      allRate.value = res.data.rate;
    })
    .then(() => {
      clickProcess(setpList.value[0].procedureId, 0);
    });
}

function clickOrderNum(index: number) {
  if (orderList.value[index].active) {
    return;
  }
  orderList.value.forEach((item) => {
    item.active = false;
  });
  const currentItem = orderList.value[index];
  currentItem.active = true;
  getProcessList(currentItem.id);
}

const processBg = computed(() => {
  const actText = activeProcess.value;
  let resultClass = '';
  if (actText.indexOf('毛胚') > -1) {
    resultClass = 'hair_embryo';
  } else if (actText.indexOf('染色') > -1) {
    resultClass = 'dyeing';
  } else if (actText.indexOf('整理') > -1) {
    resultClass = 'tidy';
  } else if (actText.indexOf('物测') > -1) {
    resultClass = 'physical_test';
  } else if (actText.indexOf('品检') > -1) {
    resultClass = 'inspection';
  } else if (actText.indexOf('入库') > -1) {
    resultClass = 'warehousing';
  }
  return resultClass;
});

onMounted(() => {
  getVatList({ page: pagination.value.current, size: pagination.value.pageSize });
});
</script>
<style lang="less" scoped>
.app-container {
  display: flex;
  // 顶部栏64,margin24+24
  height: calc(100vh - 64px - 48px);
  overflow: hidden;
}
.pagination-left {
  margin-left: 5px;
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
    height: calc(100% - 85px);
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
    overflow-y: hidden;
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
    width: 160px;
    height: 180px;
    transition: all 0.2s;
    &--active {
      transform: scale(1.2);
    }
  }
  &__list {
    padding: 15px 10px;
  }
}
.specific-process {
  display: flex;
  .detail-list {
    // width: 400px;
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
        margin-left: 72px;
        margin-right: 172px;
      }
    }
    &__content {
      display: flex;
      height: 400px;
      overflow-y: auto;
      overflow-x: hidden;
      :deep(.t-steps) {
        width: 230px;
        font-size: 14px;
        flex: 0 0 230px;
      }

      :deep(.t-steps-item__content) {
        padding-left: 40px;
      }
    }
  }
  .detail-image-loading {
    width: 100%;
    height: 500px;
  }
  .detail-image {
    width: 100%;
    height: 500px;
    background: url('@/assets/images/process-dyeing.png') center no-repeat;
    background-size: auto 100%;
    &.hair_embryo {
      background: url('@/assets/images/process-hair-embryo.png') center no-repeat;
      background-size: auto 100%;
    }
    &.dyeing {
      background: url('@/assets/images/process-dyeing.png') center no-repeat;
      background-size: auto 100%;
    }
    &.tidy {
      background: url('@/assets/images/process-tidy.png') center no-repeat;
      background-size: auto 100%;
    }
    &.physical_test {
      background: url('@/assets/images/process-physical-test.png') center no-repeat;
      background-size: auto 100%;
    }
    &.inspection {
      background: url('@/assets/images/process-quality-inspection.png') center no-repeat;
      background-size: auto 100%;
    }
    &.warehousing {
      background: url('@/assets/images/process-warehousing.png') center no-repeat;
      background-size: auto 100%;
    }
  }
}

// 步骤条特殊处理
.t-steps-item {
  height: 50px;
  flex: 0 0 50px;
  margin-bottom: 5px !important;
}
.t-steps--dot-anchor {
  :deep(.t-steps-item__title) {
    margin-top: 4px;
  }
}

.no-line {
  :deep(.t-steps-item__icon) {
    border-color: transparent !important;
    background-color: transparent !important;
  }
  .t-steps-item:not(:last-child)::before {
    border-color: transparent !important;
    background: transparent !important;
  }
  :deep(.t-steps-item__title) {
    font-size: 14px;
  }
  :deep(.t-steps-item__content) {
    padding-left: 16px !important;
  }
}
</style>
