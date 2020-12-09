<template>
  <div class="post-content">
   <h3>{{post.name}}</h3>
   <p>{{post.body}}</p>
   <div class="counters">
       <div class="counter-item">{{post.likes}} likes</div>
       <div class="counter-item">{{post.comments.length}} comments</div>

   </div>
    <hr />
    <div class="actions">
        <div class="action-item" @click="incrementLikes">Like</div>
        <div class="action-item" @click="isCommentBoxOpened = !isCommentBoxOpened">Comment</div>
        <div class="action-item">Share</div>
    </div>
    <hr />
    <div class="comment" v-for="comment in post.comments" :key="comment.id">
        <div class="user email-user">{{comment.commenter}}</div>
        <div class="user">{{comment.commentBody}}</div>
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
import firebase from "../firebase/firebaseConfig";
const db = firebase.firestore();
@Component
export default class Post extends Vue {
  @Prop() readonly post!: any
  private isCommentBoxOpened = false
  commentBody = ''
  incrementLikes(){
      this.post.likes++
          db.collection("posts")
        .doc(this.post.id)
        .update({
          likes: this.post.likes,
        })
  }
  submit(e:any){
      e.preventDefault()
      const comment = {
          id:(new Date()).getTime(),
          commenter:this.$store.state.user.name,
          commentBody:this.commentBody
      }
      db.collection("posts")
        .doc(this.post.id)
        .update({
          comments: [...this.post.comments,comment],
        }).then(
        this.post.comments.push(comment)
      )
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