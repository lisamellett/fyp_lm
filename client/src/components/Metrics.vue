<template>
  <v-layout column>
    <v-flex>
      <v-card>
        <v-toolbar dense class="blue darken-2" dark>
          <v-toolbar-items class="ml-0">
            <v-btn flat @click="changeToMine" :class="{active1: myMetrics, notActive:!myMetrics}">My Metrics</v-btn>
            <v-btn flat @click="changeToTeam" :class="{active1: teamMetrics, notActive:!teamMetrics}">Team Metrics</v-btn>
            <v-btn flat @click="changeToCompany" :class="{active1: companyMetrics, notActive:!companyMetrics}">Company Metrics</v-btn>
          </v-toolbar-items>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-flex style="overflow: hidden">
          <transition :name="transition" mode="out-in">
            <div
              key="mine"
              v-if="myMetrics">
              <my-metrics>
                mine
              </my-metrics>
            </div>
            <div
              key="team"
              v-else-if="teamMetrics">
              <team-metrics>
                team
              </team-metrics>
            </div>
            <div
              key="company"
              v-else>
              <company-metrics>
                company
              </company-metrics>
            </div>
          </transition>
        </v-flex>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
/* eslint-disable */
import MyMetrics from '../components/MyMetrics';
import TeamMetrics from '../components/TeamMetrics';
import CompanyMetrics from '../components/CompanyMetrics';

export default {
  data() {
    return {
      myMetrics: true,
      teamMetrics: false,
      companyMetrics: false,
      comingFrom: 'myMetrics',
    }
  },
  components: {
    MyMetrics,
    TeamMetrics,
    CompanyMetrics,
  },
  methods: {
    changeToMine() {
      this.myMetrics = true;
      this.teamMetrics = false;
      this.companyMetrics = false;
    },
    changeToTeam() {
      if (this.myMetrics) {
        this.comingFrom = 'myMetrics';
      }
      else if(this.companyMetrics) {
        this.comingFrom = 'companyMetrics';
      }
      else {
        this.comingFrom = 'teamMetrics';
      }
      this.myMetrics = false;
      this.teamMetrics = true;
      this.companyMetrics = false;
    },
    changeToCompany() {
      this.myMetrics = false;
      this.teamMetrics = false;
      this.companyMetrics = true;
    },
  },
  computed: {
    transition: function() {
      if (this.myMetrics) {
        return "slide-left"
      }
      else if (this.companyMetrics) {
        return "slide"
      }
      else {
        if (this.comingFrom === 'myMetrics') {
          return 'slide';
        } else {
          return 'slide-left';
        }
      }
    },
  }
}
</script>

<style scoped>
  .notActive {
    color: #99c2ff
  }

  .active1 {
    border-bottom: 2px solid orange;
  }

  .slide-enter {
    transform: translate(100%,0);
  }

  .slide-leave-active {
    transition: all 0.3s;
  }
  .slide-enter-active {
    transition: all 0.5s;
  }

  .slide-enter-to {
    transform: translate(0, 0);
  }

  .slide-leave-to {
    transform: translate(-100%, 0);
  }

  .slide-left-enter {
    transform: translate(-100%, 0);
  }

  .slide-left-leave-active {
    transition: all 0.3s;
  }

  .slide-left-enter-active {
    transition: all 0.5s;
  }
  .slide-left-enter-to {
    transform: translate(0, 0);
  }
  .slide-left-leave-to {
    transform: translate(100%, 0);
  }

  .transitionStyle {
    overflow: hidden;
    position: relative;
  }
</style>
