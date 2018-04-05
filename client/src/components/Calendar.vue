<template>
  <v-layout row>
    <v-flex xs8>
      <v-dialog v-model="requestModel" max-width="750px">
        <v-card>
          <v-card-title>
            <span class="headline">Request Time Off</span>
          </v-card-title>
          <v-card-text>
            <v-form v-model="valid" ref="form" lazy-validation>
            <v-container>
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
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="teal darken-1" flat @click.native="cancelPressed">Cancel</v-btn>
            <v-btn color="teal darken-1" flat @click.native="submitRequest" :disabled="!valid">Submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-card>
        <v-toolbar dense class="blue darken-2" dark>
          <v-toolbar-items class="ml-0">
            <v-btn flat @click="changeToEmployee" :class="{active1: showMine, notActive:!showMine}">My Calendar</v-btn>
            <v-btn flat @click="changeToTeam" :class="{active1: !showMine, notActive:showMine}">
              <span v-if="$store.state.user.role === 'senior manager'">Company Calendar</span>
              <span v-else>Team Calendar</span>
            </v-btn>
          </v-toolbar-items>

          <v-spacer></v-spacer>
          <v-btn flat @click="requestModel = !requestModel">New Request<v-icon right>add_circle</v-icon></v-btn>
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
            @dayClick="dayClickTeam"
            @moreClick="moreClick"
          ></full-calendar>
          </div>
        </transition-group>
      </v-card>
    </v-flex>
    <v-flex xs4 class="ml-3">
      <v-layout row wrap >
      <v-flex class="mb-2">
        <v-card v-if="showMine">
          <v-toolbar class="blue darken-2" dark dense>
            <v-toolbar-title>
              {{ prettyDate(selectedDate) }}
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-tooltip top>
            <v-icon slot="activator">info_outline</v-icon>
              <span>Click on a day on the calendar to view the associated events</span>
            </v-tooltip>
          </v-toolbar>
          <v-container class="hee2">
          <v-card-title class="subheading grey--text py-0">Showing schedule for {{ prettyDate(selectedDate)}}</v-card-title>
          <v-flex xs12 v-if="filteredItems.length === 0" class="pb-2 py-2">
            <v-card class="cyan lighten-5" raised>
              <v-card-title class="body-1 center">You have no events scheduled for this day</v-card-title>
            </v-card>
          </v-flex>
          <v-flex xs12 v-else v-for="item in filteredItems" class="pb-2 py-2">
            <v-card raised :class="item.cssClass">
              <v-card-title>
                <v-layout row wrap>
                <v-flex xs4>
                  <v-avatar>
                <v-icon class="white--text">{{ item.icon }}</v-icon>
                  </v-avatar>
                </v-flex>
                <v-flex xs8 class="pt-2">
                <span class="subheading">{{ item.title }}</span>
                  <span class="caption">{{item.type}}</span>
                </v-flex>
                  <v-flex xs4>
                    Starting:
                  </v-flex>
                  <v-flex xs8>
                    {{prettyDate(item.start)}}
                  </v-flex>
                  <v-flex xs4>
                    Back to Work
                  </v-flex>
                  <v-flex xs8>
                    <!--add one day to this -->
                    {{ incrementDate(item.end) }}
                  </v-flex>
                  <v-flex xs4 v-if="item.reason">
                    Detail:
                  </v-flex>
                  <v-flex xs8 v-if="item.reason">
                    {{item.reason}}
                  </v-flex>
                </v-layout>
              </v-card-title>

            </v-card>
          </v-flex>
          </v-container>
        </v-card>

        <v-card v-else>
          <v-toolbar class="blue darken-2" dark dense>
            <v-toolbar-title>
              {{ prettyDate(selectedDate2) }}
            </v-toolbar-title>
          </v-toolbar>
          <v-container class="hee2">
          <v-card-title class="subheading grey--text py-0"><span class="center">Showing schedule for {{ prettyDate(selectedDate2)}}</span></v-card-title>
          <v-flex xs12 v-if="filteredTeam.length === 0" class="pb-2 py-2">
            <v-card class="cyan lighten-5" raised>
              <v-card-title v-if="$store.state.user.role === 'senior manager'" class="body-1">No employees have events scheduled for this day</v-card-title>
              <v-card-title v-else class="body-1">No members of your team have events scheduled for this day</v-card-title>
            </v-card>
          </v-flex>
          <v-flex xs12 v-else v-for="item in filteredTeam" class="pb-2 py-2">
            <v-card raised :class="item.cssClass">
              <v-card-title>
                <v-layout row wrap>
                  <v-flex xs4>
                    <v-avatar>
                      <v-icon class="white--text">{{ item.icon }}</v-icon>
                    </v-avatar>
                  </v-flex>
                  <v-flex xs8 class="pt-2">
                    <span class="subheading">{{ item.name }}</span>
                    <span class="caption">{{item.type}}</span>
                  </v-flex>
                  <v-flex xs4>
                    Starting:
                  </v-flex>
                  <v-flex xs8>
                    {{prettyDate(item.start)}}
                  </v-flex>
                  <v-flex xs4>
                    Back to Work
                  </v-flex>
                  <v-flex xs8>
                    {{ incrementDate(item.end) }}
                  </v-flex>
                </v-layout>
              </v-card-title>
        </v-card>
      </v-flex>
          </v-container>
        </v-card>
      </v-flex>

        <v-flex class="pt-2">
          <v-card v-if="showMine">
            <v-toolbar dense class="blue darken-2" dark>
              <v-toolbar-title>
                My Days Off
              </v-toolbar-title>
            </v-toolbar>
            <v-container class="hee">
              <v-flex xs12 v-if="myEventsSorted.length === 0" class="pb-2 py-2">
                <v-card class="cyan lighten-5" raised>
                  <v-card-title class="body-1 center">You have no upcoming events</v-card-title>
                </v-card>
              </v-flex>
              <v-list two-line v-else>
                <template v-for="event in myEventsSorted">
                  <v-divider></v-divider>
                  <!--<v-subheader>{{ event.title }}</v-subheader>-->
                  <!--<v-divider v-else-if="item.divider" :inset="item.inset" :key="index"></v-divider>-->
                  <v-list-tile avatar>
                    <v-list-tile-avatar>
                      <v-icon :class="event.cssClass" class="white--text">{{ event.icon }}</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title>{{event.title}} <span class="caption">{{event.type}}</span></v-list-tile-title>
                      <v-list-tile-sub-title> start: {{ prettyDate(event.start)}}</v-list-tile-sub-title>
                      <v-list-tile-sub-title> back to work: {{ incrementDate(event.end)}}</v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </template>
              </v-list>
            </v-container>
          </v-card>
          <v-card v-else>
            <v-toolbar dense class="blue darken-2" dark>
              <v-toolbar-title v-if="$store.state.user.role === 'senior manager'">
                Company Employees Days Off
              </v-toolbar-title>
              <v-toolbar-title v-else>
                Team Members Days Off
              </v-toolbar-title>
            </v-toolbar>
            <v-container class="hee">
              <v-flex xs12 v-if="teamEventsSorted.length === 0" class="pb-2 py-2">
                <v-card class="cyan lighten-5" raised>
                  <v-card-title class="body-1 center">No members of your team have upcoming events</v-card-title>
                </v-card>
              </v-flex>
              <v-list v-else two-line>
                <template v-for="event in teamEventsSorted">
                  <v-divider></v-divider>
                  <!--<v-subheader>{{ event.title }}</v-subheader>-->
                  <!--<v-divider v-else-if="item.divider" :inset="item.inset" :key="index"></v-divider>-->
                  <v-list-tile avatar>
                    <v-list-tile-avatar>
                      <v-icon :class="event.cssClass" class="white--text">{{ event.icon }}</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title>{{ event.name }}</v-list-tile-title>
                      <v-list-tile-sub-title> start: {{ prettyDate(event.start)}}</v-list-tile-sub-title>
                      <v-list-tile-sub-title> back to work: {{ incrementDate(event.end)}}</v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </template>
              </v-list>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
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
import UsersService from '@/services/UsersService';
/* eslint-disable */
// import CalendarView from "vue-simple-calendar";
// require("vue-simple-calendar/dist/static/css/default.css");
// require("vue-simple-calendar/dist/static/css/holidays-us.css");
const moment = require('moment');

