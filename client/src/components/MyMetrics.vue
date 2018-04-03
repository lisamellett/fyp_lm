<template>
  <v-layout row wrap class="blue lighten-5">
    <v-flex class="px-3 py-3" xs6>
      <v-card>
        <v-card-title class="grey--text py-2">Average score over all graded fields for last five performance reviews</v-card-title>
        <my-reviews></my-reviews>
      </v-card>
    </v-flex>
    <v-flex class="px-3 py-3" xs6>
      <v-card>
        <v-card-title class="grey--text py-2">Number of days off taken VS Number of days off remaining</v-card-title>
        <remaining-days></remaining-days>
      </v-card>
    </v-flex>
    <v-flex class="px-3 py-3" xs12>
      <v-card>
        <v-card-title class="grey--text py-2">Number of days off taken by you each month</v-card-title>
        <days-off-chart></days-off-chart>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import MyReviews from './charts/MyReviews.js';
  import DaysOffChart from '../components/charts/DaysOff.js';
  import RemainingDays from '../components/charts/RemainingDaysOff';

  export default {
    data () {
      return {
      }
    },
    components: {
      MyReviews,
      DaysOffChart,
      RemainingDays,
    },
    methods: {

    }
  }

</script>
