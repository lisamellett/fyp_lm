// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import 'vuetify/dist/vuetify.min.css';
import 'vuetify/src/stylus/main.styl';

import store from '@/store/store';

import Vue from 'vue';
// import Vuetify from 'vuetify';

import { sync } from 'vuex-router-sync';

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
  VTabs,
  VCard,
  VDataTable,
  VPagination,
  VTooltip,
  VTextField,
  VAlert,
  VDialog,
  VIcon,
  VDatePicker,
  VStepper,
  VDivider,
  VRadioGroup,
  VSlider,
  VSubheader,
  VExpansionPanel,
  VParallax,
} from 'vuetify';

import App from './App';
import router from './router';

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
    VTabs,
    VCard,
    VDataTable,
    VPagination,
    VTooltip,
    VTextField,
    VAlert,
    VDialog,
    VIcon,
    VDatePicker,
    VStepper,
    VDivider,
    VRadioGroup,
    VSlider,
    VSubheader,
    VExpansionPanel,
    VParallax,
  },
});

sync(store, router);
// whenever the router changes then the value of the router
// and the params in the store will also change
// eg. const userId = this.$store.state.route.params.userId

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
