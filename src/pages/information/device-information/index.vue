<!-- 资料-设备 -->
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
          @change="rehandleChange"
        >
          <template #index="{ rowIndex }"> {{ rowIndex + 1 }} </template>
          <template #deviceType="{ row }">
            <span class="span--normal">{{
              TYPE_DEVICE[TYPE_DEVICE.findIndex((item) => item.id === row.deviceType)].deviceTypeName
            }}</span>
          </template>
          <template #status="{ row }">
            <span v-show="row.status === 0" class="span--normal">正常</span>
            <span v-show="row.status === -1" class="span--disable">禁用</span>
          </template>
          <template #tree="{ row }">
            <span v-for="item in row.tree" :key="item.id">
              {{ item.name }}
              <a v-if="item.child" class="t-button-link">
                {{ item.child.length }}
              </a>
            </span>
          </template>
          <template #operation="{ row }">
            <a v-if="row.status === -1" class="t-button-link disabled">编辑</a>
            <a v-else class="t-button-link" @click="handleClick(row)">编辑</a>
            <a v-if="row.status === -1" class="t-button-link disabled">删除</a>
            <a v-else class="t-button-link" @click="handleClickDelete(row)">删除</a>
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
        <t-form-item label="工段" name="stationIds">
          <t-select
            v-model="formData.stationIds"
            placeholder="请选择工段"
            class="demo-select-base"
            clearable
            @change="handleChange"
            multiple
          >
            <t-option v-for="item in TYPE_STATION" :key="item.id" :value="item.id" :label="item.processName">
              {{ item.processName }}
            </t-option>
          </t-select>
        </t-form-item>
        <t-form-item label="工序" name="processIds">
          <t-select v-model="formData.processIds" placeholder="请选择工序" class="demo-select-base" clearable multiple>
            <t-option v-for="item in TYPE_PROCESSNAME" :key="item.id" :value="item.id" :label="item.processName">
              {{ item.processName }}
            </t-option>
          </t-select>
        </t-form-item>
        <t-form-item label="工率" name="power">
          <t-input v-model="formData.power" clearable />
        </t-form-item>
      </t-form>
      <template #footer>
        <t-button v-show="drawer == `编辑设备`" theme="primary" type="submit" @click="onSubmit(0)">保存</t-button>
        <t-button v-show="drawer == `新增设备`" theme="primary" type="submit" @click="onSubmit(1)">保存并新增</t-button>
        <t-button v-show="drawer == `新增设备`" theme="primary" type="submit" @click="onSubmit(2)">保存并复制</t-button>
        <t-button variant="outline" @click="visible = false">取消</t-button>
      </template>
    </t-drawer>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import { deviceInfoListGet, deviceInfoListDel, deviceInfoListAddOrUpdate } from '@/api/base/device-info';
import { selectProcessGet } from '@/api/base/process';
import { selectDeviceTypeGet } from '@/api/base/devic-type';
import { selectWorkshopGet } from '@/api/base/workshop';

const formRef = ref(null);
const visible = ref(false);
const data = ref([]);
const chooseRow = ref(null); // 编辑行
const TYPE_STATION = ref([]); // 所有工段
const TYPE_PROCESSNAME = ref([]); // 所有工序
const TYPE_DEVICE = ref([]); // 设备类型
const TYPE_WORKSHOP = ref([]); // 车间
const INITIAL_DATA = {
  deviceNumber: '', // 设备号
  deviceId: '', // 设备id
  deviceType: null, // 设备类型
  workshopId: null, // 车间
  stationIds: [], // 工段
  processIds: [], // 工序
  power: '', // 功率
  id: null,
};
const drawer = ref(`新增设备`);
const pagination = ref({
  pageSize: 5,
  total: 0,
  current: 0,
});
const rules = {
  deviceNumber: [{ required: true, message: '设备号必填' }],
  deviceType: [{ required: true, message: '设备类型必填' }],
  workshopId: [{ required: true, message: '车间必填' }],
  stationIds: [{ required: true, message: '工段必填' }],
  processIds: [{ required: true, message: '工序必填' }],
  power: [{ required: true, message: '功率必填' }],
};
const formData = ref({ ...INITIAL_DATA });

const columns = [
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
  {
    colKey: 'operation',
    title: '操作',
    width: 200,
  },
];
const handleChange = (value) => {
  // 根据工段动态加载工序
  selectProcessGet({ parentIds: value, status: 0 }).then((res) => {
    TYPE_PROCESSNAME.value = res.data;
  });
};
const getSection = (obj) => {
  // 下拉框数据 工段
  selectProcessGet(obj).then((res) => {
    TYPE_STATION.value = res.data;
  });
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
    data.value = list.records;
  });
};
const handleClick = (row) => {
  if (row.deviceNumber) {
    drawer.value = `编辑设备`;
    formData.value.deviceNumber = row.deviceNumber;
    formData.value.deviceId = row.deviceId;
    formData.value.deviceType = Number(row.deviceType);
    formData.value.workshopId = Number(row.workshopId);
    console.log(row.tree.map((item) => item.id));
    formData.value.stationIds = row.tree.map((item) => Number(item.id));
    handleChange(formData.value.stationIds);
    row.tree.forEach((item) => {
      if (item.child) {
        formData.value.processIds = formData.value.processIds.concat(item.child.map((itemRen) => Number(itemRen.id)));
      }
    });
    formData.value.power = row.power;
  } else {
    drawer.value = `新增设备`;
    formData.value.deviceNumber = null;
    formData.value.deviceId = null;
    formData.value.deviceType = null;
    formData.value.workshopId = null;
    formData.value.stationIds = [];
    formData.value.processIds = [];
    formData.value.power = null;
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
      deviceInfoListAddOrUpdate(formData.value).then((res) => {
        if (type) {
          MessagePlugin.success('新增成功');
          if (type === 1) {
            formData.value.deviceNumber = '';
            formData.value.deviceId = '';
            formData.value.deviceType = '';
            formData.value.workshopId = '';
            formData.value.stationIds = [];
            formData.value.processIds = [];
            formData.value.power = '';
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
    data.value.forEach((item) => {
      if (item === row) {
        item.status = status;
      }
    });
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
  });
};
onMounted(() => {
  selectDeviceTypeGet({ parentIds: [0], status: 0 }).then((res) => {
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
a.disabled {
  pointer-events: none;
  filter: alpha(opacity=50); /*IE滤镜，透明度50%*/
  -moz-opacity: 0.5; /*Firefox私有，透明度50%*/
  opacity: 0.5; /*其他，透明度50%*/
  color: rgb(153, 153, 153);
}
</style>
