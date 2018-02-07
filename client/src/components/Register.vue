<template>
  <div>
    <h1>Register</h1>

    <input type="email"
           name="email"
           v-model="email"
           placeholder="email">
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
      email: '',
      password: '',
    };
  },
  methods: {
    async register() {
      const response = await AuthenticationService.register({
        email: this.email,
        password: this.password,
      });
      console.log(response.data);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
