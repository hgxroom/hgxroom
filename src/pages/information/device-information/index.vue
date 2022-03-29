<!-- 资料-设备 -->
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
          <template #deviceType="{ row }">
            <span v-if="TYPE_DEVICE.findIndex((item) => item.id === row.deviceType) >= 0" class="span--normal">
              {{ TYPE_DEVICE[TYPE_DEVICE.findIndex((item) => item.id === row.deviceType)].deviceTypeName }}
            </span>
            <span v-else>类型不存在</span>
          </template>
          <template #status="{ row }">
            <span v-show="row.status === 0" class="span--normal">正常</span>
            <span v-show="row.status === -1" class="span--disable">禁用</span>
          </template>
          <template #tree="{ row }">
            <span v-for="item in row.tree" :key="item.id">
              <a v-if="item.child" class="t-button-link" @click="ondialog(item.child)">
                <t-tooltip :content="item.content"> {{ item.name }}{{ item.child.length }}</t-tooltip>
              </a>
            </span>
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
            <a class="t-button-link" @click="handleClickDisable(row)">{{ row.status === -1 ? '启用' : '禁用' }}</a>
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
        <t-form-item label="设备号" name="deviceNumber">
          <t-input v-model="formData.deviceNumber" placeholder="请输入内容" />
        </t-form-item>
        <t-form-item label="设备ID" name="deviceId">
          <t-input v-model="formData.deviceId" clearable />
        </t-form-item>
        <t-form-item label="设备类型" name="deviceType">
          <t-select v-model="formData.deviceType" placeholder="请选择设备类型" class="demo-select-base" clearable>
            <t-option v-for="item in TYPE_DEVICE" :key="item.id" :value="item.id" :label="item.deviceTypeName">
              {{ item.deviceTypeName }}
            </t-option>
          </t-select>
        </t-form-item>
        <t-form-item label="车间" name="workshopId">
          <t-select v-model="formData.workshopId" placeholder="请选择设备类型" class="demo-select-base" clearable>
            <t-option v-for="item in TYPE_WORKSHOP" :key="item.id" :value="item.id" :label="item.workshopName">
              {{ item.workshopName }}
            </t-option>
          </t-select>
        </t-form-item>
        <t-form-item label="工段&工序" name="stationprocessIds">
          <t-cascader
            multiple
            v-model="formData.stationprocessIds"
            class="t-demo-cascader"
            :options="TYPE_STATION_IDS"
            clearable
            :load="load"
          />
        </t-form-item>
        <t-form-item label="工率" name="power">
          <t-select v-model="formData.power" placeholder="请选择工率" class="demo-select-base" clearable>
            <t-option v-for="item in [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]" :key="item" :value="item">
              {{ item }}
            </t-option>
          </t-select>
        </t-form-item>
      </t-form>
      <template #footer>
        <t-button v-show="drawer == `编辑设备`" theme="primary" type="submit" @click="onSubmit(0)">保存</t-button>
        <t-button v-show="drawer == `新增设备`" theme="primary" type="submit" @click="onSubmit(1)">保存并新增</t-button>
        <t-button v-show="drawer == `新增设备`" theme="primary" type="submit" @click="onSubmit(2)">保存并复制</t-button>
        <t-button variant="outline" @click="visible = false">取消</t-button>
      </template>
    </t-drawer>
    <t-dialog v-model:visible="visibleModal" header="工序详情" mode="modal" draggable :confirmBtn="DIALOG_BUTTON">
      <template #body>
        <div v-for="item in DIALOG_TABLE" :key="item.id" :value="item.id">工序：{{ item.name }}；</div>
      </template>
    </t-dialog>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import { deviceInfoListGet, deviceInfoListDel, deviceInfoListAddOrUpdate } from '@/api/base/device-info';
import { selectProcessGet } from '@/api/base/process';
import { selectDeviceTypeGet } from '@/api/base/devic-type';
import { selectWorkshopGet } from '@/api/base/workshop';
import { useUserStore } from '@/store';

