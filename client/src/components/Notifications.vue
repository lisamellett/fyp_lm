<template>
  <div>
    <v-toolbar color="indigo">
      <v-icon>notifications</v-icon>
      <v-toolbar-title class="white--text">Notifications</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>
    </v-toolbar>
    <v-container fluid style="min-height: 0;" grid-list-lg>
    <v-layout column>
    <v-flex xs12 v-for="notification in nots">
      <!--time off request-->
      <v-card raised v-if="notification.type==='Time Off Request'" :to="{name: getLink(notification.type)}" hover class="indigo lighten-4 my-1">
          <v-layout row wrap>
            <v-flex xs12 class="py-0">
            <v-toolbar dark style="border-radius: 3px 3px 0 0" dense flat class="indigo lighten-3">
              <v-icon class="mx-2 white--text">date_range</v-icon>
                {{ notification.type }}
            </v-toolbar>
            </v-flex>
            <v-flex>
            <v-flex xs12 class="body-2 py-0">
              <div>{{ notification.message }}</div>
            </v-flex>
              <v-flex xs12 class="pb-0">
                <!--will have to get rif of if-->
              {{ prettyDate(notification.data.start)}} - {{prettyDate(notification.data.end)}}
              </v-flex>
              <v-flex xs12 class="pt-0" v-if="notification.data.warning !== ''">
                Detail: {{ notification.data.reason }}
              </v-flex>
              <v-flex xs12 class="py-0 red--text caption" v-if="notification.data.warning !== ''">
                Warning: This employee will exceed their total allowance of days off if this request is approved.
              </v-flex>
              <!--<v-layout>-->
              <v-flex xs12>
                <span class="caption white--text">Approve or Dissaprove?</span>
                <v-btn icon white-text @click.prevent="approve(notification.data, notification._id)" dark>
                  <v-icon large>check</v-icon>
                </v-btn>
                <v-btn  icon white-text @click.prevent="disapprove(notification.data, notification._id)" dark>
                  <v-icon large >close</v-icon>
                </v-btn>
              </v-flex>
              <!--</v-layout>-->
          </v-flex>
          </v-layout>
      </v-card>
      <!--others-->
      <v-card v-else-if="notification.type==='Performance Review'" :to="{name: getLink(notification.type)}" hover class="indigo lighten-4 my-1">
        <v-layout row wrap>
          <v-flex xs12 class="py-0">
            <v-toolbar dark style="border-radius: 3px 3px 0 0" dense flat class="indigo lighten-3">
              <v-icon class="mx-2 white--text">flash_on</v-icon>
              {{ notification.type }}
                <v-spacer></v-spacer>
              <v-btn icon @click.prevent="deleteNotification(notification._id)">
                <v-icon>close</v-icon>
              </v-btn>
            </v-toolbar>
          </v-flex>
          <v-flex>
            <v-flex xs12 class="body-2 py-2">
              <div>{{ notification.message }}</div>
            </v-flex>
          </v-flex>
        </v-layout>
      </v-card>
      <v-card v-else :to="{name: getLink(notification.type)}" hover class="indigo lighten-4 my-1">
        <v-layout row wrap>
          <v-flex xs12 class="py-0">
            <v-toolbar dark style="border-radius: 3px 3px 0 0" dense flat class="indigo lighten-3">
              <v-icon class="mx-2 white--text">date_range</v-icon>
              {{ notification.type }}
              <v-spacer></v-spacer>
              <v-btn icon @click.prevent="deleteNotification(notification._id)">
                <v-icon>close</v-icon>
              </v-btn>
            </v-toolbar>
          </v-flex>
          <v-flex>
            <v-flex xs12 class="body-2 py-2">
              <div>{{ notification.message }}</div>
            </v-flex>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
    </v-layout>
    </v-container>
  </div>
</template>

<script>
/* eslint-disable */
import store from '@/store/store';
import NotificationService from '@/services/NotificationService';
import EventService from '@/services/EventService';
import UsersService from "../services/UsersService";

export default {
  props: ['nots'],
  data() {
    return {
      tempNots: this.nots,
    }
  },
  methods: {
    getLink(type) {
      switch(type) {
        case "Performance Review":
          return 'myPerformance'; // have to use
        case "Time Off Request":
          return 'calendar';
        case "Request Approved":
          return 'calendar';
        case "Request Disapproved":
          return 'calendar';
      }
    },
    prettyDate(date) {
      const date1 = new Date(date).toUTCString();
      return date1.split(' ').slice(0, 4).join(' ');
    },
    async approve(event, notificationId) {
      // must include in decrement counter
      const notification = {
        senderId: store.state.user._id,
        receiverId: event.employeeId,
        type: "Request Approved",
        message: store.state.user.name + " has approved your time off from " + this.prettyDate(event.start) + " to " + this.prettyDate(event.end),
        data: event,
      };
      let css = '';
      if (event.title === 'Holiday') {
        css = 'pink lighten-4'; // #F8BBD0
      }
      else if (event.title === 'Appointment') {
        css = 'orange lighten-4'; //#FFE0B2
      }
      else {
        css = 'cyan lighten-4'; //#B2EBF2
      }
      const changes = {
        cssClass: css,
        type: 'approved',
        email: event.email,
      };
      await EventService.updateEvent(event._id, changes);
      await NotificationService.addNotification(notification);
      const taken = (await UsersService.getUser(event.employeeId)).data.user.taken;
      console.log('taken', taken);
      const updateTaken = taken + (event.dates.length - 1);
      console.log('updateTaken', updateTaken);
      const updates = [{
        propName: 'taken',
        value: updateTaken,
      }];
      await UsersService.updateUser(updates, event.employeeId);
      this.deleteNotification(notificationId); // may change this to just update the notification

      // change status
      // change color
      // send email
      // send notification
      // console.log(event);

    },
    async disapprove(event, notificationId) {
      const notification = {
        senderId: store.state.user._id,
        receiverId: event.employeeId,
        type: "Request Disapproved",
        message: store.state.user.name + " has disapproved your time off request from " + this.prettyDate(event.start) + " to " + this.prettyDate(event.end),
        data: event,
      };
      await EventService.deleteEvent(event._id, notification);
      await NotificationService.addNotification(notification);
      this.deleteNotification(notificationId);
      // delete request
      // send email
      // send notification

    },
    async deleteNotification(notificationId) {
      await NotificationService.deleteNotification(notificationId);
      this.$parent.$options.parent.apiCall(); // cause vue doesnt like mutating props form child component
    }
  },
}
</script>

<style scoped>
  .rotate1 {
    transform: rotate(45deg);
    display: inline-block;
  }
</style>
