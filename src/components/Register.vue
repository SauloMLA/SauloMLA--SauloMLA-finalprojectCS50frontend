<template>
    <div>
        <Navbar/>
        <div class="jumbotron vertical-center ">
            <div class="container">
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootswatch@4.5.2/dist/lux/bootstrap.min.css" integrity="sha384-9+PGKSqjRdkeAU7Eu4nkJU8RFaH8ace8HGXnkiKMP9I9Te0GJ4/km3L1Z8tXigpG" crossorigin="anonymous">
                <main class="form-signin ">
                    <div class="card-body ">
                        <div class="card shadow p-3 mb-5 bg-white rounded">
                            <b-form @submit="onSubmit" @reset="onReset" class="w-100">
                                <h2 class="h3 mb-3 fw-normal text-center">Register</h2>
                                <p v-if="errors.length">
                                    <b>Error(s)</b>
                                    <ul class="errors">
                                    <li v-for="error, index in errors" :key="index">{{ error }}</li>
                                    </ul>
                                </p>
                                <b-form-group
                                    id="input-group-1"
                                    label="Email address:"
                                    label-for="input-1"
                                >
                                    <b-form-input
                                    id="input-1"
                                    v-model="form.email"
                                    type="email"
                                    placeholder="Enter email"
                                    required
                                    ></b-form-input>
                                </b-form-group>
                                <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
                                    <b-form-input
                                    id="input-2"
                                    v-model="form.name"
                                    placeholder="Enter name"
                                    required
                                    ></b-form-input>
                                </b-form-group>
                                <b-form-group id="input-group-2" label="Your Password  :" label-for="input-3">
                                    <b-form-input
                                    type="password"
                                    id="input-3"
                                    v-model="form.password"
                                    placeholder="Enter password"
                                    required
                                    ></b-form-input>
                                </b-form-group>
                                <b-button type="submit" variant="primary" style="margin-right: 2%">Submit</b-button>
                                <b-button type="reset" variant="danger">Reset</b-button>
                            </b-form>    
                        </div>  
                    </div>
                </main>
            </div>
        </div>
    </div>
</template>

<script>
    import Navbar from '@/components/Navbar';
    import auth from "@/logic/auth";
    export default {
        components: {
            Navbar, 
        },
        data() {
        return {
            errors: [],
            form: {
            email: '',
            name: '',
            password: '',
            },
        }
        },
        info: [],
        status: [],
        message: "",
        error: "",
        methods: {
            checkForm(form) {
                this.errors = [];
                if (!form.name) {
                    this.errors.push("The name is required.");
                }
                if (!form.email) {
                    this.errors.push('The email is required.');
                }
                else if (form.password.length < 8) {
                    this.errors.push('The password should be at least 8 characters');
                }
                if (!this.errors.length) {
                    return true;
                }
            },
            sendAlert(res){
                this.status = res.data.status;
                this.data = res.data;
                if(this.status == 'error'){
                    this.message = this.data.error
                    this.$swal({
                        title: 'Error',
                        icon: 'error',
                        html: this.message,
                        showCloseButton: true,
                        showCancelButton: false,
                        focusConfirm: false,
                        confirmButtonColor: 'red',
                    });
                }
                else{
                    this.message = "User Register Correctly"
                    this.$swal({
                        title: 'Success',
                        icon: "success",
                        html: this.message,
                        showCloseButton: true,
                        showCancelButton: false,
                        focusConfirm: false,
                    }).then(function() {
                        window.location = "/notes";
                    });
                }
            },
            onSubmit(event) {
                event.preventDefault()
                if(!this.checkForm(this.form)){
                    return
                }
                const payload = {
                        email: this.form.email,
                        name: this.form.name,
                        password: this.form.password,
                };
                this.register(payload);
                    
            },
            async register(payload) {
                try {
                    const res = await auth.register(payload);
                    if(res.data.status == 'success'){
                        const user = {
                            id: res.data.user[0][0],
                            email: res.data.user[0][1],
                            name: res.data.user[0][2]
                        };
                        auth.setUserLogged(JSON.stringify(user));
                    }
                    this.sendAlert(res)
                } catch (error) {
                    console.log(error);
                }
            },
            onReset(event) {
                event.preventDefault()
                // Reset our form values
                this.form.email = ''
                this.form.name = ''
                this.form.password =  ''
                // Trick to reset/clear native browser form validation state
                this.show = false
                this.$nextTick(() => {
                this.show = true
                })
            },
        }
    }
</script>

<style lang="css">
    .card {
        background-color: #F7F7F9!important;
    }
    .form-signin {
        width: 100%;
        max-width: 450px;
        margin: auto;
    }
    label {
        font-weight: 600;
    }
    .errors{
        list-style-type: none;
        font-size: .8rem;
        padding-right: 3rem;
        text-align: justify;
        display: flex;
        justify-content: center;
        align-items: center;
        text-decoration: none;
        color: red;
    }
</style>