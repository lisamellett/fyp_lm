import {Line} from 'vue-chartjs';
import {Bar} from 'vue-chartjs';
import {Pie} from 'vue-chartjs';
import UsersService from "../../services/UsersService";
import store from '@/store/store';

export default {

  extends: Bar,
  async mounted () {
    console.log('here');
    console.log(store.state.user._id);
    let reviews = (await UsersService.getUser(store.state.user._id)).data.user.reviews.reverse();
    if (reviews.length > 5) {
      reviews = reviews.slice(reviews.length - 5, reviews.length);
    }
    let labels = [];
    let scores = [];
    for (let review in reviews) {
      labels.push(reviews[review].date);
      scores.push(reviews[review].fields.AVERAGE);
    }

    this.renderChart({
      labels: labels,
      datasets: [
        {
          label: 'Review Average Score',
          backgroundColor: '#EA80FC',
          data: scores,
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
