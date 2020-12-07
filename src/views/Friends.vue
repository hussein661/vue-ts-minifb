<template>
   <div class="friends card">
    <Header active="friends"/>
    <div class="search-box">
        <input  placeholder="search..." @input="filter"/>
    </div>
    <div  v-if="friends && friends.length">
        <transition-group name="fade" class="friends-display">
        <div v-for="friend in filtered" :key="friend.id" class="contain-item">
            <div class="img"><img :src="friend.url" /></div>
            <div class="name">{{friend.title.split(' ')[0]}}</div>
        </div>
        </transition-group>
    </div>
    <!-- <div v-else class="friends-display">
     <div v-for="s in 200" :key="s">
            <div class="img grey"><img src="https://images.pexels.com/photos/242236/pexels-photo-242236.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" /></div>
            <div class="name grey">---</div>
        </div>
    </div> -->
   </div>
</template>

<script lang="ts">

import { Component, Emit, Prop,Vue } from "vue-property-decorator";
import Header from "@/components/Header.vue";
import Axios from "axios";
// import Axios from "axios";
@Component({
  components:{
    Header
  }
})
export default class Profile extends Vue {
  friends = [];
  filtered = []
  newPost(postBody:string){
        this.$store.commit('appendMyPosts',postBody)
  }
  get posts(){
    return this.$store.state.myPosts
  }
  mounted(){
    Axios.get('https://jsonplaceholder.typicode.com/albums/1/photos').then(res=>{
       this.friends = res.data
       this.filtered = this.friends
      
    })
  }
  filter(e: any){
      const val = e.target.value
      if(val){
      this.filtered = this.friends.filter((fr:any)=>fr.title.includes(val))
      }else {
          this.filtered = this.friends
      }
  }
}
</script>

<style lang="scss" scoped>
.friends-display {
    max-width: 700px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(5,20%);
    grid-gap: 10px;
    text-align: center;
    img {
        width: 100%;
    }
}
.search-box {
    max-width: 700px;
    margin:10px auto;
    input {
        width: 100%;
        padding:10px;
        border-radius: 7px;
        border-color: lightgrey;
        outline: none;

    }
}



.contain-item {
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateY(0px);

  &:hover {
    transform: translateY(-5px);
  }
  
}

.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  transition: all 1s;
}

.fade-leave {
}

// NEED TO ADD POSITION: ABSOLUTE TO THE ELEMENT FOR REMOVAL
.fade-leave-active {
  transition: all .3s;
  opacity: 0;
  transform: translateY(0);
  position: absolute;
}

.fade-move {
  transition: all .5s cubic-bezier(0.77, 0, 0.175, 1);
  @for $i from 1 through 15 {
    &:nth-child(#{$i}) {
       transition: transform .4s #{$i * 0.1}s cubic-bezier(0.77, 0, 0.175, 1);
    }
  }

}

</style>