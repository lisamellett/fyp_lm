<template>
      <div class="white elevation-2">
        <v-toolbar flat dense class="blue darken-2" dark>
          <v-toolbar-title>Login</v-toolbar-title>
        </v-toolbar>
        <div class="pl-4 pr-4 pt-2 pb-2">
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-text-field
              prepend-icon="person"
              label="username"
              v-model="username"
              :rules="usernameRules"
              required
            ></v-text-field>
            <v-text-field
              prepend-icon="lock"
              label="password"
              type="password"
              v-model="password"
              :rules="passwordRules"
              required
            ></v-text-field>
            <div class="error-msg" v-html="error"></div>
            <br>
            <!--v-model is a two way binding that basically says set the input to whatever
                        those values are in the controller-->

            <!--we want register method to be called when button is clicked-->
          </v-form>
            <v-btn class="blue darken-2" @click="login" :disabled="!valid" dark>Login</v-btn>
        </div>
      </div>
</template>


<!--everything inside this script tag is the
controller and you can bind the html to it-->
<script>
/* eslint-disable */

import VToolbar from 'vuetify/src/components/VToolbar/VToolbar';
import AuthenticationService from '../services/AuthenticationService';
import VTextField from 'vuetify/es5/components/VTextField/VTextField';
import VSelect from "vuetify/es5/components/VSelect/VSelect";

export default {
  components: {
    VSelect,
    VTextField,
    VToolbar,},
  data() {
    return {
      valid: true,
      username: '',
      password: '',
      error: null,
      usernameRules: [
        (v) => !!v || 'Username is required'],
        //   (v) => v && v.length >= 3 || 'Username must be at least than 3 characters'
        // ],
      passwordRules: [
        (v) => !!v || 'Password is required'],
        //   (v) => v && v.length >= 3 || 'Password must be at least than 3 characters'
        // ],
    }
  },
  methods: {
    async login() {
      try {
        const response = await AuthenticationService.login({
          username: this.username,
          password: this.password,
        });
        this.$store.dispatch('setToken', response.data.token);
        this.$store.dispatch('setUser', response.data.user);
        this.$router.push('metrics');
      } catch (error) {
        this.error = error.response.data.error;
      }
    },
  },
};

</script>

<style scoped>
  .error-msg {
    color: red;
  }
</style>
