<template>
  <v-layout row wrap class="blue lighten-5">
    <v-flex xs6 class="px-3 py-3">
      <v-card>
        <v-card-title class="py-2 grey--text">Gender ratio within the company</v-card-title>
        <gender-in-company></gender-in-company>
      </v-card>
    </v-flex>
    <v-flex xs6 class="px-3 py-3">
      <v-card>
        <v-card-title class="py-2 grey--text">Number of days off company members took per month </v-card-title>
        <company-days-off></company-days-off>
      </v-card>
    </v-flex>
    <v-flex xs6 class="px-3 py-3">
      <v-card>
        <v-card-title class="py-2 grey--text">Average score company members achieved on their last performance review</v-card-title>
        <company-performance></company-performance>
      </v-card>
    </v-flex>
    <v-flex xs6 class="px-3 py-3">
      <v-card>
        <v-card-title class="py-2 grey--text">Number of emlployees per team</v-card-title>
        <users-per-team></users-per-team>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import GenderInCompany from './charts/GenderInCompany';
  import CompanyPerformance from './charts/CompanyPerformance';
  import CompanyDaysOff from './charts/CompanyDaysOff';
  import UsersPerTeam from './charts/UsersPerTeam';

  export default {
    components: {
      GenderInCompany,
      CompanyPerformance,
      CompanyDaysOff,
      UsersPerTeam,
    }
  }

</script>
