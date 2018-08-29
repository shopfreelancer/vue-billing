<template>
  <v-card height=100%>
    <v-card-title>
      <div>
        <h3 class="headline mb-0">Tickets des Kunden</h3>
      </div>
      <v-spacer></v-spacer>
      <v-text-field
        append-icon="search"
        label="Suche"
        single-line
        hide-details
        v-model="search"
      ></v-text-field>
    </v-card-title>
    <v-card-text>
      <v-alert v-if="showAlert" @click="showAlert = false" :value="true" :type="alertType" dismissible>
        {{ alertMessage }}
      </v-alert>
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="tickets"
        :search="search"
        :loading="loading"
        select-all
        :pagination.sync="pagination"
        :noResultsText="noResultsText"
        :noDataText="noDataText"
        :rowsPerPageItems="rowsPerPageItems"
        :rows-per-page-text="rowsPerPageText"
        item-key="id"
        class="site-clicks-table"
      >
        <template slot="headers" slot-scope="props">
          <tr>
            <th
              v-for="header in props.headers"
              :key="header.value"
              :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
              @click="changeSort(header.value)"
            >
              <v-icon small>arrow_upward</v-icon>
              {{ header.text }}
            </th>
          </tr>
        </template>
        <template slot="items" slot-scope="props">
          <tr :active="props.selected" @click="props.selected = !props.selected">
            <td>{{ props.item.description }}</td>
            <td>{{ props.item.status }}</td>
            <td>
              <v-btn icon small :to="{ name: 'CustomerEdit', params: {id: props.item.id } }">
                <v-icon>edit</v-icon>
              </v-btn>
            </td>
            <td>
              <v-btn icon small @click="deleteTicket( props.item.id )">
                <v-icon>delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </template>
        <template slot="pageText" slot-scope="props">
          {{ props.pageStart }} - {{ props.pageStop }} von {{ props.itemsLength }}
        </template>
      </v-data-table>
      <ticket-add :customer-id="customerId"></ticket-add>
    </v-card-text>

  </v-card>
</template>

<script>
  import DataTables from "../../mixins/data-tables";
  import TicketAdd from './Add';

  export default {
    name: 'TicketList',
    components: {
      TicketAdd
    },
    mixins: [DataTables],
    props: ['tickets','customerId'],
    data() {
      return {
        showAlert: false,
        alertMessage: null,
        alertType: 'success',
        pagination: {
          sortBy: 'count',
          descending: true
        },
        headers: [
          {text: 'Name', value: 'lastname'},
          {text: 'Offene Tickets', value: 'tickets_count'},
          {text: '', value: 'edit'},
          {text: '', value: 'del'},
        ],
      }
    },
    methods: {
      deleteTicket() {

      }
    },

  }
</script>