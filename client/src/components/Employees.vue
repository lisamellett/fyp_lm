<template>
  <v-card>
    <v-dialog v-model="dialog" max-width="800">
      <v-card>
        <v-toolbar flat dense class="blue darken-2" dark>
          <v-toolbar-title>Edit Employee</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Employee Name" v-model="editedItem.name"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
               <v-select label="Gender" v-model="editedItem.gender" :items="genders"></v-select>
              </v-flex>
              <v-flex xs12 sm6 md4>
              <v-menu
                ref="menu"
                lazy
                :close-on-content-click="false"
                v-model="menu"
                transition="scale-transition"
                offset-y
                full-width
                :nudge-right="40"
                min-width="290px"
              >
                <v-text-field
                  slot="activator"
                  label="Date of Birth"
                  v-model="editedItem.dob"
                  prepend-icon="event"
                  readonly
                ></v-text-field>
                <v-date-picker
                  ref="picker"
                  v-model="editedItem.dob"
                  @change="saveDob"
                  min="1950-01-01"
                  :max="new Date().toISOString().substr(0, 10)"
                ></v-date-picker>
              </v-menu>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Job Title" v-model="editedItem.title"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Holidays Taken" v-model="editedItem.taken" type="number"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Holiday Allowance" v-model="editedItem.allowance" type="number"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Team" v-model="editedItem.team"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Address" v-model="editedItem.address"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Phone" v-model="editedItem.phone"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Next of Kin Name" v-model="editedItem.kinName"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Next of Kin Number" v-model="editedItem.kinNum"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Email" v-model="editedItem.email"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-select
                  label="Role"
                  v-model="editedItem.role"
                  :items="roles"
                >
                </v-select>
              </v-flex>
              <v-flex>
                <v-select
                  label="Manager"
                  v-model="editedItem.manager"
                  :items="managers"
                  item-text="name">
                </v-select>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
          <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="deleteModal" max-width="400">
      <v-card>
        <v-toolbar flat dense class="blue darken-2" dark>
          <v-toolbar-title>
          Delete User
        </v-toolbar-title>
      </v-toolbar>
        <v-card-text>
        Are you sure you would like to delete the user {{ this.deleteUserName.name }}?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="deleteModal= false ">Cancel</v-btn>
          <v-btn color="red darken-1" flat @click.native="deleteClicked">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-card-title>
      <span v-if="$store.state.user.role === 'manager'">Employees Managed By Me</span>
      <span v-else>Employees</span>
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
      :items="items"
      :search="search"
      :rows-per-page-items="rowsPerPage"
      class="elevation-1"
      item-key="_id"
    >
      <!--<template slot="headerCell" slot-scope="props">-->
        <!--<v-tooltip bottom>-->
          <!--<span slot="activator">-->
            <!--{{ props.header.text }}-->
          <!--</span>-->
          <!--<span>-->
            <!--{{ props.header.text }}-->
          <!--</span>-->
        <!--</v-tooltip>-->
      <!--</template>-->
      <template slot="items" slot-scope="props">
        <tr @click="props.expanded = !props.expanded">
          <td v-if="props.expanded"><v-icon>keyboard_arrow_up</v-icon></td>
          <td v-else><v-icon>keyboard_arrow_down </v-icon></td>
          <td class="text-xs-left">{{ props.item.name }}</td>
          <td class="text-xs-right">{{ props.item.role }}</td>
          <td class="text-xs-right">{{ props.item.title }}</td>
          <td class="text-xs-right">{{ props.item.team }}</td>
          <td class="text-xs-right">{{ props.item.allowance }}</td>
          <td class="text-xs-right">{{ props.item.taken }}</td>
          <td class="justify-center layout px-0">
            <v-btn v-if="$store.state.user.role === 'admin'" icon class="mx-0" @click.stop="editItem(props.item)">
              <v-icon color="teal">edit</v-icon>
            </v-btn>
            <v-btn v-if="$store.state.user.role === 'admin'" icon class="mx-0" @click.stop="deleteItem(props.item)">
              <v-icon color="pink">delete</v-icon>
            </v-btn>
          </td>
        </tr>
      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
      <template slot="expand" slot-scope="props">
        <v-card flat>
          <v-card-text>
            <v-layout row>

              <v-flex xs4 class="border-flex">
                <v-layout row wrap>
                  <v-flex xs12 class="text-xs-left">General</v-flex>

                  <v-flex xs1>
                    <v-icon class="ff blue--text text--lighten-2">fiber_manual_record</v-icon>
                  </v-flex>
                  <v-flex xs3 class="grey--text text-xs-left">Name</v-flex>
                  <v-flex xs8 class="text-xs-left">{{ props.item.name }}</v-flex>

                  <v-flex xs1>
                    <v-icon class="ff blue--text text--lighten-2">fiber_manual_record</v-icon>
                  </v-flex>
                  <v-flex xs3 class="grey--text text-xs-left">Date of Birth</v-flex>
                  <v-flex xs8 class="text-xs-left">{{ prettyDate(props.item.dob) }}</v-flex>

                  <v-flex xs1>
                    <v-icon class="ff blue--text text--lighten-2">fiber_manual_record</v-icon>
                  </v-flex>
                  <v-flex xs3 class="grey--text text-xs-left">Gender</v-flex>
                  <v-flex xs8 class="text-xs-left">{{ props.item.gender }}</v-flex>

                </v-layout>
              </v-flex>

              <v-flex xs4 class="border-flex">
                <v-layout row wrap>
                  <v-flex xs12 class="text-xs-left">Contact Details</v-flex>
                  <v-flex xs1>
                    <v-icon class="ff2 blue--text text--lighten-2">home</v-icon>
                  </v-flex>
                  <v-flex xs3 class="grey--text text-xs-left">Address</v-flex>
                  <v-flex xs8 class="text-xs-left">{{ props.item.address }}</v-flex>

                  <v-flex xs1>
                    <v-icon class="ff2 blue--text text--lighten-2">phone</v-icon>
                  </v-flex>
                  <v-flex xs3 class="grey--text text-xs-left">Phone</v-flex>
                  <v-flex xs8 class="text-xs-left">{{ props.item.phone }}</v-flex>

                  <v-flex xs1>
                    <v-icon class="ff2 blue--text text--lighten-2">email</v-icon>
                  </v-flex>
                  <v-flex xs3 class="grey--text text-xs-left">Email</v-flex>
                  <v-flex xs8 class="text-xs-left">{{ props.item.email }}</v-flex>

                </v-layout>
              </v-flex>

              <v-flex xs4>
                <v-layout row wrap>
                  <v-flex xs12 class="text-xs-left">Next of Kin</v-flex>

                  <v-flex xs1>
                    <v-icon class="ff2 blue--text text--lighten-2">person</v-icon>
                  </v-flex>
                  <v-flex xs3 class="grey--text text-xs-left">Name</v-flex>
                  <v-flex xs8 class="text-xs-left">{{ props.item.kinName }}</v-flex>

                  <v-flex xs1>
                    <v-icon class="ff2 blue--text text--lighten-2">phone</v-icon>
                  </v-flex>
                  <v-flex xs3 class="grey--text text-xs-left">Phone</v-flex>
                  <v-flex xs8 class="text-xs-left">{{ props.item.kinNum }}</v-flex>

                </v-layout>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
