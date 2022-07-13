<template>
  <div class="app-container table-page">
    <div class="table-page-top">
      <div class="table-page-top__title">
        <div>工序看板</div>
      </div>
    </div>
    <t-table
      row-key="id"
      :fixed-rows="[1, 0]"
      :data="dataList"
      :columns="columns"
      :pagination="pagination"
      @change="rehandleChange"
    ></t-table>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Ref } from 'vue';
import { getWorkSequence } from '@/api/production/work-sequence';

const dataList = ref([]);
type paginationType = {
  current: number;
  pageSize: number;
  total?: number;
  size?: string;
  theme?: string;
};
const pagination: Ref<paginationType> = ref({
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
const columns = [
  {
    colKey: 'id',
    title: 'ID',
    fixed: 'left',
  },
  {
    colKey: 'deviceName',
    title: '工序',
  },
  {
    colKey: 'createTime',
    title: '时间',
  },
];

const getList = (obj = pagination.value) => {
  getWorkSequence({ page: obj.current, size: obj.pageSize }).then((res) => {
    console.log(res);
    dataList.value = res.data.records;
    pagination.value = {
      ...pagination.value,
      ...obj,
      total: res.data.total,
      pageSize: res.data.size,
    };
  });
};

const rehandleChange = (changeParams) => {
  const { current, pageSize } = changeParams.pagination;
  const data = {
    current,
    pageSize,
  };
  getList(data);
};
onMounted(() => {
  getList();
});
</script>
