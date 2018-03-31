import {Line} from 'vue-chartjs';
import {Bar} from 'vue-chartjs';
import UsersService from "../../services/UsersService";
import EventService from "../../services/EventService";
import store from '@/store/store';

export default {

  extends: Bar,
  async mounted () {

    let employees = [];
    if ((store.state.user.role === 'senior manager') || (store.state.user.role === 'manager')) {
      console.log('hereeeeee');
      employees = (await UsersService.getManagersEmployees(store.state.user._id)).data.employees;
    }else {
      employees = (await UsersService.getManagersEmployees(store.state.user.manager)).data.employees;
    }
    let latestReviews = [];
    for (let employee in employees) {
      console.log(employees[employee]);
      if (employees[employee].reviews.length > 0) {
        console.log('here');
        latestReviews.push((employees[employee]).reviews[0]);
      }
      else{
        console.log('y');
      }
    }
    console.log('latestReviews', latestReviews);
    const labels = [0, 1, 2, 3 , 4, 5];
    const results = [0, 0, 0, 0, 0, 0];
    console.log(results);
    for (let i in latestReviews) {
      results[latestReviews[i].fields.AVERAGE] += 1;
    }
    this.renderChart({
      labels: labels,
      datasets: [
        {
          label: 'Latest Performance Average Scores',
          backgroundColor: '#81D4FA',
          data: results,
        }
      ]
    }, {responsive: true, maintainAspectRatio: false,})

  }
}
