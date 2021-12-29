<template>
    <div>
  <b-navbar toggleable="lg" type="light" variant="light">
    <b-navbar-brand href="/">Notes</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="/notes">Home</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav v-if="userLog" >
        <b-navbar-nav>
         <b-nav-item >Hello {{this.userName}}</b-nav-item>
        </b-navbar-nav>
      </b-navbar-nav>
      <b-navbar-nav v-if="!userLog" class="ml-auto">
        <b-navbar-nav>
         <b-nav-item href="/login">Login</b-nav-item>
        </b-navbar-nav>
      </b-navbar-nav>
      <b-navbar-nav v-if="userLog" class="ml-auto">
        <b-navbar-nav>
         <b-nav-item v-on:click="alertDisplay">Log out</b-nav-item>
        </b-navbar-nav>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
import auth from "@/logic/auth";
export default {
    name: 'Navbar',
    data() {
        return {
            userName:'',
            userId: ''
        };
    },
    methods: {
      userLogged() {
        const res = auth.getUserLogged();
        return res
      },
      alertDisplay() {
        this.$swal({
          title: 'Are you sure?',
          text: 'All your changes would be saved',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes Log out!',
          cancelButtonText: 'No, Keep!',
          showCloseButton: true,
          showLoaderOnConfirm: true
        }).then((result) => {
          if(result.value) {
            this.$swal('Logged out', 'You successfully log out', 'success').then(() => {
              auth.deleteUserLogged();
              window.location = "/";
            })
          } else {
            this.$swal('Cancelled', 'You still are logged', 'info')
          }
        })
      }
    },
    computed: {
      userLog() {
        return auth.getUserLogged();
      }
    },
    created(){
        let user = this.userLogged();
        if (!user){
            return
        }
        user = JSON.parse(user)
        this.userName = user.name;
        
    }
}

</script>

<style>
  .divide {
    display: flex;
    justify-content: space-between!important;
  }
</style>