<template>
  <div>
  <v-navigation-drawer
    v-if="$store.state.isUserLoggedIn"
    fixed
    :clipped="$vuetify.breakpoint.mdAndUp"
    app
    v-model="drawer"
  >
    <v-list dense>
      <template v-for="item in items">
        <div v-if="item.children">
          <v-list-tile @click="test(item)">
            <v-list-tile-action >
              <v-icon>{{ item.model ? item.icon : item['icon-alt'] }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-group
            v-model="item.model"
            :key="item.text"

            append-icon=""
          >
            <v-list-tile
              v-for="(child, i) in item.children"
              :key="i"
              @click="navigateTo(child.destination)"
            >
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ child.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
        </div>
        <v-list-tile v-else @click="navigateTo(item.destination)" :key="item.text">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ item.text }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>

      <v-list-tile @click="logout">
        <v-list-tile-action>
          <v-icon>power_settings_new</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>
            Logout
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>


  <v-toolbar
    color="blue darken-3"
    dark
    app
    :clipped-left="$vuetify.breakpoint.mdAndUp"
    fixed
  >
    <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <span class="hidden-sm-and-down">{{ $store.state.user.name }} <span class="caption">{{ $store.state.user.role }}</span></span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon @click="getNotifications">
      <v-badge overlap color="red">
        <v-icon>notifications</v-icon>
        <span v-if="this.nots.length > 0" slot="badge">{{ this.nots.length }}</span>
      </v-badge>
    </v-btn>
  </v-toolbar>

  <v-content>
    <v-container fluid>
      <router-view/>
    </v-container>
  </v-content>

    <v-navigation-drawer
      right
      temporary
      v-model="right"
      fixed
      class="blue lighten-5"
    >
      <notifications v-bind:nots="nots"></notifications>
    </v-navigation-drawer>
  </div>
</template>

<script>
/* eslint-disable */
import store from '../store/store';
import Notifications from '../components/Notifications';
import NotificationService from '../services/NotificationService';


export default {
  components: {
    Notifications,
  },
  data() {
    return {
      dialog: false,
      drawer: null,
      items: this.getItems(),
      right: null,
      nots: [],
    }
  },
  async created() {
    this.nots = (await NotificationService.getUserNotifications(store.state.user._id)).data.notifications;
  },
  methods: {
    test(i) {
      i.model = !i.model;
    },
    getNotifications() { // this function updates the nots list
      this.right = !this.right;
      this.apiCall();
    },
    async apiCall() {
      this.nots = (await NotificationService.getUserNotifications(store.state.user._id)).data.notifications;
      this.nots = this.nots.reverse();
    },
    navigateTo(destination) {
      this.$router.push({
        name: destination
      });
    },
    logout() {
      this.$store.dispatch('setToken', null);
      this.$store.dispatch('setUser', null);
      this.$router.push({
        name: 'root',
      });
    },
    getItems() {
      switch (store.state.user.role) {
        case "admin":
          return [
            {icon: 'show_chart', text: 'Metrics', destination: 'metrics'},
            {icon: 'date_range', text: 'Calendar', destination: 'calendar'},
            {icon: 'flash_on', text: 'My Performance', destination: 'myPerformance'},
            {
              icon: 'keyboard_arrow_up', 'icon-alt': 'keyboard_arrow_down',
              text: 'Employees',
              model: false,
              children: [
                {icon: 'people', text: 'View/Edit Employees', destination: 'employees'},
                {icon: 'person_add', text: 'Register an Employee', destination: 'register'},
              ]
            },
            {icon: 'account_circle', text: 'Profile', destination: 'profile'},
            // {icon: 'power_settings_new', text: 'Logout'},
          ];
        case "manager":
          return [
            {icon: 'show_chart', text: 'Metrics', destination: 'metrics'},
            {icon: 'date_range', text: 'Calendar', destination: 'calendar'},
            {
              icon: 'keyboard_arrow_up', 'icon-alt': 'keyboard_arrow_down',
              text: 'Performance',
              model: true,
              children: [
                {icon: 'flash_on', text: 'My Performance', destination: 'myPerformance'},
                {icon: 'people_outline', text: 'Team Performance', destination: 'performance'}
              ]
            },
            {icon: 'people', text: 'Employees', destination: 'employees'},
            {icon: 'account_circle', text: 'Profile', destination: 'profile'},
            // {icon: 'power_settings_new', text: 'Logout'},
          ];
        case "senior manager":
          return [
            {icon: 'show_chart', text: 'Metrics', destination: 'metrics'},
            {icon: 'date_range', text: 'Calendar', destination: 'calendar'},
            {
              icon: 'keyboard_arrow_up', 'icon-alt': 'keyboard_arrow_down',
              text: 'Performance',
              model: true,
              children: [
                {icon: 'flash_on', text: 'My Performance', destination: 'myPerformance'},
                {icon: 'people_outline', text: 'Employee Performance', destination: 'performance'}
              ]
            },
            {icon: 'people', text: 'View Employees', destination: 'employees'},
            {icon: 'account_circle', text: 'Profile', destination: 'profile'},
            // {icon: 'power_settings_new', text: 'Logout'},

          ];
        case "employee":
          return [
            {icon: 'show_chart', text: 'Metrics', destination: 'metrics'},
            {icon: 'date_range', text: 'Calendar', destination: 'calendar'},
            {icon: 'flash_on', text: 'Performance', destination: 'myPerformance'},
            {icon: 'account_circle', text: 'Profile', destination: 'profile'},
            // {icon: 'power_settings_new', text: 'Logout'},
          ];
      }
    },
  },
};
</script>

<style>
</style>
