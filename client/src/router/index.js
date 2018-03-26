import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import Register from '@/components/Register';
import Login from '@/components/Login';
import Calendar from '@/components/Calendar';
import Employees from '@/components/Employees';
import Profile from '@/components/Profile';
import Performance from '@/components/Performance';
import MyPerformance from '@/components/MyPerformance';
import Calendar2 from '@/components/Calendar2';

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
      path: '/team-calender',
      name: 'teamCalendar',
      component: Calendar2,
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
    }
  ],
});