/* eslint-disable */
import UsersService from '../services/UsersService';
import store from '../store/store';


export default {
  data () {
    return {
      dialog: false,
      search: '',
      rowsPerPage: [10,25,{"text":"All","value":-1}],
      headers: [
        {text: '', sortable: false},
        {
          text: 'Employees',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Role', value: 'role' },
        { text: 'Job Title', value: 'title' },
        { text: 'Team', value: 'team' },
        { text: 'Holiday Allowance', value: 'allowance' },
        { text: 'Holidays Taken', value: 'taken' },
      ],
      genders: [
        'male',
        'female',
      ],
      roles: [
        'employee',
        'manager',
        'senior manager',
        'admin',
      ],
      managers: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        role: '',
        dob: '',
        gender: '',
        team: '',
        taken: '',
        allowance: '',
        manager: '',
        title: '',
        address: '',
        phone: '',
        kinName: '',
        kinNum: '',
        email: '',
      },
      defaultItem: {
        name: '',
        role: '',
        dob: '',
        gender: '',
        team: '',
        taken: '',
        allowance: '',
        manager: '',
        title: '',
        address: '',
        phone: '',
        kinName: '',
        kinNum: '',
        email: '',
      },
      deleteUserName: '',
      items: [], // change items to users or employees
      menu: false,
      deleteModal: false,
    }
  },
  // make a dictionary of all user managers and display
  async created() {
    // do a request to the backend for all the users
    // so when the page is loaded do a request to backend - may need to do this fo rmanagers register page
    if (store.state.user.role === 'manager') {
      this.items = (await UsersService.getManagersEmployees(store.state.user._id)).data.employees;
    }
    else {
      this.items = (await UsersService.getAllUsers()).data.users;
    }
    this.managers = (await UsersService.getManagers()).data.managers;
    // this will do a get request the moment the page is mounted
  },
  watch: {
    menu (val) {
      val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))
    }
  },
  methods: {
    prettyDate(date) {
      const date1 = new Date(date).toUTCString();
      return date1.split(' ').slice(1, 4).join(' ');
    },
    saveDob(dob) {
      this.$refs.menu.save(dob)
    },
    editItem (item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item); // this assigns ths values of item to editedItem
      for (let x=0; x < this.managers.length; x++) {
        if (this.managers[x]._id === item.manager) { // go through managers and if a mangers id is equal to
          this.editedItem.manager = this.managers[x]; // the item manager value then assign the managers object to edited item
          break;
        }
      }
      this.dialog = true;
    },
    deleteItem (item) {
      this.deleteModal = true;
      this.deleteUserName = item;
      // confirm('Are you sure you want to delete the user ' + item.name + '?') && this.items.splice(index, 1) && await UsersService.deleteUser(item._id);
    }, // change this to a nicer confirm
    async deleteClicked () {
      await UsersService.deleteUser(this.deleteUserName._id);
      this.deleteUserName = '';
      this.deleteModal = false;
    } ,
    close () {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1
      }, 300)
    },
    async save () {
      if (this.editedIndex > -1) {
        this.editedItem.manager = this.editedItem.manager._id; // must change manager value to id and not object
        Object.assign(this.items[this.editedIndex], this.editedItem); // must update this for manager
        let patchList = [];
        for (let field in this.editedItem) {
          if (this.editedItem.hasOwnProperty(field)) {
            patchList.push( {
              propName: field,
              value: this.editedItem[field]
            });
          }
        }
        console.log(patchList);
        try {
           await UsersService.updateUser(patchList, this.editedItem._id);
        }catch (error){
          this.error = error.response.data.error;
        }
      } else {
        this.items.push(this.editedItem);
      }
      this.close()
    }
  },
}
</script>

<style scoped>

  .ff {
    font-size: 8px;
  }

  .ff2 {
    font-size: 12px;
  }

  .border-flex {
    border-right: 1px darkgrey solid;
    margin-right: 10px;
  }

  .myClass {
    background-color: #E3F2FD;
  }

  tr:hover {
    background-color: blue;
  }

</style>
