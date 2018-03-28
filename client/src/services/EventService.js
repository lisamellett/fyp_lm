import Api from '@/services/Api';

export default {
  getUserEvents(userId) {
    return Api().get('/events/' + userId); // may have to create a new endpoint for this
  },

  updateEvent(eventId, changes) {
    console.log('update', changes);
    console.log(eventId);
    return Api().patch('/events/' + eventId, changes);
  },

  deleteEvent(eventId) {
    return Api().delete('events/' + eventId);
  },

  getTeamEvents(managerId) {
    return Api().get('events/team/' + managerId);
  },

  // getManagersEmployees(managerId) {
  //   return Api().get('employees/' + managerId);
  // },
  //
  addEvent(event) {
    return Api().post('/events', event);
  },
}
