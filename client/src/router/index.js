/* eslint-disable */
import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '../components/HelloWorld';
import Register from '../components/Register';
import Login from '../components/Login';
import Calendar from '../components/Calendar';
import Employees from '../components/Employees';
import Profile from '../components/Profile';
import Performance from '../components/Performance';
import MyPerformance from '../components/MyPerformance';
import Metrics from '../components/Metrics';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: HelloWorld,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/calender',
      name: 'calendar',
      component: Calendar,
    },
    {
      path: '/employees',
      name: 'employees',
      component: Employees,
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
    },
    {
      path: '/performance',
      name: 'performance',
      component: Performance,
    },
    {
      path: '/my-performance',
      name: 'myPerformance',
      component: MyPerformance,
    },
    {
      path: '/metrics',
      name: 'metrics',
      component: Metrics,
    }
  ],
});
