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
              :rules="[v => !!v || 'Name is required']"
            ></v-text-field>
            <v-text-field
              label="Date of Birth"
              type="date"
              v-model="dob"
              :rules="[v => !!v || 'Date of birth is required']"
              required
            ></v-text-field>
            <v-select
              label="Gender"
              v-model="select"
              :items="genders"
              :rules="[v => !!v || 'Gender is required']"
              required>
            </v-select>
            <v-select
              label="Role"
              v-model="selectRole"
              :items="roles"
              :rules="[v => !!v || 'Role is required']"
              required>
            </v-select>
            <!--<input name="manager"-->
            <!--v-model="manager"-->
            <!--placeholder="manager">-->
            <!--&lt;!&ndash;may have to change this type &ndash;&gt;-->
            <!--<br>-->
            <v-text-field
              label="team"
              v-model="team"
              :rules="[v => !!v || 'Team is required']"
              required
            ></v-text-field>
            <v-text-field
              type="number"
              label="Holiday Allowance"
              v-model="allowance"
              :rules="[v => !!v || 'Holiday Allowance is required']"
              required
            ></v-text-field>
            <v-text-field
              label="Job Description"
              v-model="job"
              :rules="[v => !!v || 'Job description is required']"
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
          <div class="error-msg" v-html="error"></div>
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


<!--everything inside this script tag is the
controller and you can bind the html to it-->
<script>
/* eslint-disable */

import VToolbar from 'vuetify/src/components/VToolbar/VToolbar';
import AuthenticationService from '@/services/AuthenticationService';
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
        (v) => !!v || 'Username is required',
        (v) => v && v.length >= 3 || 'Username must be at least 3 characters'
      ],
      passwordRules: [
        (v) => !!v || 'Password is required',
        (v) => v && v.length >= 8 || 'Password must be at least 8 characters'
      ],
      select: null,
      genders: [
        'male',
        'female',
      ],
      selectRole: null,
      roles: [
        'employee',
        'manager',
        'senior management',
        'admin',
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
          role: this.selectRole,
          manager: '5a8083b0e102240bf003969c',
          team: this.team,
          allowance: this.allowance,
          taken: 0,
          dates: [],
          job: this.job,
          username: this.username,
          password: this.password,
        });
      } catch (error) {
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
  .error-msg {
    color: red;
  }
</style>
