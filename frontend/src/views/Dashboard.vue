<template>
    <div>
        <Navbar />

        <div class="container mt-4">
            <h1 class="mb-4">Dashboard</h1>

            <table class="table caption-top" v-if="listOfAdmins.length > 0">
                <caption>List of Admins ({{ listOfAdmins.length }})</caption>
                <thead class="table-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Buttons</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(admin, i) in listOfAdmins" :key="i">
                        <th scope="row">{{ admin.id }}</th>
                        <td>{{ admin.name }}</td>
                        <td>
                            <button type="button" class="btn btn-secondary" @click="showUpdateForm(admin)">Update</button>
                            <button type="button" class="btn btn-danger" @click="deleteAdmin(admin)">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div class="mt-4">
                <button type="button" class="btn btn-success" @click="toggleAdmin">Add New Admin</button>
                <button @click="resetDefaultSettings" class="btn btn-primary">Reset Default Settings</button> <br>

                <div class="modal" v-if="addNewAdminStatement">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h3 class="modal-title">Add New Admin</h3>
                                <button type="button" class="btn-close" @click="toggleAdmin"></button>
                            </div>
                            <div class="modal-body">
                                <form @submit.prevent="addAdmin">
                                    <div class="mb-3">
                                        <label for="newAdminName" class="form-label">Name:</label>
                                        <input type="text" v-model="newAdminName" class="form-control" id="newAdminName" />
                                    </div>
                                    <div class="mb-3">
                                        <label for="newAdminPassword" class="form-label">Password:</label>
                                        <input type="password" v-model="newAdminPassword" class="form-control"
                                            id="newAdminPassword" />
                                    </div>
                                    <button type="submit" class="btn btn-primary">Add Admin</button>
                                    <button type="button" @click="toggleAdmin" class="btn btn-secondary">Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="cantDelete" class="alert alert-warning">
                {{ cantDeleteMessage }}
            </div>

            <!-- Update Admin Modal -->
            <div class="modal" v-if="showUpdateFormFlag">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3 class="modal-title">Update Admin</h3>
                            <button type="button" class="btn-close" @click="cancelUpdate"></button>
                        </div>
                        <div class="modal-body">
                            <form @submit="updateAdminData">
                                <div class="mb-3">
                                    <label for="newAdminName" class="form-label">New Name:</label>
                                    <input type="text" v-model="newAdminName" class="form-control" id="newAdminName" />
                                </div>
                                <div class="mb-3">
                                    <label for="newAdminPassword" class="form-label">New Password:</label>
                                    <input type="password" v-model="newAdminPassword" class="form-control"
                                        id="newAdminPassword" />
                                </div>
                                <button type="submit" class="btn btn-primary">Update</button>
                                <button type="button" @click="cancelUpdate" class="btn btn-secondary">Cancel</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <!-- End Update Admin Modal -->
        </div>
    </div>
</template>
  
  <!-- ... Rest of the script and style sections remain the same ... -->
  

  
  
<script>
// @ is an alias to /src
import axios from "axios";
import Navbar from "@/components/navbar/Navbar.vue";


export default {
    name: "dashboard",
    components: { Navbar },
    data() {
        return {
            // adminLoggedInObj: localStorage.getItem("admin-info"),
            // adminLoggedIn: JSON.parse(localStorage.getItem("admin-info")),
            adminName: "",
            adminId: "",
            adminPassword: "",
            listOfAdmins: [],
            cantDelete: false,
            cantDeleteMessage: null,
            showUpdateFormFlag: false,
            newAdminName: '',
            newAdminPassword: '',
            selectedAdminId: null,
            addNewAdminStatement: false,
        };
    },
    //this method will run before page load
    async mounted() {
        let admin = localStorage.getItem("admin-info");
        if (!admin) {
            this.$router.push({ name: "login" });
        } else {
            this.adminName = JSON.parse(admin).name;
            this.adminId = JSON.parse(admin).id;
            this.adminPassword = JSON.parse(admin).password;
        }
        //get list of admins
        let result = await axios.get(
            `http://localhost:3000/admins`
        );
        console.warn(result);
        if (result.status == 200 && result.data.length > 0) {
            this.listOfAdmins = result.data;
        }
    },
    methods: {
        async deleteAdmin(admin) {
            // Extract the _id from the admin object
            const adminId = admin._id;

            // Log to check the adminId and this.adminId
            console.log("adminSelected:", adminId);
            console.log("this.adminId:", this.adminId);

            // Check if the admin to be deleted is the logged-in admin
            if (adminId === this.adminId) {
                // If it is, set the error flag and message
                this.cantDelete = true;
                this.cantDeleteMessage = 'You cannot delete yourself';
            } else {
                try {
                    // If not, proceed with deletion
                    await axios.delete(`http://localhost:3000/admins/${adminId}`);

                    // Update the listOfAdmins after deletion
                    this.listOfAdmins = this.listOfAdmins.filter((a) => a._id !== adminId);

                    console.log('Admin deleted successfully');
                } catch (error) {
                    console.error('Error deleting admin:', error);
                }
            }
        },





        showUpdateForm(admin) {
            this.showUpdateFormFlag = true;
            this.newAdminName = admin.name;
            this.selectedAdminId = admin._id;
        },

        cancelUpdate() {
            this.showUpdateFormFlag = false;
            this.newAdminName = '';
            this.selectedAdminId = null;
        },

        async updateAdminData() {
            try {
                const adminData = {
                    name: this.newAdminName,
                    password: this.newAdminPassword
                };

                await axios.put(`http://localhost:3000/admins/${this.selectedAdminId}`, adminData);

                // Update the admins list with the updated name
                this.listOfAdmins = this.listOfAdmins.map((admin) => {
                    if (admin._id === this.selectedAdminId) {
                        return { ...admin, name: this.newAdminName };
                    }
                    return admin;
                });

            } catch (error) {
                console.error('Error updating admin:', error);
            }

            console.log('Admin updated successfully');

            // Reset form and flags
            this.cancelUpdate();
        },

        toggleAdmin() {
            this.addNewAdminStatement = !this.addNewAdminStatement;
        },
        async addAdmin() {
            try {
                const newAdminData = {
                    name: this.newAdminName,
                    password: this.newAdminPassword
                };

                const response = await axios.post('http://localhost:3000/admins', newAdminData);
                const newAdmin = response.data;

                this.listOfAdmins.push(newAdmin);

                // Clear the input fields after successful addition
                this.newAdminName = '';
                this.newAdminPassword = '';

                console.log('New admin added successfully:', newAdmin);
            } catch (error) {
                console.error('Error adding new admin:', error);
            }
        },

        async resetDefaultSettings() {
            try {
                await axios.delete('http://localhost:3000/admins');

                // After deletion, fetch the updated list of admins (should be empty)
                const response = await axios.get('http://localhost:3000/admins');
                this.listOfAdmins = response.data;

                console.log('All admins deleted successfully');
            } catch (error) {
                console.error('Error deleting all admins:', error);
            }
        }

    }
};
</script>
  
<style scoped lang="scss">
/* Custom styles for Update Admin Modal */
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
    /* Background color with opacity */
}

.modal-dialog {
    max-width: 500px;
    /* Adjust the modal width as needed */
}

.modal-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
}

/* End Custom styles for Update Admin Modal */</style>

  