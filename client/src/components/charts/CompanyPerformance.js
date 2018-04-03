import {Line} from 'vue-chartjs';
import {Bar} from 'vue-chartjs';
import UsersService from "../../services/UsersService";
import EventService from "../../services/EventService";
import store from '@/store/store';

export default {

  extends: Bar,
  async mounted () {

    this.gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450);
    this.gradient.addColorStop(0, 'rgba(0, 103, 153, 1)');
    this.gradient.addColorStop(0.5, 'rgba(0, 204, 153, 0.8)');
    this.gradient.addColorStop(1, 'rgba(153, 255, 204, 0.6)');

    const employees = (await UsersService.getAllUsers()).data.users;
    let latestReviews = [];
    for (let employee in employees) {
      if (employees[employee].reviews.length > 0) {
        latestReviews.push((employees[employee]).reviews[0]);
      }
    }
    const labels = ['Score: 0', 'Score: 1', 'Score: 2', 'Score: 3' , 'Score: 4', 'Score: 5'];
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
          label: 'Number of Team Members',
          borderColor: 'rgb(0, 255, 204)',
          pointBackgroundColor: 'white',
          borderWidth: 1,
          // pointBorderColor: '129, 212, 25',
          backgroundColor: this.gradient,
          hoverBackgroundColor: this.gradient,
          hoverBorderWidth: 2,
          hoverBorderColor: '#009999',
          data: results,
        }
      ]
    }, {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            userCallback: function(label, index, labels) {
              // when the floored value is the same as the value we have a whole number
              if (Math.floor(label) === label) {
                return label;
              }

            },
          }
        }],
      },})

  }
}
