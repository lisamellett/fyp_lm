import {Pie} from 'vue-chartjs';
import UsersService from "../../services/UsersService";
import store from '@/store/store';

export default {

  extends: Pie,
  async mounted () {

    this.gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
    this.gradient2 = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
    this.gradient.addColorStop(0, 'rgba(255, 102, 255, 0.5)');
    // this.gradient.addColorStop(0.5, 'rgba(255, 153, 0, 0.8)');
    this.gradient.addColorStop(1, 'rgba(102, 0, 102, 1)');
    this.gradient2.addColorStop(0, 'rgba(255, 51, 0, 1)');
    //this.gradient2.addColorStop(0.5, 'rgba(0, 204, 153, 0.8)');
    this.gradient2.addColorStop(1, 'rgba(255, 153, 0, 0.5');

    this.user = (await UsersService.getUser(store.state.user._id)).data.user;
    this.taken = this.user.taken;
    this.remaining = this.user.allowance - this.taken;


    let labels = ['Taken', 'Remaining'];

    this.renderChart({
      labels: labels,
      datasets: [
        {
          label: 'Review Average Score',
          backgroundColor: [this.gradient, this.gradient2],
          data: [this.taken, this.remaining],
          hoverBackgroundColor: [this.gradient, this.gradient2],
          hoverBorderWidth: 2,
          hoverBorderColor: ['purple', '#ff3300'],
        }
      ]
    }, {responsive: true, maintainAspectRatio: false})

  }
}
