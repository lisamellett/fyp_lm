<template>
<div>
    <!--<v-toolbar class="white">-->
      <!--<v-toolbar-title v-text="title"></v-toolbar-title>-->
    <!--</v-toolbar>-->
    <v-content>
      <section>
        <v-parallax :src="require('@/assets/hero.jpeg')" height="600">
          <v-layout
            row
            align-center
            justify-center
            class="white--text"
          >
            <v-flex xs-6>
            <img src="../assets/Kin_Logo.png" height="200" class="center">
            <h1 class="white--text mb-2 display-1 text-xs-center"></h1>
            <div class="subheading mb-3 text-xs-center">FYP by Lisa Mellett</div>
            </v-flex>
            <v-flex xs6>
              <login></login>
            </v-flex>
            <!--<v-btn-->
              <!--class="blue lighten-2 mt-5"-->
              <!--dark-->
              <!--large-->
              <!--:to="{name:'login'}"-->
            <!--&gt;-->
              <!--Login-->
            <!--</v-btn>-->
          </v-layout>
        </v-parallax>
      </section>

      <section>
        <v-layout
          column
          wrap
          class="my-5"
          align-center
        >
          <v-flex xs12 sm4 class="my-3">
            <div class="text-xs-center">
              <h2 class="headline">The best software solution to your HR needs</h2>
              <span class="subheading">
                Build better relationships with your employees
              </span>
            </div>
          </v-flex>
          <v-flex xs12>
            <v-container grid-list-xl>
              <v-layout row wrap align-center>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">show_chart</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">Metrics</div>
                    </v-card-title>
                    <v-card-text>
                      LM Metrics allows you to view statistics about your company. With a click of a button
                      you can easily see where your employees are excelling and where help and guidance may
                      be required. Which month do most of your employees take annual leave during? Let us help
                      you prepare for the future.
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">flash_on</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline">Performance</div>
                    </v-card-title>
                    <v-card-text>
                      Help your employees reach their potential using our state of the art performance
                      review system. We allow you to post reviews about your employees which are only
                      visible to the employee, their manager and senior management, Full privacy is ensured
                      and your employees can see where they are excelling.
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">date_range</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">Calendar</div>
                    </v-card-title>
                    <v-card-text>
                      Managing your employees annual leave has never been made more simple. Easily
                      view which employees have up coming time off and with a click of a button managers
                      can approve/disprove time off. No more shuffling through paperwork to find time-off
                      request forms, have it all accessible from place.
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </section>

      <section>
        <v-parallax :src="require('@/assets/section.jpg')" height="380">
          <v-layout column align-center justify-center>
            <div class="headline white--text mb-3 text-xs-center">HR at your fingertips</div>
            <em>Sign your business up today</em>
            <v-btn
              class="blue lighten-2 mt-5"
              dark
              large
            >
              Sign Up
            </v-btn>
          </v-layout>
        </v-parallax>
      </section>

      <section>
        <v-container grid-list-xl>
          <v-layout row wrap justify-center class="my-5">
            <v-flex xs12 sm4>
              <v-card class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">Company info</div>
                </v-card-title>
                <v-card-text>
                  Hi my name is Lisa Mellett and I have been working on this project for several
                  months now. Please give me a good grade. That is all.
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs12 sm4 offset-sm1>
              <v-card class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">Contact Me</div>
                </v-card-title>
                <v-card-text>
                  Please feel free to contact me in relation to my project at any stage
                </v-card-text>
                <v-list class="transparent">
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="blue--text text--lighten-2">phone</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>111-222 3333</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="blue--text text--lighten-2">place</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>Crap Mac Lab, Western Gateway</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="blue--text text--lighten-2">email</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>mellettlisa@gmail.com</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </section>
    </v-content>
</div>
</template>

<script>
/* eslint-disable */
import Login from '../components/Login'

export default {
    data () {
      return {
        title: 'Your Logo'
      }
    },
  components: {
      Login,
  }
}
</script>

<style scoped>
  .center {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
</style>
