<template>
  <div class="white elevation-2">
    <v-alert type="success"  dismissible v-model="successAlert">
      The review has successfully been added
    </v-alert>
    <v-alert type="error" dismissible :value="errorAlert">
      Unable to add review
    </v-alert>
    <v-toolbar flat dense class="cyan" dark>
      <v-toolbar-title class="title">Add Performance Review</v-toolbar-title>
    </v-toolbar>
    <div>
      <v-stepper v-model="e1">
        <v-stepper-header>
          <v-stepper-step step="1" :complete="e1 > 1">Pick Employee</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="2" :complete="e1 > 2">Review</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="3" :complete="e1 > 3">Additional Feedback</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="4">Submit</v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content step="1">
            <v-card class="mb-5" height="200px">
              <v-radio-group v-model="selectedEmployee">
                <v-radio
                  v-for="n in employees"
                  :key="n._id"
                  :label="`${n.name}`"
                  :value="n"
                ></v-radio>
              </v-radio-group>
              <span v-if="selectedEmployee">Picked: {{ selectedEmployee.name }}</span>
              <div class="error-msg" v-html="error"></div>
            </v-card>
            <v-btn color="primary" @click="continuePressed">Continue</v-btn>
            <v-btn flat @click="cancelPressed">Cancel</v-btn>
          </v-stepper-content>
          <v-stepper-content step="2">
            <v-card class="mb-5" height="350px">
              <h3 align="left" v-if="selectedEmployee">Please rate {{ selectedEmployee.name }} on the following:</h3>
              <v-layout row wrap>
                <v-flex xs9>
                  <v-slider label="Communication" :max="10" v-model="communication"></v-slider>
                </v-flex>
                <v-flex xs3>
                  <v-text-field v-model="communication" type="number"></v-text-field>
                </v-flex>
                <v-flex xs9>
                  <v-slider label="Cooperation" :max="10" v-model="cooperation"></v-slider>
                </v-flex>
                <v-flex xs3>
                  <v-text-field v-model="cooperation" type="number"></v-text-field>
                </v-flex>
                <v-flex xs9>
                  <v-slider label="Punctuality" :max="10" v-model="punctuality"></v-slider>
                </v-flex>
                <v-flex xs3>
                  <v-text-field v-model="punctuality" type="number"></v-text-field>
                </v-flex>
                <v-flex xs9>
                  <v-slider label="Quality of Work " :max="10" v-model="qualityOfWork"></v-slider>
                </v-flex>
                <v-flex xs3>
                  <v-text-field v-model="qualityOfWork" type="number"></v-text-field>
                </v-flex>
              </v-layout>
            </v-card>
            <v-btn color="primary" @click.native="e1=3">Continue</v-btn>
            <v-btn flat @click="cancelPressed">Cancel</v-btn>
          </v-stepper-content>
          <v-stepper-content step="3">
            <v-card class="mb-5" height="200px">
              <v-layout row>
                <v-flex xs2>
                  <v-subheader v-if="selectedEmployee">Provide {{ selectedEmployee.name }} with some feedback:</v-subheader>
                </v-flex>
                <v-flex xs10>
                  <v-text-field
                    name="feedback"
                    label="Feedback"
                    v-model="feedback"
                    multi-line
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-card>
            <v-btn color="primary" @click.native="e1 = 4">Continue</v-btn>
            <v-btn flat @click="cancelPressed">Cancel</v-btn>
          </v-stepper-content>
          <v-stepper-content step="4">
            <v-card v-if="selectedEmployee" class="mb-5" height="200px">
              <h3>Review Ready</h3>
              <v-layout row wrap>
                <v-flex xs12>Employee: {{ selectedEmployee.name }}</v-flex>
                <v-flex xs12>Communication: {{ communication }}</v-flex>
                <v-flex xs12>Cooperation: {{cooperation}}</v-flex>
                <v-flex xs12>Punctuality: {{punctuality}}</v-flex>
                <v-flex xs12>Quality of Work: {{qualityOfWork}}</v-flex>
                <v-flex xs12>Feedback: {{feedback}}</v-flex>
              </v-layout>
            </v-card>
            <v-btn color="primary" @click="submitPressed">Submit</v-btn>
            <v-btn flat @click="cancelPressed">Cancel</v-btn>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </div>
  </div>
</template>

<script>
import UsersService from '@/services/UsersService';
import store from '../store/store';

export default {
  data () {
    return {
      e1: 0,
      employees: [],
      selectedEmployee: null,
      communication: 0,
      cooperation: 0,
      punctuality: 0,
      qualityOfWork: 0,
      feedback: null,
      error: null,
      successAlert: false,
      errorAlert: false,
    }
  },
  async mounted() {
    // do a request to the backend for all the users
    // so when the page is loaded do a request to backend - may need to do this fo rmanagers register page
    this.employees = (await UsersService.getManagersEmployees(store.state.user._id)).data.employees;
    console.log(this.employees);
    // this will do a get request the moment the page is mounted
  },
  methods: {
    continuePressed() {
      if (!this.selectedEmployee) {
        this.error = "You must select an employee to continue";
      } else {
        this.e1 = 2;
      }
    },
    cancelPressed() {
      this.e1 = 1;
      this.selectedEmployee = null;
      this.communication = 0;
      this.cooperation = 0;
      this.punctuality = 0;
      this.qualityOfWork = 0;
      this.feedback = null;
      this.error = null;
    },
    async submitPressed() {
      try {
        const review = {
          authorId: store.state.user._id,
          communication: this.communication,
          cooperation: this.cooperation,
          punctuality: this.punctuality,
          qualityOfWork: this.qualityOfWork,
          feedback: this.feedback,
          date: new Date(),
        };
        await UsersService.addReview(this.selectedEmployee._id, review);
        this.e1 = 1;
        this.selectedEmployee = null;
        this.communication = 0;
        this.cooperation = 0;
        this.punctuality = 0;
        this.qualityOfWork = 0;
        this.feedback = null;
        this.error = null;
        this.successAlert = true;
      } catch (err) {
        this.errorAlert = true;
      }
    }
  }
}
</script>

<style scoped>
  .error-msg {
    color: red;
  }
</style>