const today = new Date();

export default {
  data() {
    return {
      valid: true,
      selectedDate: today,
      selectedDate2: today,
      filteredItems: [],
      filteredTeam: [],
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
    },
    myEventsSorted: function() {
      return _.orderBy(this.myEvents, 'start');
    },
    teamEventsSorted: function() {
      return _.orderBy(this.teamEvents, 'start');
    }
  },
  components: {
    'full-calendar': require('vue-fullcalendar'),
    HotelDatePicker,
    MyPanel,
  },
  async mounted() {
    this.myEvents = (await EventService.getUserEvents(store.state.user._id)).data.events;
    console.log('mine', this.myEvents);
    console.log(store.state.user.manager);
    console.log(store.state.user._id);
    if (store.state.user.role === "senior manager"){
      this.teamEvents = (await EventService.getEvents()).data.events;
    } else if (store.state.user.role === "manager") {
      // get events of the epoloyees you manage, not the employees your manaager managers
      this.teamEvents = (await EventService.getTeamEvents(store.state.user._id)).data.events;
    } else {
      this.teamEvents = (await EventService.getTeamEvents(store.state.user.manager)).data.events;
    }
    this.getEvents(today);
    console.log('team', this.teamEvents);
  },
  methods: {
    incrementDate (date) {
      let newDate = new Date(date);
      newDate.setDate(newDate.getDate() + 1);
      return this.prettyDate(newDate);
    },
    prettyDate(date) {
      const date1 = new Date(date).toUTCString();
      return date1.split(' ').slice(0, 4).join(' ');
    },
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
      this.selectedDate = day;
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
    dayClickTeam(day, jsEvent) {
      this.selectedDate2 = day;
      console.log('day', day);
      const dateTest = this.convertToUTC(day);
      console.log('dateTest', dateTest);
      const newDate = dateTest.toISOString();
      console.log('iso', newDate);
      this.getTeamEvents(newDate);
      console.log('filtered', this.filteredTeam);
      console.log('dayClick', day, jsEvent);
    },
    moreClick(day, events, jsEvent) {
      console.log('moreCLick', day, events, jsEvent)
    },
    cancelPressed() {
      this.requestModel = false;
      this.$refs.form.reset();
    },
    getEvents(day) {
      this.filteredItems = this.myEvents.filter(function (event) {
        console.log('start', event.start);
        console.log('name', event.name);
        return (event.dates.indexOf(day) > -1); // this returns the event if any days of the event are clicked
      });
    },
    getTeamEvents(day) {
      console.log('taken', store.state.user.taken);
      this.filteredTeam = this.teamEvents.filter(function(event) {
        return (event.dates.indexOf(day) > -1);
      })
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
      let icon = '';
      if (this.selectReason === 'Holiday') {
        css = 'pink lighten-5'; // #F8BBD0
        icon = 'work';
      }
      else if (this.selectReason === 'Appointment') {
        css = 'orange lighten-5'; //#FFE0B2
        icon='event_busy';
      }
      else {
        css = 'cyan lighten-5'; //#B2EBF2
        icon='bubble_chart';
      }

      const manager = (await UsersService.getUser(store.state.user.manager)).data.user;
      console.log('manager', manager);

      const request = {
        employeeId: store.state.user._id,
        managerId: store.state.user.manager,
        title: this.selectReason,
        name: store.state.user.name,
        start: this.startDate,
        end: this.endDate,
        dates: this.getDateRange(this.startDate, this.endDate),
        cssClass: css,
        icon: icon,
        type: 'pending', // Request or Booked
        reason: this.detail, // this could be appointment, holidays -> may only show in your personal cal
        manager: manager,
        email: store.state.user.email,
        warning: this.warning,
      };
      console.log(request);
      let result = {};
      try {
        result = await EventService.addEvent(request);
        // send new request for events here (update them to show new request)
      } catch(error) {
        this.error = error.response.data.error;
      }
      const notification = {
        senderId: store.state.user._id,
        receiverId: store.state.user.manager,
        type: "Time Off Request",
        message: store.state.user.name + " has request time off.",
        data: result.data.createdEvent,
      };
      console.log(notification.data);
      await NotificationService.addNotification(notification);
      this.requestModel = false;
      this.startDate = null;
      this.endDate = null;
      this.$refs.form.reset();
      this.myEvents = (await EventService.getUserEvents(store.state.user._id)).data.events;
      this.teamEvents = (await EventService.getTeamEvents(store.state.user.manager)).data.events;
    },

    getDateRange(startDate, endDate) {
      let dates = [];
      let currentDate = startDate;
      let addDays = function(days) {
        let date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
      };
      while (currentDate < endDate) {
        dates.push(currentDate);
        currentDate = addDays.call(currentDate, 1);
      }
      dates.push(this.endDate);
      return dates;
    },

// Usage
//       var dates = getDates(new Date(2013,10,22), new Date(2013,11,25));
//       dates.forEach(function(date) {
//         console.log(date);
//       });
//     },

    getDifferenceInDays(d1, d2) {
      const timeDiff = Math.abs(d1.getTime() - d2.getTime());
      const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      const daysLeft = store.state.user.allowance - store.state.user.taken - diffDays;
      if (daysLeft < 0) {
        this.warning = "Warning: You have exceeded you're total allowed holidays by " + Math.abs(daysLeft) + " days. A member of admin will be notified along with your manager if you proceed with this request."
      } else {
        this.warning = '';
      }
    },

    setStart(payload) {
      console.log('payload start', payload);
      this.startDate = this.convertToUTC(payload);
      console.log(this.startDate.toISOString());
      console.log('startDate', this.startDate);
    },

    setEnd(payload) {
      console.log('payload', payload);
      if (payload !== null) {
        const yesterday = new Date(payload);
        yesterday.setDate(payload.getDate()-1);
        this.endDate = this.convertToUTC(yesterday);
        this.getDifferenceInDays(this.startDate, this.endDate);
        console.log(this.getDateRange(this.startDate, this.endDate));
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

  .hee {
    overflow: auto;
    border-radius: unset;
    max-height: 500px;
  }

  .hee2 {
    overflow: auto;
    border-radius: unset;
    max-height: 300px;
  }
</style>
