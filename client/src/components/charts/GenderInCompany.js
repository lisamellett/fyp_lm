import {Line} from 'vue-chartjs';
import {Bar} from 'vue-chartjs';
import {Pie} from 'vue-chartjs';
import UsersService from "../../services/UsersService";
import store from '@/store/store';

export default {

  extends: Pie,
  async mounted () {
    let users = (await UsersService.getAllUsers()).data.users;
    let female = 0;
    let male = 0;

    for (let user in users) {
      if (users[user].gender === 'female') {
        female += 1;
      }else {
        male+= 1;
      }
    }
    let labels = ['Male', 'Female'];

    this.renderChart({
      labels: labels,
      datasets: [
        {
          label: 'Review Average Score',
          backgroundColor: ['#EA80FC', '#B3E5FC'],
          data: [male, female],
        }
      ]
    }, {responsive: true, maintainAspectRatio: false, scales: {
        yAxes: [{
          display: true,
          ticks: {
            suggestedMax: 5,    // minimum will be 0, unless there is a lower value.
            // OR //
            beginAtZero: true   // minimum value will be 0.
          }
        }]
      }})

  }
}
