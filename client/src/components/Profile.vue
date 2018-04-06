<template>
  <v-layout column>
    <v-layout row wrap>
      <v-flex xs6 class="px-2 py-2">
        <v-card class="blue lighten-1">
          <!--<v-card-media :src="require('@/assets/blankmodel.png')" height="200">-->
          <!--</v-card-media>-->
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
              :src="require('@/assets/nobody_m.original.jpg')"
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
              <div class="white--text">{{ this.user.role }}</div>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
      <v-flex xs6 class="px-2 py-2">
        <v-card>
          <v-layout column>
            <v-flex
              layout
              class="py-2">
              <v-card-title class="subheader">
                About
              </v-card-title>
            </v-flex>
            <v-layout
              class="py-3 pl-4"
              layout
            >
              <v-flex xs6>
                Date of Birth
              </v-flex>
              <v-flex xs6 class="pl-4"> {{ this.user.dob }}</v-flex>
            </v-layout>
            <v-layout
              class="py-3 pl-4"
              layout
            >
              <v-flex xs6>
                Gender</v-flex>
              <v-flex xs6 class="pl-4"> {{ this.user.gender }}</v-flex>
            </v-layout>
            <v-flex
              class="py-3 pl-4"
              layout>
              <div>
                Job Title</div>
              <div class="pl-4"> {{ this.user.title }}</div>
            </v-flex>
            <v-flex
              class="py-3 pl-4"
              layout>
              <div>
                Team</div>
              <div class="pl-4"> {{ this.user.team }}</div>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
      <v-flex xs6 class="px-2 py-2">
        <v-card>
          <v-layout column>
            <v-flex
              layout
              class="py-2">
              <v-card-title class="subheader">
                Contact Details.
              </v-card-title>
            </v-flex>
            <v-layout
              class="py-3 pl-4"
              layout
            >
              <v-flex xs1>
                <v-icon>home</v-icon>
              </v-flex>
              <v-flex xs3>
                Address
              </v-flex>
              <v-flex xs8 class="pl-4"> {{ this.user.address }}</v-flex>
            </v-layout>
            <v-layout
              class="py-3 pl-4"
              layout
            >
              <v-flex xs1>
              <v-icon>phone</v-icon>
              </v-flex>
              <v-flex xs3>
              Number
              </v-flex>
              <v-flex xs8 class="pl-4"> {{ this.user.phone }}</v-flex>
            </v-layout>
            <v-layout
              class="py-3 pl-4"
              layout>
              <v-flex xs1>
                <v-icon class="pr-2">email</v-icon>
              </v-flex>
              <v-flex xs3>
              Email
              </v-flex>
              <v-flex xs8 class="pl-4"> {{ this.user.email }}</v-flex>
            </v-layout>
          </v-layout>
        </v-card>
      </v-flex>
      <v-flex xs3 class="px-2 py-2">
        <v-card>
          <v-layout column>
            <v-flex
              layout
              class="py-2">
              <v-card-title class="subheader">
                Holidays
              </v-card-title>
            </v-flex>
            <v-flex
              class="py-3 pl-4"
              layout
            >
              <div>
                Taken</div>
              <div class="pl-4"> {{ this.user.taken }}</div>
            </v-flex>
            <v-flex
              class="py-3 pl-4"
              layout
            >
              <div>
                Total</div>
              <div class="pl-4"> {{ this.user.allowance }}</div>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
      <v-flex xs3 class="px-2 py-2">
        <v-card>
          <v-layout column>
            <v-flex
              layout
              class="py-2">
              <v-card-title class="subheader">
                Next of Kin
              </v-card-title>
            </v-flex>
            <v-flex
              class="py-3 pl-4"
              layout
            >
              <div>
                Name</div>
              <div class="pl-4"> {{ this.user.kinName }}</div>
            </v-flex>
            <v-flex
              class="py-3 pl-4"
              layout
            >
              <div>
                Number</div>
              <div class="pl-4"> {{ this.user.kinNum }}</div>
            </v-flex>
          </v-layout>
        </v-card>
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
        },
      }
    },
    components: {
    },
    async created() {
      this.user = (await UsersService.getUser(store.state.user._id)).data.user;
    }
  };

</script>

<style scoped>
</style>
