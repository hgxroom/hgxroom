<!-- 资料-设备类型 -->
<template>
  <div class="dyeing-order">
    <div class="dyeing-order-top">
      <div class="dyeing-order-top__title">
        <t-button theme="primary" @click="handleClick({})" v-if="roleId === 1">新增</t-button>
      </div>
    </div>
    <div class="dyeing-order-content">
      <div class="dyeing-order-content__list">
        <t-table
          row-key="index"
          :data="data"
          :columns="columns"
          @row-click="handleRowClick"
          :pagination="pagination"
          @change="rehandleChange"
        >
          <template #index="{ rowIndex }"> {{ rowIndex + 1 }} </template>
          <template #status="{ row }">
            <span v-show="row.status === 0" class="span--normal">正常</span>
            <span v-show="row.status === -1" class="span--disable">禁用</span>
          </template>
          <template #operation="{ row }">
            <a v-if="row.status === -1" class="t-button-link disabled">编辑</a>
            <a v-else class="t-button-link" @click="handleClick(row)">编辑</a>
            <a v-if="row.status === -1" class="t-button-link disabled">删除</a>
            <t-popconfirm
              v-else
              class="t-button-link"
              :visible="row.visible"
              theme="default"
              content="是否删除?"
              @Cancel="
                () => {
                  row.visible = false;
                }
              "
              @Confirm="handleClickDelete(row)"
            >
              <a
                @click="
                  () => {
                    row.visible = true;
                  }
                "
                >删除</a
              >
            </t-popconfirm>
            <a v-if="row.status === -1" class="t-button-link" @click="handleClickDisable(row)">启用</a>
            <t-popconfirm
              v-else
              class="t-button-link"
              :visible="row.disible"
              theme="default"
              content="是否禁用?"
              @Cancel="
                () => {
                  row.disible = false;
                }
              "
              @Confirm="handleClickDisable(row)"
            >
              <a
                @click="
                  () => {
                    row.disible = true;
                  }
                "
                >禁用</a
              >
            </t-popconfirm>
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
        <t-form-item label="设备类型" name="deviceTypeName">
          <t-input v-model="formData.deviceTypeName" clearable />
        </t-form-item>
      </t-form>
      <template #footer>
        <t-button v-show="drawer == `编辑设备类型`" theme="primary" type="submit" @click="onSubmit(0)">保存</t-button>
        <t-button v-show="drawer == `新增设备类型`" theme="primary" type="submit" @click="onSubmit(1)"
          >保存并新增</t-button
        >
        <t-button v-show="drawer == `新增设备类型`" theme="primary" type="submit" @click="onSubmit(2)"
          >保存并复制</t-button
        >
        <t-button variant="outline" @click="visible = false">取消</t-button>
      </template>
    </t-drawer>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { showMessage } from '@/utils/notice';
import { deviceTypeListGet, deviceTypeListDel, deviceTypeListAddOrUpdate } from '@/api/base/devic-type';
import { useUserStore } from '@/store';

const formRef = ref(null);
const data = ref([]);
const chooseRow = ref(null); // 编辑行
const visible = ref(false);
const INITIAL_DATA = {
  deviceTypeName: '',
  id: null,
};
const drawer = ref(`新增设备类型`);
const pagination = ref({
  pageSize: 20,
  total: 0,
  current: 1,
  pageSizeOptions: [
    { label: '10条/页', value: 10 },
    { label: '20条/页', value: 20 },
    { label: '50条/页', value: 50 },
    { label: '100条/页', value: 100 },
  ],
});
const userStore = useUserStore();
const { roleId } = userStore.userInfo;
const rules = {
  deviceTypeName: [
    { required: true, message: '设备类型必填' },
    { pattern: /^[\u4e00-\u9fa5a-zA-Z0-9]{1,10}$/, message: '最多10个汉字、数字或字母' },
  ],
};
const formData = ref({ ...INITIAL_DATA });

const columns = ref([
  {
    colKey: 'index',
    title: '序号',
    width: '80',
    fixed: 'left',
  },
  {
    colKey: 'deviceTypeName',
    title: '设备类型',
    width: '150',
  },
  {
    colKey: 'username',
    title: '创建人',
    width: '140',
  },
  {
    colKey: 'createTime',
    title: '创建日期',
    width: '190',
  },
  {
    colKey: 'updateTime',
    title: '更新日期',
    width: '190',
  },
  {
    colKey: 'status',
    title: '状态',
    width: '80',
  },
]);

const getList = (obj: object) => {
  deviceTypeListGet(obj).then((res) => {
    const list = res.data;
    pagination.value.pageSize = list.size;
    pagination.value.total = list.total;
    pagination.value.current = list.current;
    data.value = list.records;
  });
};
// 选中行
const handleRowClick = ({ row }) => {
  chooseRow.value = row;
};
const handleClick = (row) => {
  if (row.deviceTypeName) {
    drawer.value = `编辑设备类型`;
    formData.value.deviceTypeName = row.deviceTypeName;
  } else {
    drawer.value = `新增设备类型`;
    formData.value.deviceTypeName = '';
  }
  visible.value = true;
};
const rehandleChange = (changeParams) => {
  const { current, pageSize } = changeParams.pagination;
  getList({ page: current, size: pageSize });
};
const handleClose = () => {
  visible.value = false;
};
const onSubmit = (type) => {
  // type 保存状态 0：保存 1保存并新增 2保存并复制
  formData.value.id = type ? null : chooseRow.value.id;
  formRef.value.validate().then((res) => {
    if (res === true) {
      deviceTypeListAddOrUpdate(formData.value).then((res) => {
        if (type) {
          showMessage('新增成功', 'success');
          if (type === 1) {
            formData.value.deviceTypeName = '';
          }
        } else {
          showMessage('保存成功', 'success');
          visible.value = false;
        }
        getList({ page: pagination.value.current, size: pagination.value.pageSize });
      });
    }
  });
};
const handleClickDisable = (row) => {
  const status = row.status === 0 ? -1 : 0;
  const message = status ? '禁用成功' : '启用成功';
  deviceTypeListAddOrUpdate({ id: row.id, status }).then(() => {
    row.status = status;
    getList({ page: pagination.value.current, size: pagination.value.pageSize });
    showMessage(message, 'success');
    row.disible = false;
  });
};
const handleClickDelete = (row) => {
  deviceTypeListDel({ id: row.id, del: 1 }).then(() => {
    data.value.forEach((item, index) => {
      if (item === row) {
        data.value.splice(index, 1);
      }
    });
    showMessage('删除成功', 'success');
    getList({ page: pagination.value.current, size: pagination.value.pageSize });
    row.visible = false;
  });
};
onMounted(() => {
  if (roleId === 1) {
    columns.value.push({
      colKey: 'operation',
      title: '操作',
      width: '180',
      fixed: 'right',
    });
  }
  getList({ page: pagination.value.current, size: pagination.value.pageSize });
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
.span--normal {
  color: #00a870;
}
.span--disable {
  color: rgba(0, 0, 0, 0.26);
}
a.disabled {
  pointer-events: none;
  filter: alpha(opacity=50); /*IE滤镜，透明度50%*/
  -moz-opacity: 0.5; /*Firefox私有，透明度50%*/
  opacity: 0.5; /*其他，透明度50%*/
  color: rgb(153, 153, 153);
}
</style>
