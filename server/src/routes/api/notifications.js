const NotificationController = require('../../controllers/NotificationController');

module.exports = (app) => {

  app.get('/notifications',
    // isAuthenticated,
    // AuthenticationController.roleAuthorization(['admin']),
    // add above two lines back in when finished testing
    NotificationController.notifications);

  app.post('/notifications',
    NotificationController.addNotification);

  app.get('/notifications/:userId',
    NotificationController.getOneUserNotifications); // not sure if the end point is being used yet

  app.delete('/notifications/:notificationId',
    NotificationController.deleteNotification);
};