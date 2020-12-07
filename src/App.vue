<template>
  <div id="app">
    <div id="nav">
      <div class="nav-items">
      <router-link to="/">Home</router-link>
      <router-link to="/profile">Profile</router-link>
      </div>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
html,body {
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
  max-width: 800px;
  padding: 13px;

}
  a {
    margin: 20px;
    padding: 10px;
    font-weight: bold;
    color: #2c3e50;
    font-size: 26px;
    text-transform: uppercase;
    text-decoration: none;
    &.router-link-exact-active {
      color: white;
    }
  }
}

   .card {
    cursor: pointer;
    transition: .33s;
    &:hover{
      //  transform: scale(1.06);
       transition: .33s;
    }
    margin-bottom: 10px;
     background: white;
     line-height: 30px;
     padding: 10px;
     border-radius: 10px;
     -webkit-box-shadow: 1px 2px 4px 1px rgba(204,204,204,1);
-moz-box-shadow: 1px 2px 4px 1px rgba(204,204,204,1);
box-shadow: 1px 2px 4px 1px rgba(204,204,204,1);
   }

    .h3 {
      font-weight: bold;
      padding-top: 5px;
      font-size: 25px;
      
 } 

</style>
