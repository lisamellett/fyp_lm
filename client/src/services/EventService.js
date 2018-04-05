/* eslint-disable */
import Api from '../services/Api';

export default {
  getUserEvents(userId) {
    return Api().get('/events/' + userId); // may have to create a new endpoint for this
  },

  updateEvent(eventId, changes) {
    console.log('update', changes);
    console.log(eventId);
    return Api().patch('/events/' + eventId, changes);
  },

  deleteEvent(eventId, data) {
    console.log('data', data);
    return Api().delete('events/' + eventId, data);
  },

  getTeamEvents(managerId) {
    return Api().get('events/team/' + managerId);
  },

  getApprovedEvents(userId) {
    return Api().get('eventsapproved/' + userId);
  },

  addEvent(event) {
    return Api().post('/events', event);
  },

  getEvents() {
    return Api().get('/events');
  }
}
