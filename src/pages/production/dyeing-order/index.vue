<template>
  <div class="dyeing-order">
    <div class="dyeing-order-top">
      <div class="dyeing-order-top__title">订单列表</div>
      <div class="dyeing-order-top__btn-group">
        <!-- TODO:设置字段待做  @lanka-->
        <!-- <t-button variant="outline" theme="default" @click="visibleColumnSetModal = true">设置字段</t-button> -->
        <template v-if="roleId === 1">
          <t-button theme="primary" @click="clickBpBtn">备胚</t-button>
          <t-button theme="primary" v-if="baseInfo.status === 2" @click="clickUpdateState(3)">入库</t-button>
          <t-button theme="primary" v-if="baseInfo.status === 3" @click="clickUpdateState(2)">反入库</t-button>
        </template>
      </div>
    </div>
    <div class="dyeing-order-content">
      <div class="dyeing-order-content__list">
        <div class="dyeing-order-content__list-filter">
          <t-select v-model="searchListState" :options="listStateOptions" @change="listStateChange" autoWidth />
          <t-select v-model="searchType" :options="searchTypeOptions" autoWidth></t-select>
          <div class="search-btn-group">
            <t-input v-model="searchContent" placeholder="请输入查询内容" />
            <t-button shape="square" variant="outline" @click="getDyeingOrderList">
              <template #icon>
                <t-icon name="search"></t-icon>
              </template>
            </t-button>
          </div>
        </div>
        <div class="dyeing-order-content__list-content">
          <t-table
            row-key="id"
            :data="dyeingOrderList"
            :columns="listColumns"
            :pagination="dyeingPagination"
            :hover="true"
            :rowClassName="rowClassName"
            :onRowClick="onClickRowDyeingList"
            @change="onChangeDyeingPagination"
          ></t-table>
        </div>
      </div>

      <div class="dyeing-order-content__detail">
        <title-header title="基本信息" />
        <div class="detail-form">
          <t-form layout="inline" labelWidth="64px" :data="baseInfo">
            <t-form-item label="缸号">
              <t-input readonly v-model="baseInfo.vatCode" placeholder="未获取到此信息"></t-input>
            </t-form-item>
            <t-form-item label="客户">
              <t-input readonly v-model="baseInfo.customer" placeholder="未获取到此信息"></t-input>
            </t-form-item>
            <t-form-item label="排缸日期">
              <t-input readonly v-model="baseInfo.composeTime" placeholder="未获取到此信息"></t-input>
            </t-form-item>
            <t-form-item label="布号">
              <t-input readonly v-model="baseInfo.clothNo" placeholder="未获取到此信息"></t-input>
            </t-form-item>
            <t-form-item label="生产车间">
              <t-input readonly v-model="baseInfo.productionWorkshop" placeholder="未获取到此信息"></t-input>
            </t-form-item>
            <t-form-item label="预排日期">
              <t-input readonly v-model="baseInfo.estimateTime" placeholder="未获取到此信息"></t-input>
            </t-form-item>
            <t-form-item label="色号">
              <t-input readonly v-model="baseInfo.factoryColorCode" placeholder="未获取到此信息"></t-input>
            </t-form-item>
            <t-form-item label="计划单号">
              <t-input readonly v-model="baseInfo.planNumber" placeholder="未获取到此信息"></t-input>
            </t-form-item>
            <t-form-item label="客户交期">
              <t-input readonly v-model="baseInfo.customerEndTime" placeholder="未获取到此信息"></t-input>
            </t-form-item>
          </t-form>
          <t-form layout="inline" labelWidth="64px">
            <t-form-item label="色称">
              <t-input readonly v-model="baseInfo.race" placeholder="未获取到此信息"></t-input>
            </t-form-item>
            <t-form-item label="生产性质">
              <t-input readonly v-model="baseInfo.productionNature" placeholder="未获取到此信息"></t-input>
            </t-form-item>
            <t-form-item label="回修单号">
              <t-input readonly v-model="baseInfo.repairCode" placeholder="未获取到此信息"></t-input>
            </t-form-item>
            <t-form-item label="重量">
              <t-input readonly v-model="baseInfo.weight" placeholder="未获取到此信息"></t-input>
            </t-form-item>
            <t-form-item label="对色光源">
              <t-input readonly v-model="baseInfo.colorMatchLightSource" placeholder="未获取到此信息"></t-input>
            </t-form-item>
            <t-form-item label="工艺类型">
              <t-input readonly v-model="baseInfo.processType" placeholder="未获取到此信息"></t-input>
            </t-form-item>
            <t-form-item label="回修类型">
              <t-input readonly v-model="baseInfo.repairType" placeholder="未获取到此信息"></t-input>
            </t-form-item>
            <t-form-item label="数量">
              <t-input readonly v-model="baseInfo.count" placeholder="未获取到此信息"></t-input>
            </t-form-item>
            <t-form-item label="确认色">
              <t-input readonly v-model="baseInfo.confirmColor" placeholder="未获取到此信息"></t-input>
            </t-form-item>
            <t-form-item label="加工类型">
              <t-input readonly v-model="baseInfo.processingType" placeholder="未获取到此信息"></t-input>
            </t-form-item>
            <t-form-item label="回修原因">
              <t-input readonly v-model="baseInfo.repairReason" placeholder="未获取到此信息"></t-input>
            </t-form-item>
          </t-form>
          <t-form labelWidth="64px">
            <t-form-item label="面料名称">
              <t-textarea readonly v-model="baseInfo.liningName" placeholder="未获取到此信息"></t-textarea>
            </t-form-item>
            <t-form-item label="工艺路线">
              <t-textarea readonly v-model="baseInfo.processRoute" placeholder="未获取到此信息"></t-textarea>
            </t-form-item>
            <t-form-item label="客户要求">
              <t-textarea readonly v-model="baseInfo.customerRequire" placeholder="未获取到此信息"></t-textarea>
            </t-form-item>
            <t-form-item label="备注">
              <t-textarea readonly v-model="baseInfo.remark" placeholder="未获取到此信息"></t-textarea>
            </t-form-item>
          </t-form>
        </div>
        <div class="detail-schedule">
          <TitleHeader title="生产进度">
            <t-progress theme="line" :percentage="detailProcessInfo.rate" />
          </TitleHeader>
        </div>
        <div class="detail-schedule-summary">
          <!-- <div class="summary__item summary__item--blue">总匹数：{{ detailProcessInfo.sumPower }}</div> -->
          <!-- <div class="summary__item summary__item--yellow">总重量：{{ detailProcessInfo.sumWeight }}吨</div> -->
          <div class="summary__item summary__item--red">总工序：{{ detailProcessInfo.sumProcedure }}</div>
          <div class="summary__item summary__item--green">已完成：{{ detailProcessInfo.sumCompletePower }}</div>
          <div class="summary__item">未完成：{{ detailProcessInfo.sumUnCompletePower }}</div>
        </div>
        <div class="detail-schedule-list">
          <t-table row-key="seq" :data="detailProcessInfo.details" :columns="scheduleColumns"></t-table>
        </div>
      </div>
    </div>
    <t-dialog
      v-model:visible="visibleColumnSetModal"
      header="设置字段"
      draggable
      :on-confirm="() => (visibleColumnSetModal = false)"
    >
      <template #body>
        <div>设置字段</div>
      </template>
    </t-dialog>

    <t-dialog
      v-model:visible="visiblePrepareModal"
      header="备胚"
      draggable
      width="800px"
      :onClose="onCloseBpDialog"
      :onConfirm="clickBpConfirm"
    >
      <template #body>
        <div>
          <t-table row-key="id" :columns="bpColumns" :data="bpData" height="350">
            <template #rfid="{ row, rowIndex }">
              <t-input :status="row.status" v-model="row.rfid" @click="clickBpInput(rowIndex)"></t-input>
            </template>
          </t-table>
        </div>
      </template>
    </t-dialog>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import type { Ref } from 'vue';
