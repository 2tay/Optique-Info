<template>
    <div>
      <Navbar />
  
      <div class="container mt-4">
        <h1 class="text-center mb-4">Add Client :</h1>&nbsp;&nbsp;
        <div>
          <form @submit="addclient">
            <div class="mb-3">
              <label for="fname" class="form-label">First Name:</label>
              <input type="text" id="fname" v-model="fname" class="form-control" required>
            </div>
  
            <div class="mb-3">
              <label for="lname" class="form-label">Last Name:</label>
              <input type="text" id="lname" v-model="lname" class="form-control" required>
            </div>
  
            <div class="mb-3">
              <label for="email" class="form-label">Email:</label>
              <input type="email" id="email" v-model="email" class="form-control">
            </div>
  
            <div class="mb-3">
              <label for="phone" class="form-label">Phone:</label>
              <input type="text" id="phone" v-model="phone" class="form-control" required>
            </div>
  
            <div class="mb-3">
              <label for="address" class="form-label">Address:</label>
              <input type="text" id="address" v-model="address" class="form-control" required>
            </div>
  
            <div class="mb-3">
              <label for="city" class="form-label">City:</label>
              <input type="text" id="city" v-model="city" class="form-control">
            </div>
  
            <button type="submit" class="btn btn-primary">Add Client</button>
            <button @click="cancelPage" class="btn btn-secondary">Cancel</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import Navbar from "@/components/navbar/Navbar.vue";
  
  export default {
    components: { Navbar },
    data() {
      return {
        listOfClients: [],
        fname: "",
        lname: "",
        email: "",
        phone: "",
        address: "",
        city: "",
      };
    },
    methods: {
      async addclient() {
        try {
          const newClientData = {
            firstName: this.fname,
            lastName: this.lname,
            email: this.email,
            phone: this.phone,
            address: this.address,
            city: this.city,
          };
  
          const response = await axios.post("http://localhost:3000/clients", newClientData);
          const newClient = response.data;
  
          this.listOfClients.push(newClient);
  
          // Clear the input fields after successful addition
          this.fname = "";
          this.lname = "";
          this.email = "";
          this.phone = "";
          this.address = "";
          this.city = "";
  
          // console.log('New Client added successfully:', newClient);
        } catch (error) {
          console.error("Error adding new Client:", error);
        }
      },
      cancelPage() {
        this.$router.push({ name: "clients" });
      },
    },
  };
  </script>
  
  <style lang="scss"></style>
  