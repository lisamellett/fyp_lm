<template>
  <v-layout row wrap>
    <v-flex>
      <gender-on-team></gender-on-team>
    </v-flex>
    <v-flex>
      <days-off-team></days-off-team>
    </v-flex>
    <v-flex>
      <team-performance></team-performance>
    </v-flex>
    <v-flex>
      <!--number of people per team -->
      <!--just do it per manager-->
    </v-flex>
    <v-flex>
      <!--age pie chart-->
    </v-flex>
  </v-layout>
</template>

<script>
  import GenderOnTeam from './charts/GenderOnTeam';
  import DaysOffTeam from './charts/TeamDaysOff';
  import TeamPerformance from '../components/charts/TeamPerformance';

  // Todo: add in something like for manager -> showing stats on the people you manage

  export default {
    data () {
      return {

      }
    },
    components: {
      GenderOnTeam,
      DaysOffTeam,
      TeamPerformance,
    }
  }
</script>
