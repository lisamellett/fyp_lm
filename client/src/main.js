// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import 'vuetify/src/stylus/main.styl';

import store from '@/store/store';

import Vue from 'vue';
// import Vuetify from 'vuetify';
import App from './App';
import router from './router';
import { sync } from 'vuex-router-sync';
import 'vuetify/dist/vuetify.min.css';

import {
  Vuetify,
  VApp,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VToolbar,
  VForm,
  VSelect,
  VMenu,
  VGrid,
} from 'vuetify';

require('vuetify/src/stylus/app.styl');

Vue.config.productionTip = false;


Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VToolbar,
    VForm,
    VSelect,
    VMenu,
    VGrid, // had to import this to get v-spacer, v-flex to work
  },
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
