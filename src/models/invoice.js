import {Model, Collection} from 'vue-mc'
import store from '../store.js';
import {
  boolean,
  equal,
  integer,
  min,
  required,
  string,
} from 'vue-mc/validation'
  /**
   * Invoice model
   */

  class Invoice extends Model
  {

// Default attributes that define the "empty" state.
    defaults()
    {
      return {
        id: null,
        title: null,
        date: null,
        invoice_number: null,
        items: [],
        sumNet: null,
        sumTaxAmount: null,
        sumTotal: null
      }
    }

// Attribute mutations.
    mutations()
    {
      return {
        //title: String,
        //body: String,
      }
    }

// Attribute validation
    validation()
    {
      return {
        title: required.and(string),
      }
    }

// Route configuration
    routes()
    {
      return {
        fetch: 'api/invoice/{id}',
        delete: 'api/invoice/{id}',
        save: 'api/invoice',
        update: 'api/invoice/{id}',
      }
    }

    getRouteResolver() {
      var self = this;
      return function(route, parameters = {}){
        return store.state.config.API_URL+self.getDefaultRouteResolver()(route, parameters)
      }
    }

    options() {
        return {
          validateOnSave: true,
          validateOnChange: true,
          methods:{
            update: "PUT"
          }
        }
    }


  }

export { Invoice as default }
