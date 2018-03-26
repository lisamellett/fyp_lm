<template>
  <v-layout>
    <v-flex xs8>
      <v-dialog v-model="requestModel" max-width="750px">
        <v-card>
          <v-card-title>
            <span class="headline">Request Time Off</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <HotelDatePicker v-on:checkInChanged="setStart" v-on:checkOutChanged="setEnd" format="DD/MM/YYYY" :i18n="ptBr">></HotelDatePicker>
                  <span  class="error-msg">{{ warning }}</span>
                </v-flex>
                <v-flex xs12>
                  <v-select
                    label="Select a Reason For your absence"
                    color="teal"
                    v-model="selectReason"
                    :items="reasons"
                    :rules="[v => !!v || 'A reason is required']"
                    required>
                  </v-select>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    color="teal"
                    multi-line
                    v-model="detail"
                  >
                    <div slot="label">
                      Further explanation <small>(optional)</small>
                    </div>
                  </v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="teal darken-1" flat @click.native="cancelPressed">Cancel</v-btn>
            <v-btn color="teal darken-1" flat @click.native="submitRequest">Submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-card>
        <v-toolbar dense class="blue darken-2" dark>
          <v-toolbar-items class="ml-0">
            <v-btn flat @click="changeToEmployee" :class="{active1: showMine, notActive:!showMine}">My Calendar</v-btn>
            <v-btn flat @click="changeToTeam" :class="{active1: !showMine, notActive:showMine}">Team Calendar</v-btn>
          </v-toolbar-items>

          <v-spacer></v-spacer>
          <v-btn icon @click="requestModel = !requestModel"><v-icon>add</v-icon></v-btn>
        </v-toolbar>
        <transition-group tag="div" :name="transition" class="transitionStyle">
          <div
          key="self"
          v-if="showMine">
          <full-calendar
            class="calendar"
            :events="myEvents"
            locale="en"
            @eventClick="eventClick"
            @dayClick="dayClick"
            @moreClick="moreClick">
          </full-calendar>
          </div>
        <div
          key="team"
          v-else>
          <full-calendar
            :events="teamEvents"
            locale="en"
            @eventClick="eventClick"
            @dayClick="dayClick"
            @moreClick="moreClick"
          ></full-calendar>
          </div>
        </transition-group>
      </v-card>
    </v-flex>
    <v-flex xs4 class="ml-3">
      <v-card>
        <v-toolbar class="blue darken-2" dark dense>
          <v-toolbar-title>
            Selected: {{ selectedDate}}
          </v-toolbar-title>
        </v-toolbar>
      </v-card>
    </v-flex>
  </v-layout>
</template>


<!--everything inside this script tag is the
controller and you can bind the html to it-->
<script>
import MyPanel from '@/components/MyPanel';
import HotelDatePicker from 'vue-hotel-datepicker';
import store from '@/store/store';
import EventService from '@/services/EventService';
import NotificationService from '@/services/NotificationService';
import CalendarView from "vue-simple-calendar";
require("vue-simple-calendar/dist/static/css/default.css");
require("vue-simple-calendar/dist/static/css/holidays-us.css");
const moment = require('moment');


