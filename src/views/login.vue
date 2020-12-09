<template>
<div>
          <div class="main">
          <h1>
          JOIN MINI FB NOW...
          </h1>
          <div class="error" v-if="error">{{error}}</div>
      </div>
  <div class="forms">

    <div class="login-form">
      <input v-model="email" placeholder="email" autocomplete="off" />
      <input v-model="password" type="password"  placeholder="password" autocomplete="off"/>
      <button @click="login">Login</button>
    </div>
    <div class="register-form">
      <input v-model="newemail" placeholder="email" autocomplete="off"/>
      <input v-model="newpassword" type="password" placeholder="password" autocomplete="off"/>
      <input v-model="name" placeholder="Full name"/>
      <input v-model="position" placeholder="position"/>
      <input v-model="major" placeholder="major"/>
      <input v-model="address" placeholder="address"/>
      <input v-model="dob" placeholder="date of birth" />
      <button @click="signup">Sign up</button>
    </div>
  </div>
</div>

</template>

<script>
import firebase from "../firebase/firebaseConfig";

export default {
  data() {
    return {
       error:'',
      email: "",
      password: "",
      newemail:'',
      newpassword:'',
      name:'',
      position:'',
      major:'',
      address:'',
      dob:''


    };
  },
  methods: {
    createUser(uid){
        firebase.firestore().collection("users")
          .add({ uid,name: this.name ,position:this.position,major:this.major,address:this.address,dob:this.dob,email:this.newemail  })
          .then((res) => {
              this.$router.push('/')
          })
    },
    signup() {
          firebase
            .auth()
            .createUserWithEmailAndPassword(this.newemail, this.newpassword)
            .then((res) => {
              this.createUser(res.user.uid)
              
            })
            .catch((err) => {
              this.error = err.message
            });
    },
    login(){
    firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((user) => {
          this.$router.push("/");
    
        }).catch(err=>{
            this.error = err.message
        })
    }
  },
};
</script>

<style lang="scss" scoped>
.error {
    color:red
}
.forms {
    display: flex;
    justify-content: space-around;
    max-width: 700px;
    margin: 0 auto;
}

.register-form,.login-form {
    text-align: center;
   input {
    width: 100%;
    display: block;
    padding: 10px;
    margin: 10px;
    border-radius: 5px;
    outline: none;
    border:1px solid lightgrey;

}
button {
    background: #1b74e4;
    color: white;
    border: none;
    padding: 10px 15px;
    text-transform: uppercase;
    font-weight: bold;
}
}
.main {
    text-align: center;
}
</style>
