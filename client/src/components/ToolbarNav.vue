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
      <span class="hidden-sm-and-down">LM Soltutions</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon @click.stop="right=!right">
      <v-icon>notifications</v-icon>
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
    >
      <notifications></notifications>
    </v-navigation-drawer>
  </div>
</template>

<script>
import store from '@/store/store';
// import Toolbar from '@/components/MyToolbar';

export default {
  components: {
  },
  data() {
    return {
      dialog: false,
      drawer: null,
      items: this.getItems(),
      right: null,
    }
  },
  methods: {
    test(i) {
      console.log(i.model);
      i.model = !i.model;
      console.log(i.model);
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
            {icon: 'show_chart', text: 'Metrics'},
            {icon: 'date_range', text: 'Calendar'},
            {
              icon: 'keyboard_arrow_up', 'icon-alt': 'keyboard_arrow_down',
              text: 'Performance',
              model: false,
              children: [
                {icon: 'flash_on', text: 'My Performance', destination: 'myPerformance'},
                {icon: 'people_outline', text: 'Employee Performance (read only)'}
              ]
            },{
              icon: 'keyboard_arrow_up', 'icon-alt': 'keyboard_arrow_down',
              text: 'Employees',
              model: false,
              children: [
                {icon: 'people', text: 'View/Edit Employees', destination: 'employees'},
                {icon: 'person_add', text: 'Register an Employee', destination: 'register'},
              ]
            },
            {icon: 'settings', text: 'Settings'},
            {icon: 'account_circle', text: 'Profile'},
            // {icon: 'power_settings_new', text: 'Logout'},
          ];
        case "manager":
          return [
            {icon: 'show_chart', text: 'Metrics'},
            {icon: 'perm_contact_calendar', text: 'Calendar'},
            {
              icon: 'keyboard_arrow_up', 'icon-alt': 'keyboard_arrow_down',
              text: 'Performance',
              model: true,
              children: [
                {icon: 'flash_on', text: 'My Performance', destination: 'myPerformance'},
                {icon: 'people_outline', text: 'Team Performance', destination: 'performance'}
              ]
            },
            {icon: 'people', text: 'Employees'},
            {icon: 'account_circle', text: 'Profile'},
            // {icon: 'power_settings_new', text: 'Logout'},
          ];
        case "senior manager":
          return [
            {icon: 'show_chart', text: 'Metrics'},
            {icon: 'date_range', text: 'Calendar'},
            {
              icon: 'keyboard_arrow_up', 'icon-alt': 'keyboard_arrow_down',
              text: 'Performance',
              model: true,
              children: [
                {icon: 'flash_on', text: 'My Performance', destination: 'myPerformance'},
                {icon: 'people_outline', text: 'Employee Performance (read only)'}
              ]
            },
            {icon: 'account_circle', text: 'Profile'},
            // {icon: 'power_settings_new', text: 'Logout'},

          ];
        case "employee":
          return [
            {icon: 'show_chart', text: 'Metrics'},
            {icon: 'date_range', text: 'Calendar'},
            {icon: 'flash_on', text: 'Performance', destination: 'myPerformance'},
            {icon: 'account_circle', text: 'Profile'},
            // {icon: 'power_settings_new', text: 'Logout'},
          ];
      }
    },
  },
};
</script>

<style>
</style>
