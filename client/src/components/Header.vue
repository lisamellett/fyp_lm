<template>
  <v-toolbar fixed class="cyan" dark>

    <v-toolbar-title class="mr4">
      <span
        class="home"
        @click="navigateTo({name: 'root'})">
        FYP APP
      </span>
    </v-toolbar-title>

    <v-toolbar-items>
      <v-btn
        v-if="$store.state.isUserLoggedIn"
        class="cyan" flat dark
        @click="navigateTo({name: 'calendar'})">
        Calendar
      </v-btn>
    </v-toolbar-items>
    <v-toolbar-items>
      <v-btn
        v-if="$store.state.isUserLoggedIn"
        class="cyan" flat dark>
        Performance
      </v-btn>
    </v-toolbar-items>
    <v-toolbar-items>
      <v-btn
        v-if="$store.state.isUserLoggedIn"
        class="cyan" flat dark>
        Stats
      </v-btn>
    </v-toolbar-items>


    <v-spacer></v-spacer>


    <v-toolbar-items>
      <v-btn
        v-if="$store.state.isUserLoggedIn && $store.state.user.role == 'admin'"
        flat dark @click="navigateTo({name: 'employees'})">
        Employees
      </v-btn>
    </v-toolbar-items>
    <v-toolbar-items>
      <v-btn
        v-if="!$store.state.isUserLoggedIn"
        flat dark @click="navigateTo({name: 'login'})">
        Login
      </v-btn>
    </v-toolbar-items>

    <v-toolbar-items>
      <v-btn
        v-if="$store.state.isUserLoggedIn && $store.state.user.role == 'admin'"
        flat dark @click="navigateTo({name: 'register'})">
        Register a User
      </v-btn>
    </v-toolbar-items>

    <v-toolbar-items>
      <v-btn
        v-if="$store.state.isUserLoggedIn"
        flat dark @click="logout">
        Log Out
      </v-btn>
    </v-toolbar-items>

  </v-toolbar>
</template>

<script>
import VToolbar from 'vuetify/src/components/VToolbar/VToolbar';

export default {
  components: {
    VToolbar,
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
    logout() {
      this.$store.dispatch('setToken', null);
      this.$store.dispatch('setUser', null);
      this.$router.push({
        name: 'root',
      });
    },
  },
};
</script>

<style scoped="">
  .home {
    cursor: pointer;

  }

  .home:hover {
    color: lightcyan;
  }
</style>
