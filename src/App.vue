<template>
  <v-app>
    <component :is="layout">
      <router-view/>
    </component>
  </v-app>
</template>
<script>
  export default {
    name: 'App',
    computed: {
      layout() {
        return (this.$route.meta.layout || "default") + "-layout";
      }
    },
    methods: {
      navigateTo: function (routeName) {
        return this.$router.push({name: routeName});
      },
      setActiveClass(routeName) {
        this.items.forEach((item) => {
          if (item.routeName == routeName) {
            item.class = "active-menu";
          } else {
            item.class = '';
          }
        })
      }
    },
    watch: {
      '$route' (to, from) {
        this.setActiveClass(this.$route.name);
      }
    },
    data() {
      return {
        activeClass: "",
        clipped: false,
        drawer: true,
        fixed: false,
        items: [{
          icon: 'face',
          title: 'Customers',
          routeName: 'CustomerListing',
          class: ''
        }, {
          icon: 'receipt',
          title: 'Invoices',
          routeName: 'InvoiceListing',
          class: ''
        }, {
          icon: 'message',
          title: 'Tickets',
          routeName: 'TicketListing',
          class: ''
        }],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Billing'
      }
    }
  }
</script>
<style type="css">
  .active-menu {
    background-color: #ccc;
  }
</style>
