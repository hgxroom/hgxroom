<!-- 资料-工序页面 -->
<template>
  <div class="dyeing-order">
    <div class="dyeing-order-top">
      <div class="dyeing-order-top__title"><t-button theme="primary" @click="handleClick({})">新增</t-button></div>
    </div>
    <div class="dyeing-order-content">
      <div class="dyeing-order-content__list">
        <t-table
          row-key="index"
          :data="data"
          :columns="columns"
          @row-click="handleRowClick"
          :pagination="pagination"
          @page-change="rehandlePageChange"
        >
          <template #index="{ rowIndex }"> {{ rowIndex + 1 }} </template>
          <template #status="{ row }">
            <span v-show="row.status === 0" class="span--normal">正常</span>
            <span v-show="row.status === -1" class="span--disable">禁用</span>
          </template>
          <template #operation="{ row }">
            <a v-if="row.status === -1" class="t-button-link disabled">编辑</a>
            <a v-else class="t-button-link" @click="handleClick(row)">编辑</a>
            <a class="t-button-link" @click="handleClickDelete(row)">删除</a>
            <a class="t-button-link" @click="handleClickDisable(row)">禁用</a>
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
      <t-form ref="formRef" :data="formData" :rules="rules" label-align="top">
        <t-form-item label="工段" name="parentId ">
          <t-select
            v-model="formData.parentId"
            :style="{ width: '322px' }"
            placeholder="请选择类型"
            class="demo-select-base"
            clearable
          >
            <t-option v-for="(item, index) in TYPE_OPTIONS" :key="index" :value="item.value" :label="item.label">
              {{ item.label }}
            </t-option>
          </t-select>
        </t-form-item>
        <t-form-item label="工序" name="processName">
          <t-input v-model="formData.processName" clearable />
        </t-form-item>
      </t-form>
      <template #footer>
        <t-button v-show="drawer == `编辑工序`" theme="primary" type="submit" @click="onSubmit(0)">保存</t-button>
        <t-button v-show="drawer == `新增工序`" theme="primary" type="submit" @click="onSubmit(1)">保存并新增</t-button>
        <t-button v-show="drawer == `新增工序`" theme="primary" type="submit" @click="onSubmit(2)">保存并复制</t-button>
        <t-button variant="outline" @click="visible = false">取消</t-button>
      </template>
    </t-drawer>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import { selectProcessGet, processListGet, processListAddOrUpdate, processListDel } from '@/api/base/process';

const formRef = ref(null);
const chooseRow = ref(null); // 编辑行
const data = ref([]);
const TYPE_OPTIONS = ref([]);
const INITIAL_DATA = {
  parentId: '',
  processName: '',
  id: null,
};
const drawer = ref(`新增工序`); // 抽屉标签
const pagination = ref({
  defaultPageSize: 20,
  total: 0,
  defaultCurrent: 1,
});
const rules = {
  station: [{ required: true, message: '工段必填' }],
  processName: [{ required: true, message: '工序必填' }],
};
const formData = ref({ ...INITIAL_DATA });

const columns = [
  {
    colKey: 'index',
    title: '序号',
  },
  {
    colKey: 'station',
    title: '工段',
  },
  {
    colKey: 'processName',
    title: '工序',
  },
  {
    colKey: 'username',
    title: '创建人',
  },
  {
    colKey: 'createTime',
    title: '创建日期',
  },
  {
    colKey: 'updateTime',
    title: '更新日期',
  },
  {
    colKey: 'status',
    title: '状态',
  },
  {
    colKey: 'operation',
    title: '操作',
    width: 200,
  },
];
const visible = ref(false);
// 选中行
const handleRowClick = ({ row }) => {
  chooseRow.value = row;
};
const getSection = () => {
  selectProcessGet({ parentId: [0], status: 0 }).then((res) => {
    console.log(res, 110);
  });
};
const getList = (obj: object) => {
  processListGet(obj).then((res) => {
    const list = res.data.data;
    pagination.value.defaultPageSize = list.size;
    pagination.value.total = list.total;
    pagination.value.defaultCurrent = list.current;
    data.value = list.records;
    console.log(data.value);
  });
};
const handleClick = (row) => {
  if (row.station) {
    drawer.value = `编辑工序`;
    formData.value.parentId = row.station;
    formData.value.processName = row.processName;
  } else {
    drawer.value = `新增工序`;
    formData.value.parentId = '';
    formData.value.processName = '';
  }
  visible.value = true;
};
const rehandlePageChange = (curr, pageInfo) => {
  console.log('分页变化', curr, pageInfo);
};
const handleClose = () => {
  visible.value = false;
};
const onSubmit = (type) => {
  // type 保存状态 0：保存 1保存并新增 2保存并复制
  formData.value.id = type ? null : chooseRow.value.id;
  formRef.value.validate().then((res) => {
    if (res === true) {
      processListAddOrUpdate(formData.value).then((res) => {
        if (type) {
          MessagePlugin.success('新增成功');
          if (type === 1) {
            formData.value.parentId = '';
            formData.value.processName = '';
          }
        } else {
          MessagePlugin.success('保存成功');
          visible.value = false;
        }
        getList({ page: pagination.value.defaultCurrent, size: pagination.value.defaultPageSize });
      });
    }
  });
};
const handleClickDisable = (slotProps) => {
  console.log(slotProps, '禁用');
};
const handleClickDelete = (slotProps) => {
  console.log(slotProps, '删除');
};
onMounted(() => {
  getSection();
  getList({ page: 1, size: 10 });
});
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
.span--normal {
  color: #00a870;
}
.span--disable {
  color: rgba(0, 0, 0, 0.26);
}
</style>