import dayjs from 'dayjs';
import { getOrderList, getInfoProcess, getFabricsList, enterLabel, updateStatus } from '@/api/production/dyeing-order';
import TitleHeader from '../components/TitleHeader.vue';
import { useUserStore } from '@/store';
import { socket } from '@/utils/socket';

const userStore = useUserStore();
const { roleId } = userStore.userInfo;

const listStateOptions = [
  { label: '全部', value: '0' },
  { label: '未开始', value: '1' },
  { label: '进行中', value: '2' },
  { label: '已完成', value: '3' },
];

const searchTypeOptions = [
  { label: '缸号', value: '0' },
  { label: '客户', value: '1' },
  { label: '布号', value: '2' },
  { label: '色号', value: '3' },
  { label: '色称', value: '4' },
  { label: '生产车间', value: '5' },
  { label: '计划单号', value: '6' },
  { label: '工艺类型', value: '7' },
  { label: '加工类型', value: '8' },
];

// 订单列表配置
const listColumns = reactive([
  {
    align: 'center',
    colKey: 'vatCode',
    title: '缸号',
  },
  {
    colKey: 'clothNo',
    title: '布号',
  },
  {
    colKey: 'customer',
    title: '客户',
  },
]);

// 列表状态默认值
const searchListState = ref('0');
const searchType = ref('0');
const searchContent = ref('');

