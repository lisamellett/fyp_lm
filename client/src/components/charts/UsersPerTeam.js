import {Line} from 'vue-chartjs';
import {Bar} from 'vue-chartjs';
import {Pie} from 'vue-chartjs';
import UsersService from "../../services/UsersService";
import store from '@/store/store';

export default {

  extends: Pie,
  async mounted () {

    const users = (await UsersService.getAllUsers()).data.users;
    const managers = (await UsersService.getManagers()).data.managers;
    let teams = {};
    for (let x in managers) {
      teams[managers[x].team] = 0;
    }
    console.log(teams);
    console.log(users);
    let female = 0;
    let male = 0;

    for (let u in users) {
      console.log(users[u].team);
      console.log(teams[users[u].team]);
      if (users[u].team in teams) {
        console.log(users[u].team);
        teams[users[u].team] ++;
      }
    }
    console.log(teams);

    // for (let user in users) {
    //   if (users[user].gender === 'female') {
    //     female += 1;
    //   }else {
    //     male+= 1;
    //   }
    // }
    // let labels = ['Male', 'Female'];

    this.renderChart({
      labels: Object.keys(teams),
      datasets: [
        {
          label: 'Employees per Team',
          backgroundColor: ['#EA80FC', '#B3E5FC', '#D1C4E9', '#FF80AB', '#8C9EFF', '#80CBC4', '#A5D6A7', '#FFB74D','#18FFFF', '#D500F9', '#C2185B', '#CE93D8'],
          data: Object.values(teams),
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
