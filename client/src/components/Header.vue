<template>
  <v-toolbar fixed class="cyan" dark>
    <v-toolbar-title class="mr4">
      FYP APP
    </v-toolbar-title>

    <v-toolbar-items>
      <v-btn class="cyan" flat dark>
        Browse
      </v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn flat dark>Settings</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import VToolbar from 'vuetify/src/components/VToolbar/VToolbar';

export default {
  components: {
    VToolbar,
  },
};
</script>

<style scoped="">
</style>
