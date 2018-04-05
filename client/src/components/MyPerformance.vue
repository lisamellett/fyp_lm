<template>
  <div>
  <v-layout v-if="items.length === 0">
    <v-flex xs6 offset-xs3>
      <v-card>
        <v-toolbar dense class="cyan" dark>
          <v-icon light>info</v-icon>
          <v-toolbar-title>
            No Performace Reviews
          </v-toolbar-title>
        </v-toolbar>
        <v-card-text class="text-sm-center">
          Hang in there buddy! I'm sure there will be a performance review coming your way soon.
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
  <v-layout id="performance" v-else>
    <v-flex xs8 class="mr-4">
      <v-text-field
        append-icon="search"
        label="Search"
        single-line
        hide-details
        v-model="searchItem"
        v-on:keyup="searchInTheList(searchItem)"
      ></v-text-field>
      <span class="help is-dark"><strong>{{filteredItems.length}}</strong> of {{items.length}} reviews found</span>
      <v-expansion-panel popout>
        <v-expansion-panel-content v-for="(review) in paginatedItems">
          <div slot="header" class="subheader">{{ review.date }}</div>
          <v-card>
            <v-card-text>
              <table align="left" class="mr-4">
                <tr class="cyan">
                  <th>Skill</th>
                  <th>Score</th>
                </tr>
                <tr v-for="(value,field) in review.fields">
                  <td>{{ field }}: </td>
                  <td>
                    <v-icon small v-for="i in value">grade</v-icon>
                    <v-icon color="grey lighten-2" small v-for="i in (5-value)">grade</v-icon>
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
      <!--<div class="text-xs-center">-->
        <!--<v-pagination :length="pagination.pages.length" v-model="pagination.currentPage" @input="next"></v-pagination>-->
      <!--</div>-->

      <div class="btn-toolbar mt-3">
        <div class="pagination">
          <v-layout row>
            <v-flex>
              <v-btn icon class="mt-0" v-on:click="selectPage(pagination.currentPage - 1)" :disabled="pagination.currentPage===pagination.items[0] || pagination.items.length===0">
                <v-icon>keyboard_arrow_left</v-icon>
              </v-btn>
            </v-flex>
            <v-flex>
                <a v-for="item in pagination.filteredItems"  v-on:click="selectPage(item)" v-bind:class="{'is-info': item === pagination.currentPage}" :class="{active:item === selected}">{{item}}</a>
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
    <v-flex xs4 class="ml-4">
      <div class="white elevation-2">
        <v-card class="pl-4 pr-4 pt-2 pb-2">
          <v-card-title class="subheading">
            Most Recent Review
            <v-spacer></v-spacer>
            <div class="subheader"> {{ this.mostRecent.date }}</div>
          </v-card-title>

            <table>
              <tr class="cyan">
                <th>Skill</th>
                <th>Score</th>
              </tr>
            <tr v-for="(value,field) in mostRecent.fields">
              <td>{{ field }}: </td>
              <td>
                <v-icon small v-for="i in value">grade</v-icon>
                <v-icon color="grey lighten-2" small v-for="i in (5-value)">grade</v-icon>
              </td>
            </tr>
            </table>
            <div>
              <h4 class="grey--text" align="left">Feedback:</h4>
              <p>{{ this.mostRecent.feedback }}</p>
            </div>
        </v-card>
      </div>
    </v-flex>
  </v-layout>
  </div>
</template>


<script>
/* eslint-disable */
import store from '../store/store';

export default {
  data() {
    return {
      search: '',
      items: store.state.user.reviews,
      mostRecent: store.state.user.reviews[0],
      searchItem: '',
      filteredItems: [],
      paginatedItems: [],
      selected: null,
      pagination: {
        range: 5,
        currentPage: 1,
        itemPerPage: 6,
        items: [],
        filteredItems: [],
      }
    };
  },
  mounted() {
    this.filteredItems = this.items;
    this.buildPagination();
    this.selectPage(1);
  },
  methods: {
    searchInTheList(searchText, currentPage){
      this.filteredItems = this.items.filter( function(v, k){
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
      this.selected = item;
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
};

</script>

<style scoped>
  .error-msg {
    color: red;
  }

  #performance {
    text-align: center;
  }

  table {
    margin: auto auto 20px auto;
    border-collapse: collapse;
    border: 1px solid #eee;
    border-bottom: 2px solid #00BCD4;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.10),
    0 10px 20px rgba(0, 0, 0, 0.05),
    0 20px 20px rgba(0, 0, 0, 0.05),
    0 30px 20px rgba(0, 0, 0, 0.05);
  }

  tr:hover {
     background: #f4f4f4;
   }

  td {
    color: #555;
    text-align: left;
  }

  th, td {
    color: #999;
    border: 1px solid #eee;
    padding: 5px 10px;
    border-collapse: collapse;
  }

  th {
    background: #00BCD4;
    color: #fff;
    text-transform: uppercase;
    font-size: 12px;
  }

  p {
    text-align: left;
    margin: auto auto 20px auto;
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
