const EventController = require('../../controllers/EventController');

module.exports = (app) => {

  app.get('/events',
    // isAuthenticated,
    // AuthenticationController.roleAuthorization(['admin']),
    // add above two lines back in when finished testing
    EventController.events);

  app.post('/events',
    EventController.addEvent);

  app.get('/events/:userId',
    EventController.getOneUserEvents);

  app.get('/events/team/:managerId',
    EventController.getTeamEvents);

  app.delete('/events/:eventId',
    EventController.deleteEvent);

  app.patch('/events/:eventId',
    // to update users the user has to be logged in
    EventController.updateToBooked);
};