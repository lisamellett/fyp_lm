<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <div class="white elevation-2">
        <v-toolbar flat dense class="cyan" dark>
          <v-toolbar-title class="title">Register a New User</v-toolbar-title>
        </v-toolbar>
        <div class="pl-4 pr-4 pt-2 pb-2">
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-text-field
              label="name"
              v-model="name"
              :rules="commonRules"
              required
            ></v-text-field>
            <v-text-field
              label="Date of Birth"
              type="date"
              v-model="dob"
              :rules="commonRules"
              required
            ></v-text-field>
            <v-select
              label="Gender"
              v-model="select"
              :items="genders"
              required>
            </v-select>
            <v-text-field
              label="role"
              v-model="role"
              :rules="commonRules"
              required
            ></v-text-field>
            <!--<input name="manager"-->
            <!--v-model="manager"-->
            <!--placeholder="manager">-->
            <!--&lt;!&ndash;may have to change this type &ndash;&gt;-->
            <!--<br>-->
            <v-text-field
              label="team"
              v-model="team"
              :rules="commonRules"
              required
            ></v-text-field>
            <v-text-field
              type="number"
              label="allowance"
              v-model="allowance"
              :rules="commonRules"
              required
            ></v-text-field>
            <v-text-field
              label="job"
              v-model="job"
              :rules="commonRules"
              required
            ></v-text-field>
            <v-text-field
              label="username"
              v-model="username"
              :rules="usernameRules"
              :counter="20"
              required
            ></v-text-field>
            <v-text-field
              label="password"
              v-model="password"
              :rules="passwordRules"
              required
            ></v-text-field>
          <div class="error" v-html="error"></div>
          <br>
<!--v-model is a two way binding that basically says set the input to whatever
            those values are in the controller-->

<!--we want register method to be called when button is clicked-->
          </v-form>
          <v-btn class="cyan" @click="register" :disabled="!valid" dark>Register User</v-btn>
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>
<!--<template>-->
  <!--<div>-->
    <!--<h1>Register</h1>-->

    <!--<input name="name"-->
           <!--v-model="name"-->
           <!--placeholder="name">-->
    <!--<br>-->
    <!--<input type="date"-->
           <!--name="dob"-->
           <!--v-model="dob"-->
           <!--placeholder="date of birth">-->
    <!--<br>-->
    <!--<input name="gender"-->
           <!--v-model="gender"-->
           <!--placeholder="gender">-->
    <!--<br>-->
    <!--<input name="role"-->
           <!--v-model="role"-->
           <!--placeholder="role">-->
    <!--<br>-->
    <!--&lt;!&ndash;<input name="manager"&ndash;&gt;-->
           <!--&lt;!&ndash;v-model="manager"&ndash;&gt;-->
           <!--&lt;!&ndash;placeholder="manager">&ndash;&gt;-->
    <!--&lt;!&ndash;&lt;!&ndash;may have to change this type &ndash;&gt;&ndash;&gt;-->
    <!--&lt;!&ndash;<br>&ndash;&gt;-->
    <!--<input name="team"-->
           <!--v-model="team"-->
           <!--placeholder="team">-->
    <!--<br>-->
    <!--<input type="number"-->
           <!--name="allowance"-->
           <!--v-model="allowance"-->
           <!--placeholder="allowance">-->
    <!--<br>-->
    <!--<input name="job"-->
           <!--v-model="job"-->
           <!--placeholder="job description">-->
    <!--<br>-->
    <!--<input name="username"-->
           <!--v-model="username"-->
           <!--placeholder="username">-->
    <!--<br>-->
    <!--<input type="password"-->
           <!--name="password"-->
           <!--v-model="password"-->
           <!--placeholder="password">-->
    <!--<br>-->
    <!--&lt;!&ndash;v-model is a two way binding that basically says set the input to whatever-->
    <!--those values are in the controller&ndash;&gt;-->
    <!--<button @click="register">Register</button>-->
    <!--&lt;!&ndash;we want register method to be called when button is clicked&ndash;&gt;-->

  <!--</div>-->
<!--</template>-->


<!--everything inside this script tag is the
controller and you can bind the html to it-->
<script>
/* eslint-disable */

import VToolbar from 'vuetify/src/components/VToolbar/VToolbar';
import AuthenticationService from '@/services/AuthenticationService';
import VTextField from 'vuetify/es5/components/VTextField/VTextField';
import VSelect from "vuetify/es5/components/VSelect/VSelect";
// import VBtn from 'vuetify/src/components/VBtn/VBtn';

export default {
  components: {
    VSelect,
    VTextField,
    VToolbar },
  data() {
    return {
      valid: true,
      name: '',
      dob: '',
      gender: '',
      role: '',
      team: '',
      manager: '',
      allowance: '',
      job: '',
      username: '',
      password: '',
      error: null,
      usernameRules: [
        (v) => !!v || 'Name is required',
        (v) => v && v.length >= 3 || 'User Name must be at least than 3 characters'
      ],
      commonRules: [
        (v) => !!v || 'Required',
      ],
      passwordRules: [
        (v) => !!v || 'Password is required',
        (v) => v && v.length >= 3 || 'Password must be at least than 3 characters'
      ],
      select: null,
      genders: [
        'male',
        'female',
      ],
    }
  },
  methods: {
    async register() {
      try {
        await AuthenticationService.register({
          name: this.name,
          dob: this.dob,
          gender: this.select,
          role: this.role,
          manager: '5a7c78ff92cc973718481a24',
          team: this.team,
          allowance: this.allowance,
          taken: 0,
          dates: [],
          job: this.job,
          username: this.username,
          password: this.password,
        });
        // console.log(response.data);
      } catch (error) {
        // console.log('here');
        this.error = error.response.data.error;
      }
    },
  },
};

// _id: mongoose.Schema.Types.ObjectId,
//  name: String,
//  dob: Date,
//  gender: String,
//  role: String,
//  manager: mongoose.Schema.Types.ObjectId, // possibly just change this to team
//  team: String,
//  allowance: Number,
//  taken: Number,
//  dates: Array,
//  job: String,
//  username: String,
//  password: String,
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
