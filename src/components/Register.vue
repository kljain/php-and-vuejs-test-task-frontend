<template>
    <div>
        <h2>Register</h2>
        <p class="text-danger" v-if="error">{{ error }}</p>
        <p class="text-success"  v-if="success">{{ success }}</p>
        <div class="form-div" >
            
            <form @submit.prevent="register" class="form-width">
                
                <input 
                    class="width p-1" 
                    v-model="name" 
                    type="text" 
                    placeholder="Name" 
                    @input= "validateInputName"  
                />
                <p class="text-danger m-0 ps-2 text-left font-size-14" v-if="name_require">{{ name_require }}</p><br>

                <input 
                    class="width p-1" 
                    v-model="email" 
                    type="email" 
                    placeholder="Email"  
                    @input="validateInputEmail"
                />
                <p class="text-danger  m-0 ps-2 text-left font-size-14" v-if="email_require">{{ email_require }}</p><br>

                <input 
                    class="width p-1" 
                    v-model="password" 
                    type="password" 
                    placeholder="Password"  
                    @input="validateInputPass"
                />
                <p class="text-danger  m-0 ps-2 text-left font-size-14" v-if="pass_require">{{ pass_require }}</p><br>

                <input 
                    class="width p-1" 
                    v-model="password_confirmation" 
                    type="password" 
                    placeholder="Confirm Password"  
                    @input="validateInputConfrmPass"
                />
                <p class="text-danger  m-0 ps-2 text-left text-left font-size-14" v-if="confirm_pass_require">{{ confirm_pass_require }}</p><br>

                <button type="submit" class="form-btn">Register</button>
                <button @click="goToLogin">Login</button>
                
            </form>
        </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        error: '',
        success:'',
        name_require: '',
        email_require: '',
        pass_require: '',
        confirm_pass_require: '',
      };
    },
    methods: {
        async register() {
            this.error = '';
            this.success = '';
            this.name_require = '';
            this.email_require = '';
            this.pass_require = '';
            this.confirm_pass_require = '';

            if(this.name == ''){
                this.name_require = 'Name is required!';
                return;
            }

            if(this.email == ''){
                this.email_require = 'Email is required!';
                return;
            }

            if(this.password == ''){
                this.pass_require = 'Password is required!';
                return;
            }

            if(this.password_confirmation == ''){
                this.confirm_pass_require = 'Confirm password is required!';
                return;
            }


            try {
            const response = await axios.post('http://localhost:8000/api/register', {
                name: this.name,
                email: this.email,
                password: this.password,
                password_confirmation: this.password_confirmation
            });
            this.error = '';
            console.log('Registration successful:', response.data);
            this.success = response.data.message;
            } catch (error) {
                
                if(error.response.data.email) {
                    this.error = error.response.data.email[0];
                } else if(error.response.data.password) {
                    this.error = error.response.data.password[0];
                } else {
                    this.error = 'Error occured.'
                }
                
            }
        },
        goToLogin() {
            this.$router.push('/login');
        },
        validateInputName() {
            if(this.name.trim() === ''){
                this.name_require = 'Name is required!';
                
            } else {
                this.name_require = '';
            }
        
        },
        validateInputEmail() {
            if(this.email.trim() === ''){
                this.email_require = 'Email is required!';
                
            } else {
                this.email_require = '';
            }
        
        },
        validateInputPass() {
            if(this.password.trim() === ''){
                this.pass_require = 'Password is required!';
                
            } else {
                this.pass_require = '';
            }
        
        },
        validateInputConfrmPass() {
            if(this.password_confirmation.trim() === ''){
                this.confirm_pass_require = 'Confirm Password is required!';
                
            } else {
                this.confirm_pass_require = '';
            }
        
        },
    }
  };
  </script>