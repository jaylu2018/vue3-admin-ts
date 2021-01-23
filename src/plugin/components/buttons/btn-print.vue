<template>
  <sb-btn icon="printer" ghost @click="$emit('click')">
    <slot>打印</slot>
  </sb-btn>
</template>
