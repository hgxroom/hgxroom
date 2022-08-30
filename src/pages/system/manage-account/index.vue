<template>
  <div class="app-container table-page">
    <t-table row-key="id" :data="data" :columns="columns" :pagination="pagination" @change="handlePageChange"></t-table>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, onBeforeMount } from 'vue';
import { getAccoutnLists } from '@/api/system/manage-accoutn';
// import { showMessage } from '@/utils/notice';
import { useUserStore } from '@/store';

const userStore = useUserStore();

const { roleId } = userStore.userInfo;

const companyType = ref(1);
const data = ref([]);
const columns = ref([
  {
    colKey: 'compName',
    title: '公司名称',
  },
  {
    colKey: 'compType',
    title: '公司类型',
  },
  {
    colKey: 'companyId',
    title: '公司id',
  },
  {
    colKey: 'email',
    title: '用户邮箱',
  },
  {
    colKey: 'id',
    title: '用户ID',
  },
  {
    colKey: 'mobile',
    title: '手机号码',
  },
  {
    colKey: 'nickname',
    title: '用户昵称',
  },
  {
    colKey: 'remark',
    title: '备注',
  },
  {
    colKey: 'roleId',
    title: '权限角色',
  },
  {
    colKey: 'status',
    title: '帐号状态',
  },
  {
    colKey: 'status',
    title: '状态',
  },
  {
    colKey: 'username',
    title: '用户账号',
  },
]);
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

const getList = (obj: object) => {
  getAccoutnLists(obj).then((res) => {
    console.log(res);
  });
};
const handlePageChange = (changeParams) => {
  const { current, pageSize } = changeParams.pagination;
  getList({ page: current, size: pageSize, companyType: companyType.value });
};
onBeforeMount(() => {
  // 挂载之前调整，不然会报错
  if (roleId === 1) {
    columns.value.push({
      colKey: 'operation',
      title: '操作',
    });
  }
});
onMounted(() => {
  getList({ page: pagination.value.current, size: pagination.value.pageSize, companyType: companyType.value });
});
</script>