type dyeingPaginationType = {
  current: number;
  pageSize: number;
  total?: number;
  size?: string;
  theme?: string;
};

const dyeingPagination: Ref<dyeingPaginationType> = ref({
  current: 1,
  pageSize: 10,
  total: 0,
  size: 'small',
  theme: 'simple',
});

const dyeingOrderList = ref([]);

// 订单基本信息
const INFO_DATA = {
  id: -1,
  htXh: 0, // 意思不明
  htLzkh: '', // 翰通流转卡号
  vatCode: '', // 缸号
  customer: '', // 客户
  clothNo: '', // 布号
  composeTime: '', // 排缸日期
  productionWorkshop: '', // 生产车间
  estimateTime: '', // 预排日期
  factoryColorCode: '', // 色号
  planNumber: '', // 计划单号
  customerEndTime: '', // 客户交期
  race: '', // 色称（色种）
  productionNature: '', // 生产性质
  repairCode: '', // 维修单号
  weight: '', // 重量
  colorMatchLightSource: '', // 对色光源,
  processType: '', // 工艺类型
  repairType: '', // 回修类型
  count: '', // 数量
  confirmColor: '', // 确认色
  processingType: '', // 加工类型
  repairReason: '', // 回修原因
  processRoute: '', // 工艺路线
  liningName: '', // 面料名称
  customerRequire: '', // 客户要求
  remark: '', // 备注
  createTime: '', // 创建时间
  updateTime: '', // 更新时间
  creatorId: '', // 创建人
  status: 0, // 订单状态 1 未开始 2 进行中 3 已完成
  companyId: '', // 公司id
  del: '', // 是否已删除  （0否  1 已删除）
  actualFabricWeight: '', //
};

const baseInfo = ref({ ...INFO_DATA });

// 生产进度列表
const scheduleColumns = [
  {
    align: 'center',
    colKey: 'seq',
    title: '序号',
    width: '60',
  },
  {
    align: 'center',
    colKey: 'procedureName',
    title: '工序',
    width: '60',
  },
  {
    align: 'center',
    colKey: 'startTime',
    title: '开始时间',
  },
  {
    align: 'center',
    colKey: 'useTime',
    title: '用时(分钟)',
    width: '100',
  },
  {
    align: 'center',
    colKey: 'completePower',
    title: '完成匹数',
    width: '90',
  },
  {
    align: 'center',
    colKey: 'completeWeight',
    title: '完成重量',
    width: '90',
  },
  {
    align: 'center',
    colKey: 'undonePower',
    title: '未完成匹数',
  },
  {
    align: 'center',
    colKey: 'undoneWeight',
    title: '未完成重量',
  },
];

const PROCESS_INFO = {
  details: [], //	明细列表
  rate: 0, // 总进度
  sumCompletePower: 0, // 总已完成
  sumPower: 0, // 总匹数
  sumProcedure: 0, // 总工序
  sumUnCompletePower: 0, //	未完成
  sumWeight: 0, // 总重量
};

const detailProcessInfo = reactive({ ...PROCESS_INFO });

/** 列表active状态class */
function rowClassName({ row }) {
  if (row?.isActive) {
    return 'table-row-active';
  }
  return '';
}

