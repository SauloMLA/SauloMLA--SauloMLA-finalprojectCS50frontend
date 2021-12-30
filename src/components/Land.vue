<template>
    <div class="all">
    <Navbar/>
      <div class="cover" :style="{backgroundImage: 'url(' + require('@/assets/2.jpg') + ')' }">
        <p class="titulo">Notes WebApp</p>
        <div class="buttonContainer">
          <a href="/login">
            <button class="btn btn-info button">Log In</button>
          </a>
          <a href="/register" >
             <button class="btn btn-info button">Sign up</button>
          </a>
         
        </div>
      </div>
    </div>
</template>

<script>
  import Navbar from '@/components/Navbar';
  export default {
    components: {
        Navbar, 
    },
    data() {
      return {
        image: require('@/assets/2.jpg')
      }
    },
    methods: {
      
    }
  }
</script>

<style>
  .all{
    display: flex;
    flex-direction: column;
    height:100vh;
  }
  .cover{
    flex: 1;
    flex-direction: column;
    box-shadow:inset 0 0 0 2000px rgba(0, 0, 0, 0.658);
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .titulo{
    text-align: center;
    color: white;
    font-size: 4rem;
    font-weight: bold;
  }

  .buttonContainer{
    display: flex;
    justify-content: space-between;
  }
  .button{
    margin-right: 10px;
    font-size: 1.2rem!important;
  }
</style>