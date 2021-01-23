<template>
  <sb-btn icon="file-excel" ghost @click="$emit('click')">
    <slot>导出Excel</slot>
  </sb-btn>
</template>
