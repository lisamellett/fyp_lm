<template>
  <div id="app">
    <v-app>

      <v-toolbar
        color="blue darken-3"
        dark
        v-if="!$store.state.isUserLoggedIn"
      >
        <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
          <span class="hidden-sm-and-down">KIN</span>
        </v-toolbar-title>
      </v-toolbar>

      <home v-if="!$store.state.isUserLoggedIn"></home>

      <toolbar-nav v-if="$store.state.isUserLoggedIn"></toolbar-nav>

      <v-footer class="blue darken-2" app fixed>
        <v-layout row wrap align-center>
          <v-flex xs12>
            <div class="white--text ml-3">
              Made with
              <v-icon class="red--text">favorite</v-icon>
              by Lisa Mellett
            </div>
          </v-flex>
        </v-layout>
      </v-footer>


    </v-app>
  </div>
</template>

<script>
/* eslint-disable */
import Home from './components/Home';
import ToolbarNav from './components/ToolbarNav';

export default {
  name: 'App',
  components: {
    ToolbarNav,
    Home,
  }
};
</script>

<style>
</style>
