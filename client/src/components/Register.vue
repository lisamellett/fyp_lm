<template>
  <div>
    <h1>Register</h1>

    <input name="name"
           v-model="name"
           placeholder="name">
    <br>
    <input type="date"
           name="dob"
           v-model="dob"
           placeholder="date of birth">
    <br>
    <input name="gender"
           v-model="gender"
           placeholder="gender">
    <br>
    <input name="role"
           v-model="role"
           placeholder="role">
    <br>
    <!--<input name="manager"-->
           <!--v-model="manager"-->
           <!--placeholder="manager">-->
    <!--&lt;!&ndash;may have to change this type &ndash;&gt;-->
    <!--<br>-->
    <input name="team"
           v-model="team"
           placeholder="team">
    <br>
    <input type="number"
           name="allowance"
           v-model="allowance"
           placeholder="allowance">
    <br>
    <input name="job"
           v-model="job"
           placeholder="job description">
    <br>
    <input name="username"
           v-model="username"
           placeholder="username">
    <br>
    <input type="password"
           name="password"
           v-model="password"
           placeholder="password">
    <br>
    <!--v-model is a two way binding that basically says set the input to whatever
    those values are in the controller-->
    <button @click="register">Register</button>
    <!--we want register method to be called when button is clicked-->

  </div>
</template>

<!--everything inside this script tag is the
controller and you can bind the html to it-->
<script>
import AuthenticationService from '@/services/AuthenticationService';

export default {
  data() {
    return {
      name: '',
      dob: '',
      gender: '',
      role: '',
      team: '',
      allowance: '',
      job: '',
      username: '',
      password: '',
    };
  },
  methods: {
    async register() {
      const response = await AuthenticationService.register({
        name: this.name,
        dob: this.dob,
        gender: this.gender,
        role: this.role,
        manager: '',
        team: this.team,
        allowance: this.allowance,
        taken: 0,
        dates: [],
        job: this.job,
        username: this.username,
        password: this.password,
      });
      console.log(response.data);
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
