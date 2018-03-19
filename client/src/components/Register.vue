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
              label="Name"
              v-model="name"
              :rules="[v => !!v || 'Name is required']"
            ></v-text-field>
            <!--<v-text-field-->
              <!--label="Date of Birth"-->
              <!--type="date"-->
              <!--v-model="dob"-->
              <!--:rules="[v => !!v || 'Date of birth is required']"-->
              <!--required-->
            <!--&gt;</v-text-field>-->
            <v-menu
              ref="menu"
              lazy
              :close-on-content-click="false"
              v-model="menu"
              transition="scale-transition"
              offset-y
              full-width
              :nudge-right="40"
              min-width="290px"
            >
              <v-text-field
                slot="activator"
                label="Date of Birth"
                v-model="dob"
                prepend-icon="event"
                readonly
              ></v-text-field>
              <v-date-picker
                ref="picker"
                v-model="dob"
                @change="save"
                min="1950-01-01"
                :max="new Date().toISOString().substr(0, 10)"
              ></v-date-picker>
            </v-menu>
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
            <v-select
              label="Manager"
              v-model="selectManager"
              :items="managers"
              item-text="name"
              return-object
              autocomplete
              :rules="[v => !!v || 'Manager is required']"
              required>
            </v-select>
            <!--<v-select-->
              <!--label="Team"-->
              <!--v-model="selectTeam"-->
              <!--tags-->
              <!--:items="teams"-->
              <!--:rules="[v => !!v || 'Team is required']"-->
              <!--required>-->
            <!--</v-select>-->
            <v-text-field
              label="Team"
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
              label="Job Title"
              v-model="title"
              :rules="[v => !!v || 'Job title is required']"
              required
            ></v-text-field>
            <v-text-field
              label="Email Address"
              v-model="email"
              :rules="emailRules"
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
import UsersService from '@/services/UsersService';

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
      title: '',
      email: '',
      username: '',
      password: '',
      error: null,
      emailRules: [
        (v) => {
          return !!v || 'E-mail is required'
        },
        (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      usernameRules: [
        (v) => !!v || 'Username is required',
        (v) => v && v.length >= 3 || 'Username must be at least 3 characters'
      ],
      passwordRules: [
        (v) => !!v || 'Password is required',
        (v) => v && v.length >= 8 || 'Password must be at least 8 characters'
      ],
      menu: false,
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
      selectManager: null,
      managers: [],
      selectTeam: null,
      teams: ['sales', 'marketing'],
    }
  },
  watch: {
    menu (val) {
      val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))
    }
  },
  async mounted() {
    this.managers = (await UsersService.getManagers()).data.managers;
    console.log(this.managers);
  },
  methods: {
    async register() {
      try {
        await AuthenticationService.register({
          name: this.name,
          dob: this.dob,
          gender: this.select,
          role: this.selectRole,
          manager: this.selectManager._id,
          team: this.team,
          allowance: this.allowance,
          taken: 0,
          dates: [],
          title: this.title,
          reviews: [],
          email: this.email,
          username: this.username,
          password: this.password,
        });
        this.$router.push({
          name: 'employees',
        }); // may want to change this to different location
      } catch (error) {
        this.error = error.response.data.error;
      }
    },
    save(dob) {
      this.$refs.menu.save(dob)
    },
  },
};

</script>

<style scoped>
  .error-msg {
    color: red;
  }
</style>
