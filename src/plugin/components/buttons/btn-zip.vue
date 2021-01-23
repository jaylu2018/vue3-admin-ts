<template>
  <sb-btn icon="file-zip" ghost @click="$emit('click')">
    <slot>导出ZIP</slot>
  </sb-btn>
</template>
