<template>
    <div class="app-container">
        <h1 class="text-center mt-4 mb-4">Client Appointments</h1>

        <div v-if="appointments" class="container">
            <div v-for="appointment in appointments" :key="appointment.id" class="mb-4">
                <div class="card">
                    <div class="card-body">
                        <p><strong>Date:</strong> {{ appointment.date }}</p>
                        <p><strong>Time:</strong> {{ appointment.time }}</p>
                        <p><strong>Type:</strong> {{ appointment.type }}</p>
                        <p><strong>Notes:</strong> {{ appointment.notes }}</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="container mt-4">
            <h3>Add new Appointment</h3>
            <button v-if="!showForm" @click="showForm = true" class="btn btn-primary">Add Appointment</button>
            <div v-if="showForm" class="form-container">
                <form @submit.prevent="addAppointment">
                    <div class="mb-3">
                        <label for="date">Date:</label>
                        <input type="date" v-model="newAppointment.date" id="date" class="form-control" required>
                    </div>

                    <div class="mb-3">
                        <label for="time">Time:</label>
                        <input type="text" v-model="newAppointment.time" id="time" class="form-control" required>
                    </div>

                    <div class="mb-3">
                        <label for="type">Type:</label>
                        <input type="text" v-model="newAppointment.type" id="type" class="form-control" required>
                    </div>

                    <div class="mb-3">
                        <label for="notes">Notes:</label>
                        <textarea v-model="newAppointment.notes" id="notes" class="form-control"></textarea>
                    </div>

                    <button type="submit" class="btn btn-success">Save</button>
                    <button @click="cancelForm" class="btn btn-secondary">Cancel</button>
                </form>
            </div>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
    props: ['clientId'],
    data() {
        return {
            appointments: null,
            newAppointment: {
                date: '',
                time: '',
                type: '',
                notes: '',
            },
            showForm: false, // Data property to control form visibility
        };
    },
    async created() {
        await this.fetchAppointments();
    },
    methods: {
        async fetchAppointments() {
            try {
                const response = await axios.get(`http://localhost:3000/appointments?clientId=${this.clientId}`);
                this.appointments = response.data;
            } catch (error) {
                console.error('Error fetching appointments details:', error);
            }
        },
        async addAppointment() {
            try {
                const response = await axios.post('http://localhost:3000/appointments', {
                    clientId: this.clientId,
                    date: this.newAppointment.date,
                    time: this.newAppointment.time,
                    type: this.newAppointment.type,
                    notes: this.newAppointment.notes,
                });

                // Clear the form fields after successful submission
                this.newAppointment.date = '';
                this.newAppointment.time = '';
                this.newAppointment.type = '';
                this.newAppointment.notes = '';

                // Fetch the updated appointments list
                await this.fetchAppointments();

                // Hide the form after adding the appointment
                this.showForm = false;
            } catch (error) {
                console.error('Error adding appointment:', error);
            }
        },
        cancelForm() {
            this.showForm = false;
        },
    },
};
</script>

  
<style scoped>
.app-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

.form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    opacity: 1;
    transition: opacity 0.3s ease;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
</style>
With these changes, when you click the "Add Appointment" button, the appointment form will appear in the center of the page. The .app-container class is used to center the entire content of the template, and the .form-container class is responsible for centering the form itself. The opacity transition in the .form-container class is optional and can be adjusted according to your preference.




Was this response better or worse?
Better
Worse
Same



  