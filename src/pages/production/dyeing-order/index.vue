<template>
  <div class="dyeing-order">
    <div class="dyeing-order-top">
      <div class="dyeing-order-top__title">订单列表</div>
      <div class="dyeing-order-top__btn-group">
        <t-button variant="outline" theme="default" @click="visibleColumnSetModal = true">设置字段</t-button>
        <t-button theme="primary" @click="visiblePrepareModal = true">备胚</t-button>
        <t-button theme="primary">入库</t-button>
      </div>
    </div>
    <div class="dyeing-order-content">
      <div class="dyeing-order-content__list">
        <div class="dyeing-order-content__list__filter">
          <t-select v-model="listState" :options="listStateOptions" />
          <t-select></t-select>
          <div class="search-btn-group">
            <t-input placeholder="请输入查询内容" />
            <t-button shape="square" variant="outline">
              <template #icon>
                <t-icon name="search"></t-icon>
              </template>
            </t-button>
          </div>
        </div>
        <div class="dyeing-order-content__list__content">
          <t-table row-key="vatCode" :columns="listColumns"></t-table>
          <t-pagination></t-pagination>
        </div>
      </div>

      <div class="dyeing-order-content__detail">
        <TitleHeader title="基本信息" />
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
              <t-input readonly v-model="baseInfo.liningName" placeholder="未获取到此信息"></t-input>
            </t-form-item>
            <t-form-item label="工艺路线">
              <t-textarea readonly v-model="baseInfo.processRoute" placeholder="未获取到此信息"></t-textarea>
            </t-form-item>
            <t-form-item label="客户要求">
              <t-input readonly v-model="baseInfo.customerRequire" placeholder="未获取到此信息"></t-input>
            </t-form-item>
            <t-form-item label="备注">
              <t-input readonly v-model="baseInfo.remark" placeholder="未获取到此信息"></t-input>
            </t-form-item>
          </t-form>
        </div>
        <div class="detail-schedule">
          <TitleHeader title="生产进度">
            <t-progress theme="line" :percentage="30" />
          </TitleHeader>
        </div>
        <div class="detail-schedule-summary">
          <div class="summary__item summary__item--blue">总匹数：24</div>
          <div class="summary__item summary__item--yellow">总重量：2670吨</div>
          <div class="summary__item summary__item--red">总工序：24</div>
          <div class="summary__item summary__item--green">已完成：24</div>
          <div class="summary__item">未完成：24</div>
        </div>
        <div class="detail-schedule-list">
          <t-table row-key="vatCode" :columns="scheduleColumns"></t-table>
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
      :on-confirm="() => (visiblePrepareModal = false)"
    >
      <template #body>
        <div>备胚</div>
      </template>
    </t-dialog>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue';
import TitleHeader from '../components/TitleHeader.vue';
// 订单列表筛选
const listStateOptions = [
  {
    label: '全部',
    value: '0',
  },
  { label: '未开始', value: '1' },
  { label: '进行中', value: '2' },
  { label: '已完成', value: '3' },
];
const listState = ref('2');

const visibleColumnSetModal = ref(false);
// 订单列表
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
setTimeout(() => {
  listColumns.push({
    colKey: 'test',
    title: '测试',
  });
}, 2000);
// 备胚
const visiblePrepareModal = ref(false);
// 订单基本信息
const INFO_DATA = {
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
  status: '', // 订单状态 1 未开始 2 进行中 3 已完成
  companyId: '', // 公司id
  del: '', // 是否已删除  （0否  1 已删除）
  actualFabricWeight: '', //
};
const baseInfo = reactive({ ...INFO_DATA });

// 生产进度列表
const scheduleColumns = [
  {
    align: 'center',
    colKey: 'index',
    title: '序号',
    width: '60',
  },
  {
    align: 'center',
    width: '60',
    colKey: 'platform',
    title: '工序',
  },
  {
    align: 'center',
    colKey: 'platform',
    title: '开始时间',
  },
  {
    align: 'center',
    colKey: 'platform',
    title: '用时',
    width: '60',
  },
  {
    align: 'center',
    colKey: 'platform',
    title: '完成匹数',
    width: '90',
  },
  {
    align: 'center',
    colKey: 'platform',
    title: '完成重量',
    width: '90',
  },
  {
    align: 'center',
    colKey: 'platform',
    title: '未完成匹数',
  },
  {
    align: 'center',
    colKey: 'platform',
    title: '为完成重量',
  },
];
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
    &__filter {
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
    &__content {
      :deep(.t-table) {
        margin-bottom: 16px;
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
