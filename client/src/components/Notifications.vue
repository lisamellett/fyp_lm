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
      <v-card :to="{name: getLink(notification.type)}" hover color="cyan darken-2" class="white--text">
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
      }
    },
    async deleteNotification(notificationId) {
      await NotificationService.deleteNotification(notificationId);
      this.$parent.$options.parent.apiCall(); // cause vue doesnt like mutating props form child component
    }
  },
}
</script>
