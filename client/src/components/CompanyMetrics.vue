<template>
  <v-layout row wrap>
    <v-flex>
      <gender-in-company></gender-in-company>
    </v-flex>
    <v-flex>
      <company-performance></company-performance>
    </v-flex>
    <v-flex>
      <company-days-off></company-days-off>
    </v-flex>
    <v-flex>
      <users-per-team></users-per-team>
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
