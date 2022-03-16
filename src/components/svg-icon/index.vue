<template>
  <svg aria-hidden="true" :width="width" :height="height">
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

<script lang="ts" setup>
import { computed, withDefaults } from 'vue';

interface Props {
  prefix?: string;
  name?: string;
  color?: string;
  width?: string;
  height?: string;
}

const props = withDefaults(defineProps<Props>(), {
  prefix: 'icon',
  name: '',
  color: '#000',
  width: '24',
  height: '24',
});

const symbolId = computed(() => `#${props.prefix}-${props.name}`);
</script>
