<template>
  <div>
    <h1 class="text-center mt-4 mb-4">Client Prescription Info</h1>

    <div v-if="client" class="container">
      <!-- Display the client information -->
      <div class="mb-3">
        <strong>Prescription:</strong> {{ client.prescription }}
      </div>
      <div class="mb-3">
        <strong>Last Visit:</strong> {{ client.lastVisit }}
      </div>
      <div class="mb-3">
        <strong>Next Appointment:</strong> {{ client.nextAppointment }}
      </div>
      <!-- Display notes if available -->
      <div v-if="client.notes.length > 0">
        <h2>Notes:</h2>
        <div v-for="(note, index) in client.notes" :key="index" class="mb-3">
          <strong>Heading {{ index + 1 }}:</strong> {{ note.heading }}
          <br />
          <strong>Description {{ index + 1 }}:</strong> {{ note.desc }}
        </div>
      </div>
      <!-- Display edit button -->
      <button @click="editMode = true" v-if="!editMode" class="btn btn-primary">Edit</button>
      <!-- Display save button -->
      <button @click="savePrescription" v-if="editMode" class="btn btn-success">Save</button>
    </div>

    <!-- Form for entering data -->
    <form v-else @submit.prevent="savePrescription" class="container mt-4">
      <div class="mb-3">
        <label for="prescription" class="form-label">Prescription:</label>
        <input type="text" v-model="newPrescription" id="prescription" class="form-control">
      </div>
      <div class="mb-3">
        <label for="lastVisit" class="form-label">Last Visit:</label>
        <input type="date" v-model="newLastVisit" id="lastVisit" class="form-control">
      </div>
      <div class="mb-3">
        <label for="nextAppointment" class="form-label">Next Appointment:</label>
        <input type="date" v-model="newNextAppointment" id="nextAppointment" class="form-control">
      </div>
      <h2>Notes:</h2>
      <div v-for="(note, index) in newNotes" :key="index" class="mb-3">
        <label :for="'heading-' + index" class="form-label">Heading {{ index + 1 }}:</label>
        <input type="text" v-model="note.heading" :id="'heading-' + index" class="form-control">
        <label :for="'desc-' + index" class="form-label">Description {{ index + 1 }}:</label>
        <textarea v-model="note.desc" :id="'desc-' + index" class="form-control"></textarea>
      </div>

      <button type="submit" class="btn btn-success">Save</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['clientId'],
  data() {
    return {
      client: null,
      editMode: false,
      newPrescription: '',
      newLastVisit: '',
      newNextAppointment: '',
      newNotes: [],
    };
  },
  async created() {
    // Fetch the client details using the ID from the prop
    const clientId = this.clientId;

    try {
      const response = await axios.get(`http://localhost:3000/clientInformation?clientId=${clientId}`);
      this.client = response.data.length > 0 ? response.data[0] : null;
      // If client data exists, copy notes to newNotes for editing
      if (this.client) {
        this.newPrescription = this.client.prescription;
        this.newLastVisit = this.client.lastVisit;
        this.newNextAppointment = this.client.nextAppointment;
        this.newNotes = this.client.notes.map((note) => ({ ...note }));
      } else {
        // If no client data, initialize newNotes with an empty note
        this.newNotes = [{ heading: '', desc: '' }];
      }
    } catch (error) {
      console.error('Error fetching client details:', error);
    }
  },
  methods: {
    async savePrescription() {
      if (this.editMode) {
        // Update client information when in edit mode
        this.client.prescription = this.newPrescription;
        this.client.lastVisit = this.newLastVisit;
        this.client.nextAppointment = this.newNextAppointment;
        this.client.notes = this.newNotes.map((note) => ({ ...note }));
        try {
          await axios.put(`http://localhost:3000/clientInformation/${this.client.id}`, this.client);
          alert('Prescription saved successfully!');
        } catch (error) {
          console.error('Error saving prescription:', error);
          alert('Failed to save prescription.');
        }
        this.editMode = false;
      } else {
        // Add new client information when in form mode
        try {
          const newClientInfo = {
            clientId: this.clientId,
            prescription: this.newPrescription,
            lastVisit: this.newLastVisit,
            nextAppointment: this.newNextAppointment,
            notes: this.newNotes.map((note) => ({ ...note })),
          };
          await axios.post('http://localhost:3000/clientInformation', newClientInfo);
          alert('Prescription saved successfully!');
        } catch (error) {
          console.error('Error saving prescription:', error);
          alert('Failed to save prescription.');
        }
      }
    },
    goToApp() {
      this.$emit('goToApp');
    },
  },
};
</script>
