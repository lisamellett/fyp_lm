<template>
  <v-layout column>
    <v-layout row wrap v-if="this.user.name !== ''">

      <v-flex xs6 d-flex>
        <v-layout row wrap>
          <v-flex xs12 d-flex class="px-2 py-2">
            <v-card class="grad">
              <v-layout column>
              <v-flex
                text-xs-center
                layout
                align-center
                justify-center
              class="py-2">
              <v-avatar
                size="200px"
                slot="activator"
              >
                <img
                  :src="require('@/assets/blankmodel.png')"
                >
              </v-avatar>
              </v-flex>
              <v-flex
                class="py-3"
                text-xs-center
                layout
                align-center
                justify-center>
                <div class="title white--text">{{ this.user.name }}</div>
              </v-flex>
                <v-flex
                  class="py-3"
                  text-xs-center
                  layout
                  align-center
                  justify-center>
                  <div class="white--text">{{ this.user.title }}</div>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
          <v-flex xs12 d-flex class="px-2 py-2">
            <v-card>
              <v-layout row wrap>
                <v-flex
                  layout
                  xs12
                  class="py-2">
                  <v-card-title class="subheader">
                    About
                  </v-card-title>
                </v-flex>
                <v-flex xs4>
                  <v-list>
                    <v-list-tile>
                      <v-list-tile-action>
                        <v-icon class="ff blue--text text--lighten-2">fiber_manual_record</v-icon>
                      </v-list-tile-action>
                      <v-list-tile-action-text>Date of birth</v-list-tile-action-text>
                    </v-list-tile>
                  </v-list>
                </v-flex>
                <v-flex xs8>
                  <v-list>
                    <v-list-tile>
                      <v-list-tile-title>
                        {{ this.user.dob }}
                      </v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-flex>
                <v-flex xs4>
                  <v-list>
                    <v-list-tile>
                      <v-list-tile-action>
                        <v-icon class="ff blue--text text--lighten-2">fiber_manual_record</v-icon>
                      </v-list-tile-action>
                      <v-list-tile-action-text>Gender</v-list-tile-action-text>
                    </v-list-tile>
                  </v-list>
                </v-flex>
                <v-flex xs8>
                  <v-list>
                    <v-list-tile>
                      <v-list-tile-title>
                        {{ this.user.gender }}
                      </v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-flex>
                <v-flex xs4>
                  <v-list>
                    <v-list-tile>
                      <v-list-tile-action>
                        <v-icon class="ff blue--text text--lighten-2">fiber_manual_record</v-icon>
                      </v-list-tile-action>
                      <v-list-tile-action-text>Job Title</v-list-tile-action-text>
                    </v-list-tile>
                  </v-list>
                </v-flex>
                <v-flex xs8>
                  <v-list>
                    <v-list-tile>
                      <v-list-tile-title>
                        {{ this.user.title }}
                      </v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-flex>
                <v-flex xs4>
                  <v-list>
                    <v-list-tile>
                      <v-list-tile-action>
                        <v-icon class=" ff blue--text text--lighten-2">fiber_manual_record</v-icon>
                      </v-list-tile-action>
                      <v-list-tile-action-text>Team</v-list-tile-action-text>
                    </v-list-tile>
                  </v-list>
                </v-flex>
                <v-flex xs8>
                  <v-list>
                    <v-list-tile>
                      <v-list-tile-title>
                        {{ this.user.team }}
                      </v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>

      <v-flex xs6 d-flex>
        <v-layout row wrap>
          <v-flex xs12 class="px-2 py-2">
            <v-card>
              <v-layout row wrap>
                <v-flex
                  xs12
                  class="py-2">
                  <v-card-title class="subheader">
                    Contact Information
                  </v-card-title>
                </v-flex>
                <v-flex xs4>
                  <v-list>
                    <v-list-tile>
                      <v-list-tile-action>
                        <v-icon class="blue--text text--lighten-2">home</v-icon>
                      </v-list-tile-action>
                      <v-list-tile-action-text>address</v-list-tile-action-text>
                    </v-list-tile>
                  </v-list>
                </v-flex>
                <v-flex xs8>
                  <v-list>
                    <v-list-tile>
                      <v-list-tile-title>
                        {{ this.user.address }}
                      </v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-flex>
                <v-flex xs4>
                  <v-list>
                    <v-list-tile>
                      <v-list-tile-action>
                        <v-icon class="blue--text text--lighten-2">phone</v-icon>
                      </v-list-tile-action>
                      <v-list-tile-action-text>phone</v-list-tile-action-text>
                    </v-list-tile>
                  </v-list>
                </v-flex>
                <v-flex xs8>
                  <v-list>
                    <v-list-tile>
                      <v-list-tile-title>
                        {{ this.user.phone }}
                      </v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-flex>
                <v-flex xs4>
                  <v-list>
                    <v-list-tile>
                      <v-list-tile-action>
                        <v-icon class="blue--text text--lighten-2">email</v-icon>
                      </v-list-tile-action>
                      <v-list-tile-action-text>email</v-list-tile-action-text>
                    </v-list-tile>
                  </v-list>
                </v-flex>
                <v-flex xs8>
                  <v-list>
                    <v-list-tile>
                      <v-list-tile-title>
                        {{ this.user.email }}
                      </v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
          <v-flex xs12 class="px-2 py-2">
            <v-card>
              <v-layout row wrap>
                <v-flex
                  xs12
                  class="py-2">
                  <v-card-title class="subheader">
                    Next of Kin
                  </v-card-title>
                </v-flex>
                <v-flex xs4>
                  <v-list>
                    <v-list-tile>
                      <v-list-tile-action>
                        <v-icon class="blue--text text--lighten-2">person</v-icon>
                      </v-list-tile-action>
                      <v-list-tile-action-text>name</v-list-tile-action-text>
                    </v-list-tile>
                  </v-list>
                </v-flex>
                <v-flex xs8>
                  <v-list>
                    <v-list-tile>
                      <v-list-tile-title>
                        {{ this.user.kinName }}
                      </v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-flex>
                <v-flex xs4>
                  <v-list>
                    <v-list-tile>
                      <v-list-tile-action>
                        <v-icon class="blue--text text--lighten-2">phone</v-icon>
                      </v-list-tile-action>
                      <v-list-tile-action-text>phone</v-list-tile-action-text>
                    </v-list-tile>
                  </v-list>
                </v-flex>
                <v-flex xs8>
                  <v-list>
                    <v-list-tile>
                      <v-list-tile-title>
                        {{ this.user.kinNum }}
                      </v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
          <v-flex xs12 class="px-2 py-2">
            <v-layout row>
              <v-flex xs6 class="pr-2">
                <v-card>
                  <v-layout column>
                    <v-flex
                      d-flex
                      class="py-2">
                      <v-card-title class="subheader">
                        Holidays
                      </v-card-title>
                    </v-flex>
                    <v-flex d-flex>
                      <v-layout row>
                        <v-flex xs6 class="mx-2 my-2">
                          <v-card class="blue lighten-5">
                            <div class="text-sm-center caption grey--text pt-2">Taken</div>
                            <div class="text-sm-center txt grey--text">{{ this.user.taken }}</div>
                          </v-card>
                        </v-flex>
                        <v-flex xs6 class="mx-2 my-2">
                          <v-card class="blue lighten-5">
                            <div class="text-sm-center caption grey--text pt-2">Remaining</div>
                            <div class="text-sm-center txt grey--text">{{ this.user.allowance - this.user.taken }}</div>
                          </v-card>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                  </v-layout>
                </v-card>
              </v-flex>
              <v-flex d-flex xs6 class="pl-2">
                <v-card>
                  <v-layout column>
                    <v-flex
                      d-flex
                      class="py-2">
                      <v-card-title class="subheader">
                        Performance
                      </v-card-title>
                    </v-flex>
                    <v-layout row wrap>
                      <v-flex xs1 class="pl-3 pb-2">
                        <v-icon class="ff blue--text text--lighten-2">fiber_manual_record</v-icon>
                      </v-flex>
                      <v-flex xs11 class="pl-3 pr-2">
                        <span class="">A total of {{ this.user.reviews.length }} reviews has been submitted for you so far. </span>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap class="pb-2">
                      <v-flex xs1 class="pl-3">
                        <v-icon class="ff blue--text text--lighten-2">fiber_manual_record</v-icon>
                      </v-flex>
                      <v-flex xs11 class="pl-3 pr-2">
                        <span v-if="this.user.reviews.length > 0" class="">You scored an average score of {{ this.user.reviews[0].fields.AVERAGE }} in your last review</span>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap class="pb-2">
                      <v-flex xs1 class="pl-3">
                        <v-icon class="ff blue--text text--lighten-2">fiber_manual_record</v-icon>
                      </v-flex>
                      <v-flex xs11 class="pl-3 pr-2">
                        <span class="">You scored an average score of {{ this.getAverage }} in your last {{ this.user.reviews.length }} reviews</span>
                      </v-flex>
                    </v-layout>
                  </v-layout>
                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-layout>
</template>


<!--everything inside this script tag is the
controller and you can bind the html to it-->
<script>
/* eslint-disable */
import UsersService from "../services/UsersService";
import store from "../store/store";
  export default {
    data () {
      return {
        user: {
          name: '',
          dob: '',
          gender: '',
          role: '',
          team: '',
          manager: '',
          allowance: '',
          title: '',
          email: '',
          username: '',
          password: '',
          address: '',
          phone: '',
          kinName: '',
          kinNum: '',
          reviews: [],
        },
      }
    },
    components: {
    },
    async created() {
      this.user = (await UsersService.getUser(store.state.user._id)).data.user;
    },
    computed: {
      getAverage () {
        if (this.user.reviews.length === 0) {
          return 0;
        }
        let x = 0;
        for (let i = 0; i < this.user.reviews.length; i++) {
          x += this.user.reviews[i].fields.AVERAGE;
        }
        return x / this.user.reviews.length;
      }
    }
  };

</script>

<style scoped>
  .grad {
    background: linear-gradient(#1976D2, #D1C4E9);
  }

  .ff {
    font-size: 10px;
  }

  .txt {
    font-size: 72px;
  }
</style>
