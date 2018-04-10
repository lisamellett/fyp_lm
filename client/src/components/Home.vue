<template>
<div>
    <v-content>
      <section>
        <v-parallax :src="require('@/assets/lake2.jpg')" height="600">
          <v-layout
            row
            align-center
            justify-center
            class="white--text"
          >
            <v-flex xs-6>
            <img src="../assets/kinlogo.png" height="200" class="center">
            <h1 class="white--text mb-2 display-1 text-xs-center"></h1>
            <div class="subheading mb-3 text-xs-center">FYP by Lisa Mellett</div>
            </v-flex>
            <v-flex xs6>
              <login></login>
            </v-flex>
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
                      Kin Metrics allows all users to view statistics about your company. Employees can view personal metrics, team metrics as well as general
                      metrics about the company. With a click of a button
                      managers can easily see where their employees are excelling and where help and guidance may
                      be required. How are your employees performing at work? Which month do most of your employees take annual leave during? Is
                      diversity incorporated into your company? Let Kin help
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
                      Help your employees reach their full potential using our state of the art performance
                      review system. Annual performance reviews are a thing of the past. Kin allows you to carry out reviews
                      easily to maximise performance in your company. Kin uses a customisable rating scale method in conjunction with
                      We allow you to post reviews about your employees which are only
                      an essay method to create a flexible, easy-to-use performance system that suits any companies needs.
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
                      view which employees have upcoming time off. No more shuffling through paperwork to find time-off
                      request forms, have it all accessible from one place. Our dual calendar system means employees can easily
                      see which requests have been approved and which are pending while also being able to see which fellow team members
                      have upcoming time off. We at Kin believe this is vital for employees to plan ahead.
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </section>

      <section>
        <v-parallax :src="require('@/assets/bottom.jpg')" height="380">
          <v-layout column align-center justify-center>
            <div class="headline white--text mb-3 text-xs-center">HR at your fingertips</div>
            <em>Sign your business up today</em>
          </v-layout>
        </v-parallax>
      </section>

      <section>
        <v-container grid-list-xl>
          <v-layout row wrap justify-center class="my-5">
            <v-flex xs12 sm4>
              <v-card class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">About Me</div>
                </v-card-title>
                <v-card-text>
                  I have always had a keen interest in art and design growing up while maths was my favourite subject in school.
                  I decided to do computer science as it would allow me to combine the two things I loved, logical thinking and
                  creativity. The motive behind KIN came from my six-month work placement at Teamwork.com. During this time Teamwork
                  struggled to find a good HR system. I had gained a keen interest in SaaS during my placement and so I thought I would
                  develop my own web application, which is how KIN came about.
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
                      <v-list-tile-title>0872864413</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="blue--text text--lighten-2">place</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>Mac Lab, Western Gateway.</v-list-tile-title>
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
