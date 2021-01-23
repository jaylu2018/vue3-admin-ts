<template>
  <sb-btn icon="delete" type='danger' @click="$emit('click')">
    <slot>删除</slot>
  </sb-btn>
</template>
