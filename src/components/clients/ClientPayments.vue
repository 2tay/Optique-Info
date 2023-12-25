<template>
  <div class="payment-container">
    <h2>Payments</h2>

    <!-- Display existing payments for the client -->
    <div v-if="payments && payments.length > 0" class="payment-list">
      <div v-for="payment in payments" :key="payment.id" class="payment-item">
        <p><strong>Amount:</strong> {{ payment.amount }}</p>
        <p><strong>Date:</strong> {{ payment.date }}</p>
      </div>
    </div>
    <div v-else>
      <p>No payments available for this client.</p>
    </div>

    <!-- Add Payment button -->
    <div class="add-payment-button">
      <button @click="togglePaymentForm" class="btn btn-primary">Add Payment</button>
    </div>

    <!-- Form to add new payment -->
    <div v-if="showForm" class="add-payment-form-container">
      <div class="payment-form-wrapper">
        <h3>Add Payment</h3>
        <form @submit.prevent="addPayment" class="payment-form">
          <div class="form-group">
            <label for="amount">Amount:</label>
            <input type="number" v-model="newPayment.amount" id="amount" required>
          </div>
          <div class="form-group">
            <label for="date">Date:</label>
            <input type="date" v-model="newPayment.date" id="date" required>
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-success">Save Payment</button>
            <button @click="cancelForm" class="btn btn-secondary">Cancel</button>
          </div>
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
      payments: null,
      newPayment: {
        amount: 0,
        date: '',
      },
      showForm: false,
    };
  },
  async created() {
    await this.fetchPayments();
  },
  methods: {
    async fetchPayments() {
      try {
        const response = await axios.get(`http://localhost:3000/payments?clientId=${this.clientId}`);
        this.payments = response.data;
      } catch (error) {
        console.error('Error fetching payments:', error);
      }
    },
    async addPayment() {
      try {
        // Add validation checks if needed

        // Set the clientId for the new payment
        this.newPayment.clientId = this.clientId;

        // Send a POST request to add the new payment
        const response = await axios.post('http://localhost:3000/payments', this.newPayment);

        // Clear the form fields after successful submission
        this.newPayment.amount = 0;
        this.newPayment.date = '';

        // Fetch the updated payments list
        await this.fetchPayments();

        console.log('Payment added successfully.');
      } catch (error) {
        console.error('Error adding payment:', error);
      }
    },
    togglePaymentForm() {
      this.showForm = !this.showForm;
    },
    cancelForm() {
      this.showForm = false;
    }
  },
};
</script>

<style scoped>
/* Reset default margins and paddings */
body,
h1,
h2,
h3,
p,
div,
form,
label,
input,
button {
  margin: 0;
  padding: 0;
}

/* Page container */
.payment-container {
  padding: 20px;
}

/* Payment list */
.payment-list {
  margin-top: 20px;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
}

/* Individual payment item */
.payment-item {
  border-bottom: 1px solid #ccc;
  padding: 5px;
}

/* Add Payment form */
.add-payment {
  margin-top: 20px;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
}

.payment-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 10px;
}

label {
  font-weight: bold;
}

input[type="number"],
input[type="date"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

button.btn-save-payment {
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

button.btn-save-payment:hover {
  background-color: #45a049;
}

.add-payment-form-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  display: none;
  /* Hide the form by default */
}

.add-payment-button {
  margin-top: 20px;
}
</style>
