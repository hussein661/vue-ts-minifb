<template>
  <div id="app">
    <div id="nav" v-if="isLoginPage">
      <div class="nav-items nav-items-wrap">
        <div class="" >
        <router-link to="/">Home</router-link>
        <router-link to="/profile">Profile</router-link>
        </div>
        <div>
        <a class="logout" @click="logout" href="#">logout</a>
        </div> 
      </div>
    </div>
    <router-view />
  </div>
</template>
<script>
import firebase from "./firebase/firebaseConfig";

export default {
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  data(){
    return {

    currentPage:''
    }

  },
  computed:{
    isLoginPage(){
      return this.currentPage === 'login'
    }
  },
  mounted() {
    if(window.location.pathname !== '/login'){
      this.currentPage = 'login'
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // ...
        firebase.firestore().collection("users").where("uid", "==", user.uid)
          .get()    .then((querySnapshot)=> {
        querySnapshot.forEach((doc)=> {
            // doc.data() is never undefined for query doc snapshots
            const user =  doc.data()
            this.$store.commit('setUser',user)
        });
    })
      } else {
        this.$router.push("/login");
        // User is signed out
        // ...
      }
    });
  }else {
    this.currentPage = window.location.pathname
  }},

  methods: {
    logout() {
      firebase.auth().signOut();
      this.$router.push("/login");
    },
  },
};
</script>
<style lang="scss">
html,
body {
  padding: 0;
  margin: 0;
  background: #f0f2f5;
}
* {
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

  padding: 0;
  margin: 0;
}

#nav {
  background: #1b74e4;

  .nav-items {
    padding: 13px;
  }
  a,.logout {
    margin: 20px;
    padding: 10px;
    font-weight: bold;
    color: white;
    font-size: 22px;
    text-transform: uppercase;
    text-decoration: none;
    &.router-link-exact-active {
      color: white;
    }
  }
}

.card {
  cursor: pointer;
  transition: 0.33s;
  &:hover {
    //  transform: scale(1.06);
    transition: 0.33s;
  }
  margin-bottom: 10px;
  background: white;
  line-height: 30px;
  padding: 10px;
  border-radius: 10px;
  -webkit-box-shadow: 1px 2px 4px 1px rgba(204, 204, 204, 1);
  -moz-box-shadow: 1px 2px 4px 1px rgba(204, 204, 204, 1);
  box-shadow: 1px 2px 4px 1px rgba(204, 204, 204, 1);
}

.h3 {
  font-weight: bold;
  padding-top: 5px;
  font-size: 25px;
}

.nav-items-wrap {
  display: flex;
  justify-content: space-between;
}
</style>
