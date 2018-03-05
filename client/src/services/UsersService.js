import Api from '@/services/Api';

export default {
  getAllUsers() {
    return Api().get('users'); // may have to create a new endpoint for this
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
  }
}
