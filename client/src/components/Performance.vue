<template>
  <v-container>
    <v-card>
      <v-dialog
      v-model="viewDialog"
      fullscreen
      transition="dialog-bottom-transition"
      :overlay="false"
      scrollable
      >
        <v-card tile class="grey lighten-5">
          <v-toolbar card dark color="primary">
            <v-btn icon @click.native="closeViewDialog" dark>
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>{{currentViewEmployee.name}}'s Performance Reviews</v-toolbar-title>
            <v-spacer></v-spacer>
              <v-tooltip bottom>
                <v-btn slot="activator" icon dark flat @click="addReview(currentViewEmployee)">
                  <v-icon>add_circle</v-icon>
                </v-btn>
                <span>Add New Review</span>
              </v-tooltip>
          </v-toolbar>
            <v-alert type="success"  dismissible v-model="successAlert">
              The review has successfully been added
            </v-alert>
            <v-layout>
              <v-flex xs8 class="mr-4 ml-4 mt-4">
                <v-text-field
                  append-icon="search"
                  label="Search"
                  single-line
                  hide-details
                  v-model="searchItem"
                  v-on:keyup="searchInTheList(searchItem)"
                ></v-text-field>
                <span class="help is-dark"><strong>{{filteredItems.length}}</strong> of {{ currentViewEmployee.reviews.length}} reviews found</span>
                <v-expansion-panel popout>
                  <v-expansion-panel-content v-for="(review) in paginatedItems" :key="review._id">
                    <div slot="header" class="subheader">{{ review.date }}</div>
                    <v-card>
                      <v-card-text>
                        <table align="left" class="mr-4 performance">
                          <tr class="cyan performancetr">
                            <th class="performanceth">Skill</th>
                            <th class="performanceth">Score</th>
                          </tr>
                          <tr class="performancetr" v-for="(value,field) in review.fields">
                            <td class="performancetd">{{ field }}: </td>
                            <td class="performancetd">
                              <v-icon small v-for="i in value">grade</v-icon>
                              <v-icon color="grey lighten-2" small v-for="i in (10-value)">grade</v-icon>
                            </td>
                          </tr>
                        </table>
                        <div>
                          <h4 class="grey--text">Feedback: </h4>
                          <p>{{ review.feedback }}</p>
                        </div>
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <div class="btn-toolbar mt-3">
                  <div class="pagination">
                    <v-layout row>
                      <v-flex>
                        <v-btn icon class="mt-0" v-on:click="selectPage(pagination.currentPage - 1)" :disabled="pagination.currentPage===pagination.items[0] || pagination.items.length===0">
                          <v-icon>keyboard_arrow_left</v-icon>
                        </v-btn>
                      </v-flex>
                      <v-flex>
                        <a v-for="item in pagination.filteredItems"  v-on:click="selectPage(item)" :class="{active:item === selected}">{{item}}</a>
                      </v-flex>
                      <v-flex>
                        <v-btn icon class="mt-0" v-on:click="selectPage(pagination.currentPage+1)" :disabled="pagination.currentPage===(pagination.items[pagination.items.length-1] || pagination.items.length===0)">
                          <v-icon>keyboard_arrow_right</v-icon>
                        </v-btn>
                      </v-flex>
                    </v-layout>
                  </div>
                </div>
              </v-flex>
              <v-flex xs4 class="ml-4 mr-4 mt-4">
                <div class="white elevation-2">
                  <v-card class="pl-4 pr-4 pt-2 pb-2">
                    <v-card-title class="subheading">
                      Most Recent Review
                      <v-spacer></v-spacer>
                      <div class="subheader" v-if="currentViewEmployee.reviews[0]"> {{ currentViewEmployee.reviews[0].date }}</div>
                    </v-card-title>

                    <table class="performance" v-if="currentViewEmployee.reviews[0]">
                      <tr class="cyan performancetr">
                        <th class="performanceth">Skill</th>
                        <th class="performanceth">Score</th>
                      </tr>
                      <tr class="performancetr" v-for="(value,field) in currentViewEmployee.reviews[0].fields">
                        <td class="performancetd">{{ field }}: </td>
                        <td class="performancetd">
                          <v-icon small v-for="i in value">grade</v-icon>
                          <v-icon color="grey lighten-2" small v-for="i in (10-value)">grade</v-icon>
                        </td>
                      </tr>
                    </table>
                    <div>
                      <h4 class="grey--text" align="left">Feedback:</h4>
                      <p v-if="currentViewEmployee.reviews[0]">{{ currentViewEmployee.reviews[0].feedback }}</p>
                    </div>
                  </v-card>
                </div>
              </v-flex>
            </v-layout>
          <div style="flex: 1 1 auto;"/>
        </v-card>
      </v-dialog>
      <v-dialog v-model="addDialog">
        <v-card tile>
          <v-alert type="error" dismissible v-model="blankFieldAlert">
            Please enter a field name
          </v-alert>
          <v-toolbar card dark color="primary">
            <v-btn icon @click.native="cancelPressed" dark>
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>New Review for {{ currentEmployee.name }}</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <div>
              <v-stepper v-model="e1">
                <v-stepper-header>
                  <v-stepper-step step="1" :complete="e1 > 1">Review</v-stepper-step>
                  <v-divider></v-divider>
                  <v-stepper-step step="2" :complete="e1 > 2">Additional Feedback</v-stepper-step>
                  <v-divider></v-divider>
                  <v-stepper-step step="3">Submit</v-stepper-step>
                </v-stepper-header>
                <v-stepper-items>
                  <v-stepper-content step="1">
                    <v-card class="mb-5">
                      <v-card-title align="left" v-if="currentEmployee" class="subheading">Please rate {{ currentEmployee.name }} on the following:</v-card-title>
                      <v-layout v-for="(value, field) in fields" :key="" row wrap>
                        <v-flex xs1>
                          <v-btn icon class="mx-0" @click.stop="removeField(field)">
                            <v-icon color="pink">remove_circle</v-icon>
                          </v-btn>
                        </v-flex>
                        <v-flex xs8>
                          <v-slider :label="field" :max="10" v-model="fields[field]"></v-slider>
                        </v-flex>
                        <v-flex xs3>
                          <v-text-field :max="10" :min="0" v-model="fields[field]" type="number"></v-text-field>
                        </v-flex>
                      </v-layout>
                      <v-layout>
                        <v-flex xs1>
                          <!--<v-dialog v-model="dialog" persistent max-width="300px">-->
                          <v-btn icon class="mx-0" slot="activator" @click.native="addField(newField)">
                            <v-icon color="green">add_circle</v-icon>
                          </v-btn>
                        </v-flex>
                        <v-flex xs2>
                          <v-text-field placeholder="add new field" v-model="newField"></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-card>
                    <v-btn color="primary" @click.native="e1=2">Continue</v-btn>
                    <v-btn flat @click="cancelPressed">Cancel</v-btn>
                  </v-stepper-content>
                  <v-stepper-content step="2">
                    <v-card class="mb-5">
                      <v-layout row>
                        <v-flex xs2>
                          <v-subheader v-if="currentEmployee">Provide {{ currentEmployee.name }} with some feedback:</v-subheader>
                        </v-flex>
                        <v-flex xs10>
                          <v-text-field
                            name="feedback"
                            label="Feedback"
                            v-model="feedback"
                            multi-line
                          ></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-card>
                    <v-btn flat @click="backPressed">Back</v-btn>
                    <v-btn color="primary" @click.native="e1 = 3">Continue</v-btn>
                    <v-btn flat @click="cancelPressed">Cancel</v-btn>
                  </v-stepper-content>
                  <v-stepper-content step="3">
                    <v-card v-if="currentEmployee" class="mb-5">
                      <h3 class="title">Review</h3>
                      <v-layout row wrap>
                        <v-flex xs6 offset-xs3>
                          <span class="grey--text">Employee: </span>
                          <span>{{ currentEmployee.name }}</span>
                        </v-flex>
                        <v-flex xs12>
                          <table class="performance">
                            <tr class="performancetr">
                              <th class="performanceth">Skill</th>
                              <th class="performanceth">Score</th>
                            </tr>
                            <tr class="performancetr" v-for="(value, field) in fields">
                              <td class="performancetd">{{field}} : </td>
                              <td class="performancetd">
                                <v-icon small v-for="i in value">grade</v-icon>
                                <v-icon color="grey lighten-2" small v-for="i in (10-value)">grade</v-icon>
                              </td>
                            </tr>
                          </table>
                        </v-flex>
                        <v-flex xs6 offset-xs3>
                          <div>
                            <span class="grey--text">Feedback: </span>
                            <span>{{feedback}}</span>
                          </div>
                        </v-flex>
                      </v-layout>
                    </v-card>
                    <v-btn flat @click="backPressed">Back</v-btn>
                    <v-btn color="primary" @click="submitPressed">Submit</v-btn>
                    <v-btn flat @click="cancelPressed">Cancel</v-btn>
                  </v-stepper-content>
                </v-stepper-items>
              </v-stepper>
            </div>
          </v-card-text>

          <div style="flex: 1 1 auto;"/>
        </v-card>
      </v-dialog>

      <v-alert type="success"  dismissible v-model="successAlert">
        The review has successfully been added
      </v-alert>
      <v-alert type="error" dismissible v-model="errorAlert">
        Unable to add review
      </v-alert>

      <v-card-title>
        Employees Managed By Me
        <v-spacer></v-spacer>
        <v-text-field
          append-icon="search"
          label="Search"
          single-line
          hide-details
          v-model="search"
        ></v-text-field>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="employees"
        :search="search"
        :rows-per-page-items="rowsPerPage"
        class="elevation-1"
        item-key="_id"
      >
        <template slot="items" slot-scope="props">
          <tr>
            <td class="text-xs-left">{{ props.item.name }}</td>
            <td class="text-xs-right">{{ props.item.role }}</td>
            <td class="text-xs-right">{{ props.item.title }}</td>
            <td class="text-xs-right">{{ props.item.team }}</td>
            <td class="justify-center layout px-0">
              <v-tooltip left>
              <v-btn slot="activator" icon class="mx-0" @click.stop="viewReviews(props.item)">
                <v-icon color="blue">remove_red_eye</v-icon>
              </v-btn>
                <span>View Reviews</span>
              </v-tooltip>
              <v-tooltip right>
              <v-btn  slot="activator" icon class="mx-0" @click.stop="addReview(props.item)">
                <v-icon color="green">add_circle</v-icon>
              </v-btn>
                <span>Add Review</span>
              </v-tooltip>
            </td>
          </tr>
        </template>
        <v-alert slot="no-results" :value="true" color="error" icon="warning">
          Your search for "{{ search }}" found no results.
        </v-alert>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import UsersService from '@/services/UsersService';