function setListFirstItemInfo() {
  if (dyeingOrderList.value.length <= 0) {
    return;
  }
  const firstItem = dyeingOrderList.value[0];
  firstItem.isActive = true;
  baseInfo.value = firstItem;
  getFabricsList(firstItem.id).then((res) => {
    bpData.value = res.data;
  });
  getInfoProcess(firstItem.id).then((res) => {
    const { data } = res;
    data.rate *= 100;
    data.rate = parseInt(data.rate, 10);
    data.details.forEach((item, index) => {
      if (index !== 0 && item.startTime) {
        const nowTime = dayjs(item.startTime, 'YYYY-MM-DD HH:mm:ss').unix();
        // 如果上一条数据不存在，直接跳出
        if (!data.details[index - 1].startTime) {
          return;
        }
        const preTime = dayjs(data.details[index - 1].startTime, 'YYYY-MM-DD HH:mm:ss').unix();
        let useTime = (nowTime - preTime) / 60;
        useTime = useTime < 0 ? 0 : useTime;
        data.details[index - 1].useTime = useTime.toFixed(0);
      }
    });

    Object.assign(detailProcessInfo, data);
  });
}

function resetInfo() {
  baseInfo.value = { ...INFO_DATA };
  Object.assign(detailProcessInfo, PROCESS_INFO);
}

function getDyeingOrderList(paginationVal = dyeingPagination.value) {
  resetInfo();
  const data = {
    status: searchListState.value,
    type: searchType.value,
    content: searchContent.value,
    page: paginationVal.current,
    size: paginationVal.pageSize,
  };
  getOrderList(data).then((res) => {
    const { data } = res;
    dyeingOrderList.value = data.records;
    dyeingPagination.value = {
      ...dyeingPagination.value,
      ...paginationVal,
      total: data.total,
    };
    setListFirstItemInfo();
  });
}

/** 切换状态时请求 */
function listStateChange() {
  // 异步处理，触发change的时候，v-model没处理
  setTimeout(() => {
    getDyeingOrderList();
  }, 0);
}

function onChangeDyeingPagination(changeParams, triggerAndData) {
  const { trigger } = triggerAndData;
  if (trigger === 'pagination') {
    const { current, pageSize } = changeParams.pagination;
    const pagination = { current, pageSize };
    getDyeingOrderList(pagination);
  }
}

// 备胚
const visiblePrepareModal = ref(false);
const bpColumns = [
  {
    align: 'center',
    colKey: 'id',
    title: 'ID',
  },
  {
    align: 'center',
    colKey: 'orderId',
    title: '订单ID',
  },
  {
    align: 'center',
    colKey: 'rfid',
    title: 'RFid',
  },
  {
    colKey: 'fabricNumber',
    title: '匹号',
  },
  {
    colKey: 'fabricWeight',
    title: '匹重',
  },
];
const bpData = ref([]);
const bpListActiveIndex = ref(0);
let ws = null;

function onClickRowDyeingList({ row, index }) {
  if (row.isActive) {
    return;
  }
  // 重置
  dyeingOrderList.value.forEach((item, i) => {
    if (i === index) {
      item.isActive = true;
    } else {
      item.isActive = false;
    }
  });
  baseInfo.value = row;
  getInfoProcess(row.id)
    .then((res) => {
      const { data } = res;
      if (!data) {
        Object.assign(detailProcessInfo, PROCESS_INFO);
      }
      data.rate *= 100;
      data.rate = parseInt(data.rate, 10);
      data.details.forEach((item, index) => {
        if (index !== 0 && item.startTime) {
          const nowTime = dayjs(item.startTime, 'YYYY-MM-DD HH:mm:ss').unix();
          // 如果上一条数据不存在，直接跳出
          if (!data.details[index - 1].startTime) {
            return;
          }
          const preTime = dayjs(data.details[index - 1].startTime, 'YYYY-MM-DD HH:mm:ss').unix();
          let useTime = (nowTime - preTime) / 60;
          useTime = useTime < 0 ? 0 : useTime;
          data.details[index - 1].useTime = useTime.toFixed(0);
        }
      });
      Object.assign(detailProcessInfo, data);
    })
    .catch(() => {
      Object.assign(detailProcessInfo, PROCESS_INFO);
    });
  getFabricsList(row.id).then((res) => {
    bpData.value = res.data;
  });
}

