/* eslint-disable */
import Api from '@/services/Api';

export default {
  getAllUsers() {
    return Api().get('users'); // may have to create a new endpoint for this
  },

  getUser(userId) {
    return Api().get('users/' + userId);
  },

  updateUser(updates, userId) {
    console.log('update');
    return Api().patch('/users/' + userId, updates);
  },

  deleteUser(userId) {
    return Api().delete('users/' + userId);
  },

  getManagers() {
    return Api().get('managers');
  },

  getManagersEmployees(managerId) {
    return Api().get('employees/' + managerId);
  },

  addReview(userId, review) {
    return Api().post('/reviews/' + userId, review);
  },
}