import NotificationService from '@/services/NotificationService';
import store from '../store/store';

export default {
  data () {
    return {
      search: '',
      search1: '',
      addDialog: false,
      viewDialog: false,
      rowsPerPage: [10,25,{"text":"All","value":-1}],
      currentEmployee: {
        name: '',
        role: '',
        dob: '',
        gender: '',
        team: '',
        taken: '',
        allowance: '',
        manager: '',
        email: '',
        title: '',
        reviews: [],
      },
      currentViewEmployee: {
        name: '',
        role: '',
        dob: '',
        gender: '',
        team: '',
        taken: '',
        allowance: '',
        manager: '',
        email: '',
        title: '',
        reviews: [],
      },
      headers: [
        {
          text: 'Employees',
          align: 'left',
          sortable: true,
          value: 'name'
        },
        { text: 'Role', value: 'role' },
        { text: 'Job Title', value: 'title' },
        { text: 'Team', value: 'team' },
        { text: 'Performance Actions', value: 'actions', sortable: false, align: 'center'},
      ],
      e1: 0,
      employees: [],
      // selectedEmployee: null,
      selectedEmployeeToView: {
        reviews: [
          {
            date: '18/19/1990',
            fields: {
              sbdjhba: 0,
              ebshjdb: 2,
            },
            feedback: 'ekdhbjhad',
          }
        ]
      },
      communication: 0,
      cooperation: 0,
      punctuality: 0,
      qualityOfWork: 0,
      feedback: null,
      error: null,
      successAlert: false,
      errorAlert: false,
      blankFieldAlert: false,
      fields: {
        "communication": 0,
        "cooperation": 0,
        "punctuality": 0,
        "quality of work": 0,
      },
      newField: '',
      // perPage: 6,
      // pagination: {},
      selected: null,
      searchItem: '',
      filteredItems: [],
      paginatedItems: [],
      selectedItems: [],
      pagination: {
        range: 5,
        currentPage: 1,
        itemPerPage: 6,
        items: [],
        filteredItems: [],
      },
    }
  },
  async mounted() {
    this.filteredItems = this.currentViewEmployee.reviews;
    this.buildPagination();
    this.selectPage(1);
    // do a request to the backend for all the users
    // so when the page is loaded do a request to backend - may need to do this fo rmanagers register page
    this.employees = (await UsersService.getManagersEmployees(store.state.user._id)).data.employees;
    console.log(this.employees);
    // this will do a get request the moment the page is mounted
  },
  methods: {
    backPressed() {
      this.e1 -= 1;
    },
    cancelPressed() {
      this.addDialog = false;
      this.e1 = 1;
      this.communication = 0;
      this.cooperation = 0;
      this.punctuality = 0;
      this.qualityOfWork = 0;
      this.feedback = null;
      this.error = null;
      this.fields = {
        "communication": 0,
        "cooperation": 0,
        "punctuality": 0,
        "quality of work": 0,
      };
    },
    async submitPressed() {
      try {
        const review = {
          authorId: store.state.user._id,
          fields: this.fields,
          feedback: this.feedback,
          date: new Date(),
          email: this.currentEmployee.email,
        };
        const notification = {
          senderId: store.state.user._id,
          receiverId: this.currentEmployee._id,
          type: "review",
          message: "A new review has been submitted by your manager"
        };
        console.log('frontend', review.email);
        await UsersService.addReview(this.currentEmployee._id, review);
        await NotificationService.addNotification(notification);
        this.e1 = 1;
        this.communication = 0;
        this.cooperation = 0;
        this.punctuality = 0;
        this.qualityOfWork = 0;
        this.feedback = null;
        this.error = null;
        this.successAlert = true;
        this.fields = {
          "communication": 0,
            "cooperation": 0,
            "punctuality": 0,
            "quality of work": 0,
        };
        this.addDialog = false;
        setTimeout(()=> {
          this.successAlert = false;
        }, 5000);
      } catch (err) {
        this.errorAlert = true;
        setTimeout(() => {
          this.errorAlert = false;
        }, 5000);
      }
    },
    addReview(employee) {
      this.currentEmployee = employee;
      console.log(employee.email);
      this.addDialog = true;
    },
    viewReviews(employee1) {
      this.currentViewEmployee = employee1;
      console.log(this.currentViewEmployee.name);
      this.filteredItems = this.currentViewEmployee.reviews;
      this.buildPagination();
      this.selectPage(1);
      this.selected = 1;
      this.viewDialog = true;
    },
    addField(field) {
      if (field === '') {
        this.blankFieldAlert = true;
        setTimeout(() => {
          this.blankFieldAlert = false;
        }, 5000);
        return
      }
      // this.fields[field]= 0;
      this.$set(this.fields, field, 0);
      this.newField = '';
    },
    removeField(field) {
      console.log(field);
      this.$delete(this.fields, field);
      console.log(this.fields);
    },
    closeViewDialog() {
      this.viewDialog = false;
      this.selectPage(1);
    },
    searchInTheList(searchText, currentPage){
      this.filteredItems = this.currentViewEmployee.reviews.filter( function(v, k){
        return v.date.toLowerCase().indexOf(searchText.toLowerCase()) > -1
      });
      this.buildPagination();

      if(currentPage == null){ // NB triple equals === will not work here!
        this.selectPage(1);
      }
      else{
        this.selectPage(currentPage);
      }
    },
    buildPagination(){
      let numberOfPage = Math.ceil(this.filteredItems.length/this.pagination.itemPerPage);
      this.pagination.items = [];
      for(let i=0; i<numberOfPage; i++){
        this.pagination.items.push(i+1)
      }
    },
    selectPage(item) {
      console.log(this.currentViewEmployee.name);
      console.log(this.currentViewEmployee.reviews);
      this.selected = item;
      console.log('selected', this.selected);
      this.pagination.currentPage = item;
      let start = 0;
      let end = 0;
      if(this.pagination.currentPage < this.pagination.range-2){
        start = 1;
        end = start+this.pagination.range-1
      }
      else if(this.pagination.currentPage <= this.pagination.items.length && this.pagination.currentPage > this.pagination.items.length - this.pagination.range + 2){
        start = this.pagination.items.length-this.pagination.range+1;
        end = this.pagination.items.length
      }
      else{
        start = this.pagination.currentPage-2;
        end = this.pagination.currentPage+2
      }
      if(start<1){
        start = 1
      }
      if(end>this.pagination.items.length){
        end = this.pagination.items.length
      }

      this.pagination.filteredItems = [];
      for(let i=start; i<=end; i++){
        this.pagination.filteredItems.push(i);
      }

      this.paginatedItems = this.filteredItems.filter((v, k) => {
        return Math.ceil((k+1) / this.pagination.itemPerPage) === this.pagination.currentPage;
      })
    },
  },
}
</script>

