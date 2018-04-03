<template>
  <v-layout row wrap class="blue lighten-5">
    <v-flex xs6 class="px-3 py-3">
      <v-card>
        <v-card-title class="py-2 grey--text">Gender ratio on your team</v-card-title>
        <gender-on-team></gender-on-team>
      </v-card>
    </v-flex>
    <v-flex xs6 class="px-3 py-3">
      <v-card>
        <v-card-title class="py-2 grey--text">Average scores team members achieved on their last performance review</v-card-title>
        <team-performance></team-performance>
      </v-card>
    </v-flex>

    <v-layout row wrap v-if="($store.state.user.role === 'manager') || ($store.state.user.role === 'senior manager')">
      <v-flex xs6 class="px-3 py-3">
        <v-card>
          <v-card-title class="py-2 grey--text">Number of days off team members took per month</v-card-title>
          <days-off-team></days-off-team>
        </v-card>
      </v-flex>
      <v-flex xs6 class="px-3 py-3">
        <v-card>
          <v-card-title class="py-0 grey--text">
            <div>Last 5 performance review average scores of employees you manage</div>
            <div class="caption">* managers only</div>
          </v-card-title>
          <manager-performance></manager-performance>
        </v-card>
      </v-flex>
      <v-flex>
        <!--number of people per team -->
        <!--just do it per manager-->
      </v-flex>
    </v-layout>
    <v-layout row wrap v-else>
      <v-flex xs12 class="px-3 py-3">
        <v-card>
          <v-card-title class="py-2 grey--text">Number of days off team members took per month</v-card-title>
          <days-off-team></days-off-team>
        </v-card>
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>
  import GenderOnTeam from './charts/GenderOnTeam';
  import DaysOffTeam from './charts/TeamDaysOff';
  import TeamPerformance from '../components/charts/TeamPerformance';
  import ManagerPerformance from './charts/ManagerPerformance';

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
      ManagerPerformance,
    }
  }
</script>
