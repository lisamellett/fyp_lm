<template>
  <v-toolbar fixed class="cyan" dark>

    <v-toolbar-title class="mr4">
      <router-link
        class="home"
        tag="span"
        :to="{ name: 'root'}">
        FYP APP
      </router-link>
    </v-toolbar-title>

    <v-toolbar-items>
      <v-btn
        v-if="$store.state.isUserLoggedIn"
        class="cyan" flat dark
        :to="{ name:'calendar'}">
        Calendar
      </v-btn>
    </v-toolbar-items>
    <v-toolbar-items>
      <v-btn
        v-if="$store.state.isUserLoggedIn"
        class="cyan" flat dark
        :to="{ name:'performance'}">
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


    <v-spacer>

      <v-toolbar-items>
        <router-link
          tag="span"
          :to="{ name: 'profile'}"
          v-if="$store.state.isUserLoggedIn"
          class="cyan" flat dark>
          <v-icon>account_circle</v-icon>
        </router-link>
      </v-toolbar-items>

    </v-spacer>


    <v-toolbar-items>
      <v-btn
        v-if="$store.state.isUserLoggedIn && $store.state.user.role == 'admin'"
        flat dark
        :to="{name: 'employees'}">
        Employees
      </v-btn>
    </v-toolbar-items>
    <v-toolbar-items>
      <v-btn
        v-if="!$store.state.isUserLoggedIn"
        flat dark
        :to="{name: 'login'}">
        Login
      </v-btn>
    </v-toolbar-items>

    <v-toolbar-items>
      <v-btn
        v-if="$store.state.isUserLoggedIn && $store.state.user.role == 'admin'"
        flat dark
        :to="{name: 'register'}">
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
