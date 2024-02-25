<template>
  <div>
      <Navbar />

      <div class="container mt-4">
          <!-- Client Cards -->
          <div class="row mt-4">
              <!-- First Card -->
              <div class="col-md-3 mb-4">
                  <div class="border p-4 h-100 text-center custom-first-card">
                      <h5 class="display-1"><font-awesome-icon icon="fa-solid fa-user-plus"  /></h5>
                      <p></p>
                      <button class="btn btn-success btn-lg" @click="goAddUser">Add Client</button>
                  </div>
              </div>

              <!-- Rest of the Client Cards -->
              <div v-for="fullName in FullNames" :key="fullName._id" class="col-md-3 mb-4">
                  <div class="border p-4 h-100 text-center custom-card"> <!-- Adding a custom class for the other cards -->
                      <h5 class="display-1"><font-awesome-icon icon="fas fa-folder" /></h5>
                      <p class="h4">{{ fullName.name }}</p>
                      <router-link :to="{ name: 'clientdetail', params: { id: fullName._id } }" class="btn btn-primary btn-lg text-white text-decoration-none">Check</router-link>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import Navbar from "@/components/navbar/Navbar.vue";
import axios from "axios";

export default {
  components: { Navbar },
  data() {
      return {
          listOfClients: [],
          clientName: "",
      };
  },
  async mounted() {
      let result = await axios.get(`http://localhost:3000/clients`);
      console.warn(result);
      if (result.status == 200 && result.data.length > 0) {
          this.listOfClients = result.data;
      }
  },
  methods: {
      goAddUser() {
          this.$router.push({ name: "adduser" });
      },
  },
  computed: {
      FullNames() {
          return this.listOfClients.map((client) => ({
              _id: client._id,
              name: `${client.firstName} ${client.lastName}`,
          }));
      },
  },
};
</script>

<style scoped>
.custom-first-card {
  /* Add your custom styles for the first card here */
  background-color: rgb(225, 225, 225); /* Example: changing the background color */
  border-radius: 10px; /* Example: adding rounded corners */
  /* Add any other styles you want to differentiate the first card */
}

.custom-card {
  /* Add your custom styles for the other cards here */
  background-color: #ffffff; /* Changing the background color for other cards */
  border-radius: 5px; /* Adding rounded corners for other cards */
  margin-bottom: 10px; /* Adding margin at the bottom of each card */
  /* Add any other styles you want to modify the appearance of the cards */
}
</style>
