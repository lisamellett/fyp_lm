import {Line} from 'vue-chartjs';
import {Bar} from 'vue-chartjs';
import UsersService from "../../services/UsersService";
import EventService from "../../services/EventService";
import store from '@/store/store';

export default {

  extends: Line,
  async mounted () {
    const months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthValues = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    // only want to get the ones that are approved
    const events = (await EventService.getEvents()).data.events;
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
          backgroundColor: '#81D4FA',
          data: monthValues,
        }
      ]
    }, {responsive: true, maintainAspectRatio: false,})

  }
}
