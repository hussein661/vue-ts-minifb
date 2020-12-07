<template>
  <div class="profile">
    <Header active="posts" />
    <div class="next">
      <div class="left">
        <div class="intro card">
          <div class="header-intro">
            <h4>Intro</h4>
            <div class="edit">
              <a href="#" @click="isEditModeOpened = true">Edit</a>
            </div>
          </div>
          <ul type="none">
            <li>{{ user.position }}</li>
            <li>{{ user.major }}</li>
            <li>Studied at {{ user.uni }}</li>
            <li>Lives in {{ user.address }}</li>
            <li>{{ user.dob }}</li>
          </ul>
        </div>
        <div class="photos card">
          <h4>Photos</h4>
          <div class="profile-images">
            <img
              src="https://scontent.fbey5-1.fna.fbcdn.net/v/t1.0-9/53529128_538953023295972_6921377172309409792_o.jpg?_nc_cat=100&ccb=2&_nc_sid=8bfeb9&_nc_ohc=UNWOFxkiNSAAX9ydvta&_nc_ht=scontent.fbey5-1.fna&oh=0c2d0c3e67c6278c69855c7edbc349d2&oe=5FF19436"
            />
            <img
              src="https://scontent.fbey5-1.fna.fbcdn.net/v/t1.0-9/49241524_501786493679292_5104874235398979584_o.jpg?_nc_cat=102&ccb=2&_nc_sid=8bfeb9&_nc_ohc=QBAtCDrwbLQAX9_n2hu&_nc_ht=scontent.fbey5-1.fna&oh=d8d3e43ca36c2af06f5918d81ceddc48&oe=5FF53CEA"
            />
            <img
              src="https://scontent.fbey5-1.fna.fbcdn.net/v/t1.0-9/43141224_448997928958149_1788527418319831040_n.jpg?_nc_cat=103&ccb=2&_nc_sid=8bfeb9&_nc_ohc=rpxwM3aCsnIAX8Vkv3I&_nc_ht=scontent.fbey5-1.fna&oh=f7a4d9a7cc0d7c6078f2b1a97794f40b&oe=5FF4B2A2"
            />
            <img
              src="https://scontent.fbey5-2.fna.fbcdn.net/v/t1.0-9/103024035_10158288820849449_3393438162158926642_o.jpg?_nc_cat=104&ccb=2&_nc_sid=8bfeb9&_nc_ohc=fBOtpP6S0A0AX-hCP2S&_nc_ht=scontent.fbey5-2.fna&oh=70498549230a87037689ad22fa0952fc&oe=5FF42F96"
            />
            <img
              src="https://scontent.fbey5-1.fna.fbcdn.net/v/t1.0-9/53529128_538953023295972_6921377172309409792_o.jpg?_nc_cat=100&ccb=2&_nc_sid=8bfeb9&_nc_ohc=UNWOFxkiNSAAX9ydvta&_nc_ht=scontent.fbey5-1.fna&oh=0c2d0c3e67c6278c69855c7edbc349d2&oe=5FF19436"
            />
            <img
              src="https://scontent.fbey5-1.fna.fbcdn.net/v/t1.0-9/49241524_501786493679292_5104874235398979584_o.jpg?_nc_cat=102&ccb=2&_nc_sid=8bfeb9&_nc_ohc=QBAtCDrwbLQAX9_n2hu&_nc_ht=scontent.fbey5-1.fna&oh=d8d3e43ca36c2af06f5918d81ceddc48&oe=5FF53CEA"
            />
            <img
              src="https://scontent.fbey5-1.fna.fbcdn.net/v/t1.0-9/43141224_448997928958149_1788527418319831040_n.jpg?_nc_cat=103&ccb=2&_nc_sid=8bfeb9&_nc_ohc=rpxwM3aCsnIAX8Vkv3I&_nc_ht=scontent.fbey5-1.fna&oh=f7a4d9a7cc0d7c6078f2b1a97794f40b&oe=5FF4B2A2"
            />
            <img
              src="https://scontent.fbey5-2.fna.fbcdn.net/v/t1.0-9/103024035_10158288820849449_3393438162158926642_o.jpg?_nc_cat=104&ccb=2&_nc_sid=8bfeb9&_nc_ohc=fBOtpP6S0A0AX-hCP2S&_nc_ht=scontent.fbey5-2.fna&oh=70498549230a87037689ad22fa0952fc&oe=5FF42F96"
            />
            <img
              src="https://scontent.fbey5-2.fna.fbcdn.net/v/t1.0-9/103024035_10158288820849449_3393438162158926642_o.jpg?_nc_cat=104&ccb=2&_nc_sid=8bfeb9&_nc_ohc=fBOtpP6S0A0AX-hCP2S&_nc_ht=scontent.fbey5-2.fna&oh=70498549230a87037689ad22fa0952fc&oe=5FF42F96"
            />
          </div>
        </div>
        <div class="friends card">
          <h4>Friends</h4>
          <div class="profile-images">
            <div v-for="(friend, i) in friends" :key="i">
              <!-- {{friend}} -->
              <div v-if="i < 9" class="friend-item">
                <div class="img"><img :src="friend.url" /></div>
                <div class="name">{{ friend.title.split(" ")[0] }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="main-scroll ">
        <div><Poster @newPost="newPost" /></div>
        <div class="my-posts">
          <div class="posts">
            <div class="post card" v-for="post in posts" :key="post.id">
              <Post :post="post" />
            </div>
            <hr />
          </div>
        </div>
      </div>
    </div>
    <div class="editForm-wrapper" v-if="isEditModeOpened">
      <div class="edit-form-content">
        
        <h1>Edit your info</h1>
        <div class="error" v-if="errors">
<transition-group class="list-group" name="errors-list" tag="ul">            
            <li v-for="(error,i) in errors" :key="i">{{error}}</li>
          </transition-group>
        </div>
        <form @submit="saveInfo">
          <div class="input-wrapper">
            <label>position</label>
            <input v-model="user.position" />
          </div>
          <div class="input-wrapper">
            <label>Major</label>
            <input v-model="user.major" />
          </div>
          <div class="input-wrapper">
            <label>University</label>
            <input v-model="user.uni" />
          </div>
          <div class="input-wrapper">
            <label>Adress</label>
            <input v-model="user.address" />
          </div>
          <div class="input-wrapper">
            <label>Date Of Birth</label>
            <input v-model="user.dob" />
          </div>
          <button type="submit" class="save">Save</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import Post from "@/components/Post.vue";
import Poster from "@/components/Poster.vue";

import Header from "@/components/Header.vue";

import Axios from "axios";
@Component({
  components: {
    Post,
    Header,
    Poster,
  },
})
export default class Profile extends Vue {
  user = {
    position: "Front end developer",
    major: "Computer sciences",
    uni: "AUCE",
    address: "beirut, lebanon",
    dob: "10 june",
  };
  friends = [];
  savedUser={};
  isEditModeOpened = false;
  errors:any=[]
  newPost(postBody: string) {
    this.$store.commit("appendMyPosts", postBody);
  }
  mounted(){
    this.savedUser = this.user
  }
  saveInfo(e:any){
    this.errors = []
    e.preventDefault(e)
    for (const [key, value] of Object.entries(this.user)) {
      if(!value){
        this.errors.push(key + ' is required')
      }
}
   if(this.errors && this.errors.length){
    return
    }
    this.isEditModeOpened = false
    this.savedUser = this.user

  }
  get posts() {
    return this.$store.state.myPosts;
  }
}
</script>

<style lang="scss" scoped>
.next {
  max-width: 700px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 40% 60%;
}

ul {
  padding: 0;
  font-weight: 300;
  color: grey;
  font-size: 15px;
}

.profile-images {
  display: grid;
  grid-template-columns: 33.33% 33.33% 33.33%;
  img {
    width: 100%;
    // height: 100px;
    padding: 2px;
    transition: 0.2s;
    &:hover {
      transform: scale(1.07);
      transform: 0.2s;
    }
  }
}
.left {
  margin-right: 10px;
}

.post {
  margin-bottom: 10px;
}
.friend-item {
  text-align: center;
}

.main-scroll {
  overflow-y: scroll;
  max-height: 1000px;
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.header-intro {
  display: flex;
  justify-content: space-between;
}

.editForm-wrapper {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(24, 24, 24, 0.57);
  z-index: 99;
  left: 0;
  top: 0;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  .edit-form-content {
    background: white;
    width: 50%;
    border-radius: 10px;
    padding: 10px;

    .input-wrapper {
      margin: 10px;
      width: 400px;
      display: flex;
      justify-content: space-between;;
      label {
      }
      input {
        padding: 10px 25px;
        border-radius: 9px;
        border: 1px solid lightgray;
        outline: none;

      }
    }
  }
}
.save {
  font-size: 20px;
  padding: 6px 12px;
  margin: 10px;
  color: white;
  border:none;
  cursor: pointer;
}
.save {
  background: lightblue;
  
}

.error {
  li{
  color: red;
    
  }
}
.errors-list-move {
  transition: transform 1s;
}
</style>
