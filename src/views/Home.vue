<template>
  <div class="home">
    <div class="post-input">
      <div class="posts">
        <Poster @newPost="newPost" />
      </div>
    </div>
    <div class="posts">
      <div class="post" v-for="post in posts" :key="post.id"><Post :post="post"/></div>
      <hr />
    </div>
  </div>
</template>

<script lang="ts">
import HelloWorld from "@/components/HelloWorld.vue";
import Post from "@/components/Post.vue";
import Poster from "@/components/Poster.vue";
import Axios from 'axios'
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import firebase from "../firebase/firebaseConfig";
const db = firebase.firestore();

@Component({
  components:{
    Post,
    Poster
  }
})
export default class Home extends Vue {
  private posts:Array<object> = []
  mounted(){
    this.getPosts()

}
   public getPosts():void{
   db.collection("posts").get().then(querySnapshot=> {
     querySnapshot.forEach((doc:any) => {
        this.posts.push({...doc.data(),id:doc.id})
    });
});
  }
  newPost(postBody:string){
     this.$store.commit('appendMyPosts',postBody)
      db.collection("posts")
          .add({ name: this.$store.state.user.name ,body:postBody,likes:0,comments:[],created:new Date().getTime()  })
          .then((res) => {
          res.get().then((resp:any)=>{
              this.posts.unshift({...resp.data(),id:resp.id})
            })
            console.log("Document successfully written!");
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });
        
  }

}

</script>

<style lang="scss" scoped>

 .posts {
   max-width: 700px;
   margin: 50px auto;
   .post {
         cursor: pointer;
    transition: .33s;
    &:hover{
      //  transform: scale(1.06);
       transition: .33s;
    }
     background: white;
     line-height: 30px;
     padding: 10px;
     margin-bottom: 10px;
     border-radius: 10px;
     -webkit-box-shadow: 1px 2px 4px 1px rgba(204,204,204,1);
-moz-box-shadow: 1px 2px 4px 1px rgba(204,204,204,1);
box-shadow: 1px 2px 4px 1px rgba(204,204,204,1);
   }
 }




</style>
