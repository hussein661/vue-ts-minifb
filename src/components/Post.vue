<template>
  <div class="post-content">
   <h3>{{post.title.split(" ")[0]}}</h3>
   <p>{{post.body}}</p>
   <div class="counters">
       <div class="counter-item">{{likes}} likes</div>
       <div class="counter-item">{{comments.length}} comments</div>

   </div>
    <hr />
    <div class="actions">
        <div class="action-item" @click="likes++">Like</div>
        <div class="action-item" @click="isCommentBoxOpened = !isCommentBoxOpened">Comment</div>
        <div class="action-item">Share</div>
    </div>
    <hr />
    <div class="comment" v-for="comment in comments" :key="comment.id">
        <div class="user email-user">{{comment.email}}</div>
        <div class="user">{{comment.body}}</div>
        <hr />
    </div>
    <div class="input-box" v-if="isCommentBoxOpened">
        <form @submit="submit">
        <input placeholder="Type a comment ..." v-model="commentBody"/>
        </form>
    </div>
  </div>
</template>

<script lang="ts">
import Axios from "axios";
import { Component, Emit, Prop, Vue } from "vue-property-decorator";

@Component
export default class Post extends Vue {
  @Prop() readonly post!: any
  private likes = 0
  private isCommentBoxOpened = false
  commentBody = ''
  public comments:Array<object> = []
  mounted(){
      Axios.get('https://jsonplaceholder.typicode.com/posts/'+this.post.id+'/comments').then(res=>{
          this.comments = res.data
      })
  }
  submit(e:any){
      e.preventDefault()
      this.comments.push({
          id:(new Date()).getTime(),
          email:'you',
          body:this.commentBody
      })
      this.commentBody = ''
      this.isCommentBoxOpened = false
  }
}

</script>

<style lang="scss" scoped>
.post-content {
text-align: left;
}
.actions {
display: flex;
justify-content: space-around;
.action-item {
&:hover {
    color: lightskyblue;;
}
}

}

.counters {
    display: flex;
    justify-content: space-between;
}

.input-box {
    input,textarea {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    outline: none;
    border-color: lightskyblue;
    }
}
.comment {
    font-size: 12px;
    line-height: initial;
    color: grey;
}

.email-user {
    color: black;
    font-weight: bold;
    padding: 2px 0;
}
</style>