<style scoped>
  .error-msg {
    color: red;
  }

  .performance {
    margin: 5px auto 20px auto;
    border-collapse: collapse;
    border: 1px solid #eee;
    border-bottom: 2px solid #00BCD4;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.10),
    0 10px 20px rgba(0, 0, 0, 0.05),
    0 20px 20px rgba(0, 0, 0, 0.05),
    0 30px 20px rgba(0, 0, 0, 0.05);
  }

  .performancetr:hover {
    background: #f4f4f4;
  }

  .performancetd {
    color: #555;
    text-align: left;
  }

  .performanceth, .performancetd {
    color: #999;
    border: 1px solid #eee;
    padding: 5px 10px;
    border-collapse: collapse;
  }

  .performanceth {
    background: #00BCD4;
    color: #fff;
    text-transform: uppercase;
    font-size: 12px;
  }

  p {
    text-align: left;
    margin: auto 10px 20px auto;
  }

  .pagination {
    display: inline-block;
  }

  .pagination a {
    color: black;
    float: left;
    padding: 8px 16px;
    text-decoration: none;
  }

  .pagination a.active {
    background-color: #1565C0;
    color: white;
    border-radius: 5px;
  }

  .pagination a:hover:not(.active) {
    background-color: #ddd;
    border-radius: 5px;
  }
</style>
