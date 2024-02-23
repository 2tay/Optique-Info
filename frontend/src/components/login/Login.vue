<template>
  <div class="container">
    <div class="d-flex justify-content-center align-items-center vh-100">
      <form @click.prevent>
        <div class="row g-3 align-items-center">
          <h1 class="text-center">Login</h1>
          <div class="col-auto d-block mx-auto">
            <input type="name" id="nameIs" class="form-control" placeholder="Enter your name" v-model="name" />
          </div>
        </div>
        <br />
        <div class="row g-3 align-items-center">
          <div class="col-auto d-block mx-auto">
            <input
              type="password"
              id="passIs"
              class="form-control"
              placeholder="Enter your Password"
              aria-describedby="passwordHelpInline"
              v-model="password"
            />
          </div>
        </div>
        <br />

        <div class="row g-3 align-items-center">
          <div class="col-auto d-block mx-auto">
            <button @click="login()" class="form-control btn btn-primary">
              Login
            </button>
          </div>
        </div>
        <br />
      </form>
    </div>
  </div>
</template>

  
<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      name: "",
      password: "",
    };
  },
  async mounted() {
    let admin = localStorage.getItem("admin-info");
    if (admin) {
      console.log('admin-info is in local storage');
      this.$router.push({ name: 'welcome' })
    }
  },
  methods: {
    async login() {
      let result = await axios.get(
        `http://localhost:3000/admins?name=${this.name}&password=${this.password}`
      );
      console.log("user clicked in login", this.name, this.password);
      console.log(result);
      if (result.status == 200 && result.data.length > 0) {
        localStorage.setItem("admin-info", JSON.stringify(result.data[0]));
        this.$router.push({ name: 'welcome' });
      }
    },
  },

};
</script>
  



