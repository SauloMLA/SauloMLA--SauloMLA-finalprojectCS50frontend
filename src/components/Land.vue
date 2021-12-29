<template>
  <div>
      <Navbar/>
    <div class="hero">
        <div class="center-aligned">
            <b-img :src="image" fluid class="background-image"></b-img>
            <div class="text"><h1>Notes WebApp</h1>
        </div>
    </div>
    </div>
    <!-- Part Two, Little description about me and no forget the copyright -->
    <footer class="text-center" style="border-radius:10px;"> Copyright &copy; - All Rights Reserved 2021 </footer>
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


.center-aligned {
  display: box;
  display: flex;
  box-align: center;
  align-items: center;
  box-pack: center;
  justify-content: center;
}

.background-image {
  position: relative;
}

.text {
  position: absolute;  
  left: 50%;                        
  top: 50%;                         
  transform: translate(-50%, -50%); 
  color: white;
}
</style>