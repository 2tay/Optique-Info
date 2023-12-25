<template>
    <div class="welcome-container">
      <div class="content">
        <h1>Welcome {{ name }}</h1>
        <div>
          <button type="button" class="btn btn-success" @click="goDashboard">Dashboard</button> &nbsp;&nbsp;
          <button type="button" class="btn btn-success" @click="goManagement">Clients Management</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "welcome",
    data() {
      return {
        name: ""
      };
    },
    // This method will run before the page loads
    // Added async and await since we're fetching data from axios
    async mounted() {
      let admin = localStorage.getItem("admin-info");
      if (!admin) {
        console.log("Admin is not logged in");
        this.$router.push({ name: "login" });
      } else {
        console.log("Admin is logged in");
        this.name = JSON.parse(admin).name;
      }
    },
    methods: {
      goDashboard() {
        this.$router.push({ name: "dashboard" });
      },
      goManagement() {
        this.$router.push({ name: "clients" });
      }
    }
  };
  </script>
  
  <style>
  .welcome-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
  
  .content {
    text-align: center;
  }
  
  button {
    margin-top: 20px;
  }
  </style>
  