import {Line} from 'vue-chartjs';
import {Bar} from 'vue-chartjs';
import {Pie} from 'vue-chartjs';
import UsersService from "../../services/UsersService";
import store from '../../store/store';

export default {

  extends: Line,
  async mounted () {
    let users = (await UsersService.getManagersEmployees(store.state.user._id)).data.employees;

    const colors = ['rgba(234, 128, 252, 0.5)', 'rgba(0, 102, 204, 0.5)', 'rgba(0, 150, 233, 0.5)', 'rgba(255, 128, 171, 0.5)', 'rgba(140, 158, 255, 0.5)', 'rgba(128, 203, 196, 0.5)', 'rgba(101, 225, 105, 0.5)', 'rgba(255, 183, 77, 0.5)','rgba(24, 255, 255, 0.5)', 'rgba(213, 0, 249, 0.5)', 'rgba(0, 102, 204, 0.5)', 'rgba(255, 255, 0, 0.5)'];

    let datasets = [];
    for (let user in users) {
      let reviews = users[user].reviews.reverse();
      if (reviews.length > 5) {
        reviews = reviews.slice(reviews.length - 5, reviews.length);
      }
      let labels = [];
      let scores = [];
      for (let review in reviews) {
        labels.push(reviews[review].date);
        scores.push(reviews[review].fields.AVERAGE);
      }
      datasets.push({
        label: users[user].name,
        backgroundColor: colors[user],
        data: scores,
        opacity: 0.2,
      })
    }

    this.renderChart({
      labels: ['Review 1', 'Review 2', 'Review 3', 'Review 4', 'Review 5'],
      datasets: datasets,
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