const formRef = ref(null);
const visible = ref(false);
const data = ref([]);
const chooseRow = ref(null); // 编辑行
const TYPE_STATION_IDS = ref([]); // 级联工段工序
const TYPE_DEVICE = ref([]); // 设备类型
const TYPE_WORKSHOP = ref([]); // 车间
const INITIAL_DATA = {
  deviceNumber: '', // 设备号
  deviceId: null, // 设备id
  deviceType: null, // 设备类型
  workshopId: null, // 车间
  stationIds: [], // 工段
  processIds: [], // 工序
  stationprocessIds: [], // 工段&工序
  power: null, // 功率
  id: null,
};
const drawer = ref(`新增设备`);
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
const rules = {
  deviceNumber: [
    { required: true, message: '设备号必填' },
    { pattern: /^[a-zA-Z0-9]{1,8}$/, message: '最多8个数字或字母' },
  ],
  deviceId: [{ pattern: /^[a-zA-Z0-9]{1,8}$/, message: '最多8个数字或字母' }],
  deviceType: [{ required: true, message: '设备类型必填' }],
  workshopId: [{ required: true, message: '车间必填' }],
  stationprocessIds: [{ required: true, message: '工段&工序必填' }],
  power: [{ required: true, message: '功率必选' }],
};
const formData = ref({ ...INITIAL_DATA });
const userStore = useUserStore();
const { roleId } = userStore.userInfo;
const columns = ref([
  {
    colKey: 'index',
    title: '序号',
  },
  {
    colKey: 'deviceNumber',
    title: '设备号',
  },
  {
    colKey: 'deviceType',
    title: '设备类型',
  },
  {
    colKey: 'deviceId',
    title: '设备ID',
  },
  {
    colKey: 'workshopName',
    title: '车间',
  },
  {
    colKey: 'tree',
    title: '工序&工段',
  },
  {
    colKey: 'power',
    title: '功率',
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
]);
const DIALOG_TABLE = ref([]); // 弹出框数据
const DIALOG_BUTTON = ref(null);
const visibleModal = ref(false);
const ondialog = (data) => {
  DIALOG_TABLE.value = data;
  visibleModal.value = true;
};
const getSection = (obj) => {
  // 下拉框数据 工段
  selectProcessGet(obj).then((res) => {
    res.data.forEach((item) => {
      item.value = String(item.id);
      item.label = item.processName;
      item.children = true;
    });
    TYPE_STATION_IDS.value = res.data;
    console.log(TYPE_STATION_IDS.value, 258);
  });
};
const load = (node) => {
  return selectProcessGet({ parentIds: [node.value], status: 0 }).then((res) => {
    res.data.forEach((item) => {
      item.value = `${item.parentId}-${item.id}`;
      item.label = item.processName;
    });
    return res.data;
  });
};
const onReset = () => {
  formData.value.deviceNumber = ''; // 设备号
  formData.value.deviceId = null; // 设备id
  formData.value.deviceType = null; // 设备类型
  formData.value.workshopId = null; // 车间
  formData.value.stationIds = []; // 工段
  formData.value.processIds = []; // 工序
  formData.value.stationprocessIds = []; // 工段&工序
  formData.value.power = null; // 功率
  formData.value.id = null;
};
// 选中行
const handleRowClick = ({ row }) => {
  chooseRow.value = row;
};
const getList = (obj: object) => {
  deviceInfoListGet(obj).then((res) => {
    const list = res.data;
    pagination.value.pageSize = list.size;
    pagination.value.total = list.total;
    pagination.value.current = list.current;
    list.records.forEach((item) => {
      item.tree.forEach((itemRen) => {
        if (itemRen.child) {
          itemRen.content = itemRen.child.map((itemRen) => `工序：${itemRen.name}`).join('--');
        } else {
          itemRen.content = '';
        }
      });
    });
    data.value = list.records;
  });
};
const handleClick = (row) => {
  onReset();
  if (row.deviceNumber) {
    drawer.value = `编辑设备`;
    formData.value.deviceNumber = row.deviceNumber;
    formData.value.deviceId = row.deviceId;
    formData.value.deviceType = Number(row.deviceType);
    formData.value.workshopId = Number(row.workshopId);
    console.log(row.tree.map((item) => item.id));
    formData.value.power = row.power;
    const parentIds = row.tree.map((item) => Number(item.id));
    selectProcessGet({ parentIds, status: 0 }).then((res) => {
      res.data.forEach((item) => {
        item.value = `${item.parentId}-${item.id}`;
        item.label = item.processName;
      });
      parentIds.forEach((item) => {
        const children = res.data.filter((itemRen) => item === itemRen.parentId && itemRen);
        const findIndex = TYPE_STATION_IDS.value.findIndex((itemRen) => itemRen.id === item);
        TYPE_STATION_IDS.value[findIndex].children = children;
      });
      row.tree.forEach((item) => {
        if (item.child) {
          item.child.forEach((itemRen) => {
            formData.value.stationprocessIds.push(`${itemRen.pid}-${itemRen.id}`);
          });
        } else {
          formData.value.stationprocessIds.push(item.id);
        }
      });
      visible.value = true;
    });
  } else {
    visible.value = true;
    drawer.value = `新增设备`;
  }
};
const rehandleChange = (changeParams) => {
  const { current, pageSize } = changeParams.pagination;
  getList({ page: current, size: pageSize });
};
const handleClose = () => {
  visible.value = false;
};
const onSubmit = (type) => {
  formData.value.stationprocessIds.forEach((item) => {
    formData.value.stationIds.push(item.split('-')[0]);
    formData.value.processIds.push(item.split('-')[1]);
  });
  formData.value.stationIds = [...new Set(formData.value.stationIds)];
  formData.value.processIds = [...new Set(formData.value.processIds)];
  // type 保存状态 0：保存 1保存并新增 2保存并复制
  formData.value.id = type ? null : chooseRow.value.id;
  formRef.value.validate().then((res) => {
    if (res === true) {
      deviceInfoListAddOrUpdate(formData.value).then((res) => {
        if (type) {
          MessagePlugin.success('新增成功');
          if (type === 1) {
            onReset();
          }
        } else {
          MessagePlugin.success('保存成功');
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
  deviceInfoListAddOrUpdate({ id: row.id, status }).then(() => {
    row.status = status;
    getList({ page: pagination.value.current, size: pagination.value.pageSize });
    MessagePlugin.success(message);
  });
};
const handleClickDelete = (row) => {
  deviceInfoListDel({ id: row.id, del: 1 }).then(() => {
    data.value.forEach((item, index) => {
      if (item === row) {
        data.value.splice(index, 1);
      }
    });
    MessagePlugin.success('删除成功');
    getList({ page: pagination.value.current, size: pagination.value.pageSize });
    row.visible = false;
  });
};
onMounted(() => {
  if (roleId === 1) {
    columns.value.push({
      colKey: 'operation',
      title: '操作',
      width: 200,
    });
  }
  selectDeviceTypeGet({ parentIds: [0], status: 0 }).then((res) => {
    console.log(res.data);
    TYPE_DEVICE.value = res.data;
  });
  selectWorkshopGet({ parentIds: [0], status: 0 }).then((res) => {
    TYPE_WORKSHOP.value = res.data;
  });
  getSection({ parentIds: [0], status: 0 });
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
