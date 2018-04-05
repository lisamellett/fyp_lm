/* eslint-disable */
import Api from '@/services/Api';

export default {
  getUserNotifications(userId) {
    return Api().get('/notifications/' + userId); // may have to create a new endpoint for this
  },

  // updateUser(updates, userId) {
  //   console.log('update');
  //   return Api().patch('/users/' + userId, updates);
  // },
  //
  deleteNotification(notificationId) {
    return Api().delete('notifications/' + notificationId);
  },

  // getManagers() {
  //   return Api().get('managers');
  // },
  //
  // getManagersEmployees(managerId) {
  //   return Api().get('employees/' + managerId);
  // },
  //
  addNotification(notification) {
    return Api().post('/notifications', notification);
  },
}
