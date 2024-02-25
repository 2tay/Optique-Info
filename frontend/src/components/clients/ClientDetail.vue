<template>
  <div>
    <Navbar />

    <div v-if="client">
      <h1>Client: {{ client.lastName }} Details Page</h1>
      <div class="btn-group mb-3">
        <button @click="changePage('pageId')" :class="currentPage === 'pageId' ? 'btn btn-primary' : 'btn btn-outline-primary'">Client ID</button>
        <button @click="changePage('pageInfo')" :class="currentPage === 'pageInfo' ? 'btn btn-primary' : 'btn btn-outline-primary'">Prescription info</button>
        <button @click="changePage('pageAppointments')" :class="currentPage === 'pageAppointments' ? 'btn btn-primary' : 'btn btn-outline-primary'">Appointments</button>
        <button @click="changePage('pagePayments')" :class="currentPage === 'pagePayments' ? 'btn btn-primary' : 'btn btn-outline-primary'">Payments</button>
      </div>
      <div>
        <table class="table table-bordered" v-if="currentPage === 'pageId'">
          <tbody>
            <tr>
              <td>First Name</td>
              <td>{{ client.firstName }}</td>
            </tr>
            <tr>
              <td>Last Name</td>
              <td>{{ client.lastName }}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{{ client.email }}</td>
            </tr>
            <tr>
              <td>Phone</td>
              <td>{{ client.phone }}</td>
            </tr>
            <tr>
              <td>Address</td>
              <td>{{ client.address }}</td>
            </tr>
            <tr>
              <td>City</td>
              <td>{{ client.city }}</td>
            </tr>
          </tbody>
        </table>
        <div v-if="currentPage === 'pageInfo'">
          <pageInfo :clientId="client._id" />
        </div>
        <div v-if="currentPage === 'pageAppointments'">
          <pageAppointments :clientId="client._id" />
        </div>
        <div v-if="currentPage === 'pagePayments'">
          <pagePayments :clientId="client._id" />
        </div>
      </div>
    </div>
    <div v-else>
      <p>Loading client details...</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Navbar from '@/components/navbar/Navbar.vue';
import pageInfo from '@/components/clients/ClientInfo.vue';
import pageAppointments from '@/components/clients/ClientAppointement.vue';
import pagePayments from '@/components/clients/ClientPayments.vue';

export default {
  components: { Navbar, pageInfo, pageAppointments, pagePayments },
  data() {
    return {
      client: null,
      currentPage: 'pageId',
    };
  },
  async created() {
    // Fetch the client details using the ID from the route params
    const clientId = this.$route.params.id;

    try {
      const response = await axios.get(`http://localhost:3000/clients/${clientId}`);
      this.client = response.data;
    } catch (error) {
      console.error('Error fetching client details:', error);
    }
  },
  methods: {
    changePage(pageName) {
      this.currentPage = pageName;
    },
  },
};
</script>
