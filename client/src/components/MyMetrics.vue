<template>
  <v-layout row wrap>
    <v-flex>
      <line-chart></line-chart>
    </v-flex>
    <v-flex>
      <days-off-chart></days-off-chart>
    </v-flex>

  </v-layout>
</template>

<script>
  import LineChart from '../components/charts/LineChart.js';
  import DaysOffChart from '../components/charts/DaysOff.js';

  export default {
    data () {
      return {
      }
    },
    components: {
      LineChart,
      DaysOffChart,
    },
    methods: {

    }
  }

</script>