function useWebsocket() {
  const { companyId, id } = userStore.userInfo;

  const { token } = userStore;
  ws = new WebSocket(`${socket}/xiyou-digital-server/websocket/${companyId}/${id}`, [token]);
  ws.onopen = () => {
    console.log('连接成功');
    ws.send('Hello server!');
  };
  ws.onmessage = (e) => {
    if (e.data !== 'success') {
      bpData.value[bpListActiveIndex.value].rfid = e.data;
      bpListActiveIndex.value += 1;
      bpData.value.forEach((item) => {
        item.status = '';
      });
      bpData.value[bpListActiveIndex.value].status = 'success';
    }
  };
  ws.onclose = (event) => {
    console.log('连接关闭', event);
  };
  ws.onerror = (event) => {
    console.log('连接失败', event);
  };
}

function clickBpBtn() {
  visiblePrepareModal.value = true;
  bpData.value.forEach((item) => {
    item.status = '';
  });
  if (bpData.value[0]) {
    bpData.value[0].status = 'success';
  }

  useWebsocket();
}

function clickBpInput(index) {
  bpListActiveIndex.value = index;
  bpData.value.forEach((item) => {
    item.status = '';
  });
  bpData.value[bpListActiveIndex.value].status = 'success';
}

function onCloseBpDialog() {
  bpListActiveIndex.value = 0;
  if (ws) {
    ws.close();
  }
}

function clickBpConfirm() {
  const list = bpData.value;
  enterLabel(list).then(() => {
    visiblePrepareModal.value = false;
    getDyeingOrderList();
  });
  if (ws) {
    ws.close();
  }
}

function clickUpdateState(status) {
  const { id } = baseInfo.value;
  const data = {
    id,
    status,
  };
  updateStatus(data).then(() => {
    getDyeingOrderList();
  });
}

onMounted(() => {
  getDyeingOrderList();
});

const visibleColumnSetModal = ref(false);
</script>
<style lang="less" scoped>
:deep(.t-table__empty) {
  border-bottom: 0;
}
:deep(.t-table th),
:deep(.t-table td) {
  padding: 10px 16px;
}
.dyeing-order {
  background-color: #fff;
  padding: 10px 20px;
}
.dyeing-order-top {
  height: 41px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
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

.dyeing-order-content {
  display: flex;
  position: relative;
  &__list {
    border-right: 1px solid #f3f3f3;
    width: 400px;
    padding-right: 16px;
    flex-shrink: 0;
    &-filter {
      display: flex;
      margin-bottom: 8px;
      padding-top: 8px;
      & > div:nth-child(2) {
        margin: 0 8px;
      }
    }
    .search-btn-group {
      display: flex;
      column-gap: 1px;
    }
    &-content {
      :deep(.t-table) {
        margin-bottom: 16px;
      }
      :deep(.table-row-active) {
        background-color: #ecf2fe;
      }
    }
  }
  &__detail {
    padding: 0 20px;
  }
}

.detail-form {
  .t-form {
    margin-bottom: 8px;
    .t-form__item {
      margin-bottom: 8px;
    }
    :deep(.t-form__label) {
      padding-right: 8px;
    }
  }
  .t-form-inline {
    row-gap: 0;
  }
}

.detail-schedule-summary {
  display: flex;
  justify-content: end;
  padding: 0 20px;
  .summary__item {
    position: relative;
    margin-left: 24px;
    padding-left: 18px;
    color: #000;
    &::before {
      content: '';
      position: absolute;
      width: 8px;
      height: 8px;
      border-radius: 100%;
      background-color: #c5c5c5;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
    }
    &--blue {
      &::before {
        background-color: #0052d9;
      }
    }
    &--yellow {
      &::before {
        background-color: #ed7b2f;
      }
    }
    &--red {
      &::before {
        background-color: #c9353f;
      }
    }
    &--green {
      &::before {
        background-color: #00a870;
      }
    }
  }
}
</style>
