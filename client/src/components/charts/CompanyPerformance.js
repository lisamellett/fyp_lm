import {Line} from 'vue-chartjs';
import {Bar} from 'vue-chartjs';
import UsersService from "../../services/UsersService";
import EventService from "../../services/EventService";
import store from '@/store/store';

export default {

  extends: Bar,
  async mounted () {
    const employees = (await UsersService.getAllUsers()).data.users;
    let latestReviews = [];
    for (let employee in employees) {
      if (employees[employee].reviews.length > 0) {
        latestReviews.push((employees[employee]).reviews[0]);
      }
    }
    const labels = [0, 1, 2, 3 , 4, 5];
    const results = [0, 0, 0, 0, 0, 0];
    for (let i in latestReviews) {
      if (latestReviews[i].fields) {
        results[latestReviews[i].fields.AVERAGE] += 1;
      }
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
