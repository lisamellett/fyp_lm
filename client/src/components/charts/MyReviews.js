import {Bar} from 'vue-chartjs';
import UsersService from "../../services/UsersService";
import store from '../../store/store';

export default {

  extends: Bar,
  async mounted () {

    this.gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
    this.gradient2 = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
    this.gradient.addColorStop(0, 'rgba(0, 103, 153, 1)');
    this.gradient.addColorStop(0.5, 'rgba(0, 204, 153, 0.8)');
    this.gradient.addColorStop(1, 'rgba(153, 255, 204, 0.6)');

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
          label: 'Average Score',
          //backgroundColor: 'rgba(0, 204, 153, 0.7)',
          borderColor: 'rgb(0, 255, 204)',
          pointBackgroundColor: 'white',
          borderWidth: 1,
          // pointBorderColor: '129, 212, 25',
          backgroundColor: this.gradient,
          hoverBackgroundColor: this.gradient,
          hoverBorderWidth: 2,
          hoverBorderColor: '#009999',
          data: scores,
        }
      ]
    }, {responsive: true, maintainAspectRatio: false, scales: {
        yAxes: [{
          display: true,
          ticks: {
            suggestedMax: 5,    // minimum will be 0, unless there is a lower value.
            // OR //
            beginAtZero: true ,  // minimum value will be 0.
            autoSkip: false,
          }
        }],
        xAxes: [{
          ticks: {
            autoSkip: false,
            minRotation: 45,
          }
        }],
      }})

  }
}
