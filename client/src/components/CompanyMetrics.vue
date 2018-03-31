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

    </v-flex>
  </v-layout>
</template>

<script>
  import GenderInCompany from './charts/GenderInCompany';
  import CompanyPerformance from './charts/CompanyPerformance';
  import CompanyDaysOff from './charts/CompanyDaysOff';

  export default {
    components: {
      GenderInCompany,
      CompanyPerformance,
      CompanyDaysOff,
    }
  }

</script>
