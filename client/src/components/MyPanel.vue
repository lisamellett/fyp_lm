<template>
  <div class="white elevation-2">
    <v-toolbar flat dense class="cyan" dark>
      <v-toolbar-title class="title">{{title}}</v-toolbar-title>
    </v-toolbar>
    <div class="pl-4 pr-4 pt-2 pb-2">
      <slot>
        no slot content found
      </slot>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
export default {
  props: [
    'title',
  ],
};
</script>

<style scoped>
</style>
