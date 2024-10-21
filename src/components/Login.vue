<template>
    <div>
        <h2>Login</h2>
        <p class="text-danger" v-if="error">{{ error }}</p>
        <p class="text-success"  v-if="success">{{ success }}</p>
        <div class="form-div" >
            <form @submit.prevent="login">
                <input class="width p-1" v-model="email" type="email" placeholder="Email" required />
                <input class="width p-1" v-model="password" type="password" placeholder="Password" required /> <br>
                <button class="form-btn" type="submit">Login</button>
                <p>If you have no account ? <span class="reg-btn" @click="goToRegister">Register</span></p>
            </form>
        </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        email: '',
        password: '',
        error: '',
        success:''
      };
    },
    methods: {
        async login() {
            this.error = '';
            this.success = '';
            try {
            const response = await this.$axios.post('http://127.0.0.1:8000/api/login', {
                email: this.email,
                password: this.password
            });
            this.success = 'User verified successfully.'
            console.log('Login successful:', response.data);
            } catch (error) {
            this.error = error.response.data.error;
            }
        },
        goToRegister() {
            this.$router.push('/register');
        }
    }
  };
  </script>