export default {
  data() {
    return {
      selectedDate: null,
      filteredItems: [],
      showMine: true,
      selectReason: null,
      detail: null,
      reasons: ['Holiday', 'Appointment', 'Other'], // not using this at the moment
      startDate: null,
      endDate: null,
      requestModel: false,
      warning: '',
      error: '',
      ptBr: {
        night: 'Day',
        nights: 'Days',
        'day-names': ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
        'check-in': 'First Day Absent',
        'check-out': 'Back at work',
        'month-names': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Auguest', 'September', 'October', 'November', 'Decemeber'],
      },
      myEvents: [],
      teamEvents: [],
    }
  },
  computed: {
    transition: function () {
      return this.showMine ? "slide-left" : "slide";
    }
  },
  components: {
    'full-calendar': require('vue-fullcalendar'),
    HotelDatePicker,
    MyPanel,
    CalendarView
  },
  async created () {
    this.myEvents = (await EventService.getUserEvents(store.state.user._id)).data.events;
    console.log('mine', this.myEvents);

    console.log(store.state.user.manager);
    console.log(store.state.user._id);
    this.teamEvents = (await EventService.getTeamEvents(store.state.user.manager)).data.events;
    console.log('team', this.teamEvents);
  },
  methods: {
    changeToTeam() {
      this.showMine = false;
    },
    changeToEmployee() {
      this.showMine = true;
    },
    eventClick(event, jsEvent, pos) {
      console.log('eventClick', event.title, jsEvent, pos)
    },
    dayClick(day, jsEvent) {
      // const selected = new Date(day);
      // console.log('selected', selected);
      console.log('day', day);
      const dateTest = this.convertToUTC(day);
      console.log('dateTest', dateTest);
      const newDate = dateTest.toISOString();
      // const moment = moment(newDate).format('YYYY-MM-DD[T]HH:mm:ss.SSSZZ');
      // console.log('moment', moment);
      console.log('iso', newDate);
      this.getEvents(newDate);
      console.log('filtered', this.filteredItems);
      console.log('dayClick', day, jsEvent);
    },
    moreClick(day, events, jsEvent) {
      console.log('moreCLick', day, events, jsEvent)
    },
    cancelPressed() {
      this.requestModel = false;
      this.detail = null;
    },
    getEvents(day) {
      this.filteredItems = this.myEvents.filter(function (event) {
        console.log('start', event.start);
        return (event.start === day);
      });
    },
    convertToUTC(date) {
      console.log('date', date);

      const date1 = date.toString().split(' ', 4).join(' ') + ' UTC';
      console.log('date1', date1);
      const newStart = new Date(date1);
      console.log('newStart', newStart.toUTCString());
      return newStart;
    },
    // searchInTheList(searchText, currentPage){
    //   this.filteredItems = this.currentViewEmployee.reviews.filter( function(v, k){
    //     return v.date.toLowerCase().indexOf(searchText.toLowerCase()) > -1
    //   });
    //   this.buildPagination();

    async submitRequest() {
      // create request event
      // send notification to manager
      // send email to manager
      // send warning to manager if allowed holidays will be exceeded
      // make call to api to update event list
      let css = '';
      if (this.selectReason === 'Holiday') {
        css = 'pink lighten-5'; // #F8BBD0
      }
      else if (this.selectReason === 'Appointment') {
        css = 'orange lighten-5'; //#FFE0B2
      }
      else {
        css = 'cyan lighten-5'; //#B2EBF2
      }

      const request = {
        employeeId: store.state.user._id,
        managerId: store.state.user.manager,
        title: this.selectReason,
        person: store.state.user.name,
        start: this.startDate,
        end: this.endDate,
        cssClass: css,
        type: 'request', // Request or Booked
        reason: this.detail, // this could be appointment, holidays -> may only show in your personal cal
      };
      const notification = {
        senderId: store.state.user._id,
        receiverId: store.state.user.manager,
        type: "Day Off Request",
        message: store.state.user.name + "has request time off."
      };
      try {
        await EventService.addEvent(request);
        // send new request for events here (update them to show new request)
      } catch(error) {
        this.error = error.response.data.error;
      }
      await NotificationService.addNotification(notification);
      this.requestModel = false;
      this.startDate = null;
      this.endDate = null;
      this.detail = null;
      this.selectReason = null;
    },

    getDifferenceInDays(d1, d2) {
      const timeDiff = Math.abs(d1.getTime() - d2.getTime());
      const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      const daysLeft = store.state.user.allowance - store.state.user.taken - diffDays;
      if (daysLeft < 0) {
        this.warning = "Warning: You have exceeded you're total allowed holidays by " + Math.abs(daysLeft) + " days. A member of admin will be notified a long with your manager if you proceed with this request."
      } else {
        this.warning = '';
      }
    },

    setStart(payload) {
      // const test = new Date();
      // console.log('test', test);
      console.log('payload start', payload);
      // const str = 'payload';
      // const str1 = str.substring(0,tomorrow.toLocaleString().indexOf(':')-3);

      // const dateTime = 'Fri, 18 Oct 2013 11:38:23 GMT';
      // const date1 = payload.toString().split(' ', 4).join(' ') + ' UTC';
      // console.log('date1', date1);
      // const newStart = new Date(date1);
      // console.log('newStart', newStart.toUTCString());
      this.startDate = this.convertToUTC(payload);
      // this.startDate = newStart;
      console.log('startDate', this.startDate);
    },

    setEnd(payload) {
      console.log('payload', payload);
      if (payload !== null) {
        const yesterday = new Date(payload);
        yesterday.setDate(payload.getDate()-1);
        this.endDate = yesterday;
        this.getDifferenceInDays(this.startDate, this.endDate);
      } else {
        this.endDate = payload;
      }
      console.log('enddate', this.endDate);
    },
  },
};

</script>

<style scoped>
  .error-msg {
    color: red;
  }

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
    transition: all 0.2s;
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
    transition: all 0.2s;
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

  .calendar {
    /*height: 800px;*/
  }
</style>
