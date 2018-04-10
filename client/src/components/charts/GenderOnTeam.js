import {Line} from 'vue-chartjs';
import {Doughnut} from 'vue-chartjs';
import {Pie} from 'vue-chartjs';
import UsersService from "../../services/UsersService";
import store from '../../store/store';

export default {

  extends: Doughnut,
  async mounted () {

    this.gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
    this.gradient2 = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
    this.gradient.addColorStop(0, 'rgba(255, 102, 255, 0.5)');
    // this.gradient.addColorStop(0.5, 'rgba(255, 153, 0, 0.8)');
    this.gradient.addColorStop(1, 'rgba(102, 0, 102, 1)');
    this.gradient2.addColorStop(0, 'rgba(255, 51, 0, 1)');
    //this.gradient2.addColorStop(0.5, 'rgba(0, 204, 153, 0.8)');
    this.gradient2.addColorStop(1, 'rgba(255, 153, 0, 0.5');

    let users = [];
    if ((store.state.user.role === 'senior manager') || (store.state.user.role === 'manager')) {
      users = (await UsersService.getManagersEmployees(store.state.user._id)).data.employees;
    }else {
      users = (await UsersService.getManagersEmployees(store.state.user.manager)).data.employees;
    }
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
          backgroundColor: [this.gradient, this.gradient2],
          data: [male, female],
          hoverBackgroundColor: [this.gradient, this.gradient2],
          hoverBorderWidth: 2,
          hoverBorderColor: ['purple', '#ff3300'],
        }
      ]
    }, {responsive: true, maintainAspectRatio: false})

  }
}
