<template>
    <div class="fullC">
        <Navbar/>
        <div class="jumbotron vertical-center ">
            <div class="container">
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootswatch@4.5.2/dist/lux/bootstrap.min.css" integrity="sha384-9+PGKSqjRdkeAU7Eu4nkJU8RFaH8ace8HGXnkiKMP9I9Te0GJ4/km3L1Z8tXigpG" crossorigin="anonymous">
                <main class="form-signin ">
                    <div class="card-body ">
                        <div class="card shadow p-3 mb-5 bg-white rounded">
                            <b-form @submit="onSubmit" @reset="onReset" class="w-100">
                                <h2 class="h3 mb-3 fw-normal text-center">Login</h2>
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
                                <b-form-group id="input-group-2" label="Your Password  :" label-for="input-3" style="margin-bottom: 10%">
                                    <b-form-input
                                    id="input-3"
                                    type="password"
                                    v-model="form.password"
                                    placeholder="Enter password"
                                    required
                                    ></b-form-input>
                                </b-form-group>
                                <b-button type="submit" variant="primary" style="margin-right: 2%">Submit</b-button>
                                <b-button type="reset" variant="danger">Reset</b-button>
                                <br>
                                <div class="center">
                                    <a href="/register">Don't have an account yet?</a>
                                </div>
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
                form: {
                email: '',
                password: '',
                },
            }
        },
        methods: {
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
                else {
                    this.message = "User Loged Correctly"
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
                const payload = {
                        email: this.form.email,
                        password: this.form.password,
                };
                this.login(payload);
            },
            async login(payload) {
                try {
                    const res = await auth.login(payload);
                    if(res.data.status == 'error'){
                        this.sendAlert(res)
                    }
                    else {
                        const user = {
                            id: res.data[0][0],
                            email: res.data[0][1],
                            name: res.data[0][2]
                        };
                        auth.setUserLogged(JSON.stringify(user));
                        this.sendAlert(res)
                    }
                } catch (error) {
                    console.log(error)
                }
            },
            onReset(event) {
                event.preventDefault()
                this.form.email = ''
                this.form.name = ''
                this.form.password =  ''
                this.show = false
                this.$nextTick(() => {
                this.show = true
                })
            }

        }
    }
</script>

<style lang="css">
    .fullC{
        height: 100%;
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
    .center {
        margin-top: 10px;
        display: flex;
        justify-content: center;
    }
</style>