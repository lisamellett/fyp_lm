<template>
  <v-layout column>
    <v-flex xs12>
      <v-alert v-if="selectRole === 'senior manager'" type="warning" value="true">
        If this user wishes to be their own manager, an admin will have to do this once they are registered
      </v-alert>
    </v-flex>
    <v-flex>
      <div class="white elevation-2">
        <v-toolbar flat dense class="blue darken-2" dark>
          <v-toolbar-title>Register a New User</v-toolbar-title>
        </v-toolbar>
        <div class="pl-4 pr-4 pt-2 pb-2">
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-layout row wrap>
              <v-flex xs6>
              <v-flex xs12 class="px-2">
            <v-text-field
              label="Name"
              v-model="name"
              :rules="[v => !!v || 'Name is required']"
            ></v-text-field>
              </v-flex>
              <v-flex xs12 class="px-2">
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
              </v-flex>
              <v-flex xs12 class="px-2">
            <v-select
              label="Gender"
              v-model="select"
              :items="genders"
              :rules="[v => !!v || 'Gender is required']"
              required>
            </v-select>
              </v-flex>
              <v-flex xs12 class="px-2">
            <v-select
              label="Role"
              v-model="selectRole"
              :items="roles"
              :rules="[v => !!v || 'Role is required']"
              required>
            </v-select>
              </v-flex>

            <!--<input name="manager"-->
            <!--v-model="manager"-->
            <!--placeholder="manager">-->
            <!--&lt;!&ndash;may have to change this type &ndash;&gt;-->
            <!--<br>-->
                <v-flex xs12 class="px-2">
            <v-select
              label="Team"
              v-model="selectManager"
              :items="managers"
              item-text="team"
              return-object
              autocomplete
              :rules="[v => !!v || 'Team is required']"
              required>
            </v-select>
              </v-flex>
              <v-flex xs12 class="px-2" v-if="selectRole === 'manager' || selectRole === 'senior manager'">
            <v-text-field
              label="Team To Manage"
              v-model="team"
              :rules="[v => !!v || 'Team is required']"
              required
            ></v-text-field>
              </v-flex>
              <v-flex xs12 class="px-2">
            <v-text-field
              type="number"
              label="Holiday Allowance"
              v-model="allowance"
              :rules="[v => !!v || 'Holiday Allowance is required']"
              required
            ></v-text-field>
              </v-flex>
              <v-flex xs12 class="px-2">
            <v-text-field
              label="Job Title"
              v-model="title"
              :rules="[v => !!v || 'Job title is required']"
              required
            ></v-text-field>
              </v-flex>
              </v-flex>
              <v-flex xs6 class="px-2">
              <v-flex xs12 class="px-2">
            <v-text-field
              label="Email Address"
              v-model="email"
              :rules="emailRules"
              required
            ></v-text-field>
              </v-flex>
                <v-flex xs12 class="px-2">
                  <v-text-field
                    label="Address"
                    v-model="address"
                    :rules="[v => !!v || 'Address is required']"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 class="px-2">
                  <v-text-field
                    label="Phone"
                    v-model="phone"
                    :rules="[v => !!v || 'Phone number is required']"
                    required
                  ></v-text-field>
                </v-flex>
                <v-layout row wrap xs12 class="px-2">
                  <v-flex xs2 class="caption grey--text">Next of Kin</v-flex>
                  <v-flex xs10>
                  <v-text-field
                    label="Name"
                    v-model="kinName"
                    :rules="[v => !!v || 'Name of next of kin is required']"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs10 offset-xs2>
                  <v-text-field
                    label="Contact Number"
                    v-model="kinNum"
                    :rules="[v => !!v || 'Number of next of kin is required']"
                    required
                  ></v-text-field>
                  </v-flex>
                </v-layout>
              <v-flex xs12 class="px-2">
            <v-text-field
              label="username"
              v-model="username"
              :rules="usernameRules"
              :counter="20"
              required
            ></v-text-field>
              </v-flex>
              <v-flex xs12 class="px-2">
            <v-text-field
              label="password"
              v-model="password"
              :rules="passwordRules"
              :counter="20"
              required
            ></v-text-field>
              </v-flex>
              <v-flex xs12 class="px-2">
          <div class="error-msg" v-html="error"></div>
          <br>
              </v-flex>
                <v-flex xs4 offset-xs8>
                  <v-btn class="blue darken-2" @click="register" :disabled="!valid" dark>Register User</v-btn>
                </v-flex>
              </v-flex>
<!--v-model is a two way binding that basically says set the input to whatever
            those values are in the controller-->

<!--we want register method to be called when button is clicked-->
            </v-layout>
          </v-form>
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
import AuthenticationService from '../services/AuthenticationService';
import VTextField from 'vuetify/es5/components/VTextField/VTextField';
import VSelect from "vuetify/es5/components/VSelect/VSelect";
import UsersService from '../services/UsersService';

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
      address: '',
      phone: '',
      kinName: '',
      kinNum: '',
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
        'senior manager',
        'admin',
      ],
      selectManager: null,
      managers: [],
      selectTeam: null,
    }
  },
  watch: {
    menu (val) {
      val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))
    }
  },
  async created() {
    this.managers = (await UsersService.getManagers()).data.managers;
  },
  methods: {
    async register() {
      console.log(this.role);
      if ((this.selectRole === 'employee') || (this.selectRole === 'admin')) {
        this.team = this.selectManager.team;
        console.log('HERE');
      }
      console.log('team', this.team);
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
          address: this.address,
          phone: this.phone,
          kinName: this.kinName,
          kinNum: this.kinNum,
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
