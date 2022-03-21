<!-- 资料-设备类型 -->
<template>
  <div class="dyeing-order">
    <div class="dyeing-order-top">
      <div class="dyeing-order-top__title"><t-button theme="primary" @click="handleClick()">新增</t-button></div>
    </div>
    <div class="dyeing-order-content">
      <div class="dyeing-order-content__list">
        <t-table
          row-key="index"
          :data="data"
          :columns="columns"
          :stripe="stripe"
          :bordered="bordered"
          :hover="hover"
          @row-click="handleRowClick"
          :pagination="pagination"
          @page-change="rehandlePageChange"
        >
          <template #operation="slotProps">
            <a class="t-button-link disabled" @click="handleClick(slotProps)">编辑</a>
            <a class="t-button-link" @click="handleClickDelete(slotProps)">删除</a>
            <a class="t-button-link" @click="handleClickDisable(slotProps)">禁用</a>
          </template>
        </t-table>
      </div>
    </div>
    <t-drawer
      v-model:visible="visible"
      size="480px"
      :header="drawer"
      @submit="onSubmit"
      :on-confirm="handleClose"
      @close="handleClose"
      destroy-on-close
    >
      <t-form ref="formRef" :data="formData" :rules="rules" label-align="top" >
        <t-form-item label="设备类型" name="password">
          <t-input v-model="formData.password" clearable />
        </t-form-item>
      </t-form>
      <template #footer>
        <t-button v-show="drawer == `编辑设备类型`" theme="primary" type="submit" @click="onSubmit">保存</t-button>
        <t-button v-show="drawer == `新增设备类型`" theme="primary" type="submit" @click="onSubmit">保存并新增</t-button>
        <t-button v-show="drawer == `新增设备类型`" theme="primary" type="submit" @click="onSubmit">保存并复制</t-button>
        <t-button variant="outline" @click="visible = false">取消</t-button>
      </template>
    </t-drawer>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const formRef = ref(null);
const data = ref([{index : 1}]);
const INITIAL_DATA = {
  name: '',
  password: '',
};
const drawer = ref(`新增设备类型`);
const pagination = ref({
  defaultPageSize: 20,
  total: 100,
  defaultCurrent: 1,
});
const rules = {
  name: [{ required: true, message: '用户名必填' }],
  password: [{ required: true, message: '用户名必填' }],
};
const formData = ref({ ...INITIAL_DATA });

const columns = [
  {
    colKey: 'index',
    title: '序号',
  },
  {
    colKey: 'index',
    title: '设备类型',
  },
  {
    colKey: 'index',
    title: '设备类型',
  },
  {
    colKey: 'index',
    title: '创建人',
  },
  {
    colKey: 'index',
    title: '创建日期',
  },
  {
    colKey: 'index',
    title: '更新日期',
  },
  {
    colKey: 'index',
    title: '状态',
  },
  {
    colKey: 'operation',
    title: '操作',
    width: 200,
  },
];
const visible = ref(false);
const handleClick = (slotProps) => {
  if (slotProps) {
    console.log(`编辑`, formData);
    drawer.value = `编辑设备类型`;
    formData.value.name = `1`;
    formData.value.password = `1`;
  } else {
    console.log(`新增`, formData);
    drawer.value = `新增设备类型`;
    formData.value.name = " ";
    formData.value.password = " ";
  }
  visible.value = true;
};
const rehandlePageChange = (curr, pageInfo) => {
  console.log('分页变化', curr, pageInfo);
};
const handleClose = () => {
  visible.value = false;
};
const onSubmit = () => {
  console.log(formRef.value.validate());
  // handleClose();
};
const handleClickDisable = (slotProps) => {
  console.log(slotProps,"禁用")
};
const handleClickDelete = (slotProps) => {
  console.log(slotProps,"删除")
};
</script>
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
a.disabled {
  pointer-events: none;
  filter: alpha(opacity=50); /*IE滤镜，透明度50%*/
  -moz-opacity: 0.5; /*Firefox私有，透明度50%*/
  opacity: 0.5; /*其他，透明度50%*/
  color: rgb(153, 153, 153);
}
</style>
