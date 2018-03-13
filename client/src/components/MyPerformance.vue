<template>
  <v-layout>
    <v-flex xs8 class="mr-4">
      <!--<div class="white elevation-2">-->
        <!--<v-toolbar flat dense class="cyan" dark>-->
          <!--<v-toolbar-title class="title">Login</v-toolbar-title>-->
        <!--</v-toolbar>-->
        <!--<div class="pl-4 pr-4 pt-2 pb-2">-->
      <v-text-field
        append-icon="search"
        label="Search"
        single-line
        hide-details
        v-model="search"
      ></v-text-field>
      <v-expansion-panel popout>
        <v-expansion-panel-content v-for="(review) in paginatedReviews" :key="review._id">
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
      <!--<div class="text-xs-center">-->
        <!--<v-pagination :length="pagination.pages.length" v-model="pagination.currentPage" @input="next"></v-pagination>-->
      <!--</div>-->

      <div class="btn-toolbar mt-3">
        <div class="pagination">
          <v-layout row>
            <v-flex>
              <v-btn icon class="mt-0" :disabled="pagination.currentPage === 1" @click.prevent="setPage(pagination.currentPage - 1)">
                <v-icon>keyboard_arrow_left</v-icon>
              </v-btn>
            </v-flex>
            <v-flex>
              <a small round v-for="p in pagination.pages" @click.prevent="setPage(p)" :class="{active:p === selected}">{{p}}</a>
            </v-flex>
            <v-flex>
              <v-btn icon class="mt-0" :disabled="pagination.currentPage === pagination.pages.length" @click.prevent="setPage(pagination.currentPage + 1)">
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
                <v-icon color="grey lighten-2" small v-for="i in (10-value)">grade</v-icon>
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
</template>


<!--everything inside this script tag is the
controller and you can bind the html to it-->
<script>
import store from '../store/store';

export default {
  data() {
    return {
      search: '',
      reviews: store.state.user.reviews,
      mostRecent: store.state.user.reviews[store.state.user.reviews.length - 1 ],
      perPage: 8,
      pagination: {},
      selected: null,
    };
  },
  computed: {
    filteredReviews: function() {
      return this.reviews.filter((review) => {
        return review.date.toLowerCase().includes(this.search.toLowerCase()); // if we return true then that review remains in the array
      })
    },
    paginatedReviews() {
      return this.paginate(this.filteredReviews);
    },
  },
  methods: {
    setPage(p) {
      this.selected = p;
      this.pagination = this.paginator(this.filteredReviews.length, p);
    },
    paginate(reviews) {
      return reviews.slice( this.pagination.startIndex, this.pagination.endIndex + 1)
    },
    paginator(totalItems, currentPage) {
      let startIndex = (currentPage - 1) * this.perPage,
        endIndex = Math.min(startIndex + this.perPage - 1, totalItems - 1);
      let upperBound = Math.ceil(totalItems / this.perPage) + 1;
      let pages = [];
      for (let i = 1; i < upperBound; i++) {
        pages.push(i);
      }
      return {
        currentPage: currentPage,
        startIndex: startIndex,
        endIndex: endIndex,
        pages: pages,
      };
    },
  },
  created() {
    this.setPage(1);
  }
};

</script>

<style scoped>
  .error-msg {
    color: red;
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
