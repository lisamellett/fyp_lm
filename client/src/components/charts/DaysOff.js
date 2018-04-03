import {Line} from 'vue-chartjs';
import {Bar} from 'vue-chartjs';
import UsersService from "../../services/UsersService";
import EventService from "../../services/EventService";
import store from '@/store/store';

export default {

  extends: Line,
  data () {
    return {
      gradient: null,
      gradient2: null
    }
  },

  async mounted () {

    this.gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
    this.gradient2 = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
    this.gradient.addColorStop(0, 'rgba(0, 0, 255, 1)');
    this.gradient.addColorStop(0.5, 'rgba(0, 153, 255, 0.8)');
    this.gradient.addColorStop(1, 'rgba(0, 255, 255, 0.6)');

    const months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthValues = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    // only want to get the ones that are approved
    const events = (await EventService.getApprovedEvents(store.state.user._id)).data.events;
    const dates1 = [];
    for (let event in events) {
      for (let date in (events[event]).dates) {
        dates1.push(((events[event]).dates)[date]);
      }
    }

    for (let date in dates1) {
      let d = new Date(dates1[date]);
      monthValues[d.getMonth()] += 1;
    }
    // go through dates1 and increment counters??

    this.renderChart({
      labels: months,
      datasets: [
        {
          label: 'Days Off per Month',
          borderColor: 'rgb(129, 212, 250)',
          pointBackgroundColor: 'white',
          borderWidth: 1,
          // pointBorderColor: '129, 212, 25',
          backgroundColor: this.gradient,
          data: monthValues,
        }
      ]
    }, {responsive: true, maintainAspectRatio: false,})

  }
}
