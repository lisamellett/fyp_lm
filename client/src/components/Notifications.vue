<template>
  <div>
    <v-toolbar color="pink">
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
      <v-card v-if="notification.type==='Time Off Request'" :to="{name: getLink(notification.type)}" hover color="cyan darken-2" class="white--text">
        <v-container>
          <v-layout wrap>
            <v-flex xs12 class="headline">
              {{ notification.type }}
            </v-flex>
            <v-flex xs12>
              <div>{{ notification.message }}</div>
              <span>
                <!--will have to get rif of if-->
              {{ prettyDate(notification.data.start)}} - {{prettyDate(notification.data.end)}}
              </span>
              <span v-if="notification.data.warning !== ''">
                Warning: This employee will exceed there total allowance of days off if this request is approved.
              </span>
            </v-flex>
            <v-flex xs12>
              <v-btn @click.prevent="approve(notification.data, notification._id)">Approve</v-btn>
              <v-btn @click.prevent="disapprove(notification.data, notification._id)">Disapprove</v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
      <!--others-->
      <v-card v-else :to="{name: getLink(notification.type)}" hover color="cyan darken-2" class="white--text">
        <v-container>
          <v-layout wrap>
            <v-flex xs9 class="headline">
                  {{ notification.type }}
                </v-flex>
            <v-flex xs3>
                  <v-btn icon @click.stop="deleteNotification(notification._id)">
                    <v-icon>close</v-icon>
                  </v-btn>
            </v-flex>
            <v-flex xs12>
                <div>{{ notification.message }}</div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
    </v-layout>
    </v-container>
  </div>
</template>

<script>
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
        case "review":
          return 'myPerformance'; // have to use
        case "Time Off Request":
          return 'calendar';
        case "Time Off Request Approved":
          return 'calendar';
        case "Time Off Request Disapproved":
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
        type: "Time Off Request Approved",
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
        type: "Time Off Request Disapproved",
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
