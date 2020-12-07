<template>
    <div class="profile">
    <div class="header">
      <div class="main-title h3">Hussein Hussein</div>
      <p class="main-title">Front end developer</p>
      <hr />
      <div class="menu">
        <div class="menu-item" :class="{active:active === 'posts'}" @click="$router.push('profile')">Posts</div>
        <div class="menu-item">Photos</div>
        <div class="menu-item" :class="{active:active === 'friends'}" @click="$router.push('friends')" >Friends</div>
        <div class="menu-item">More</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props:{
        active:{
            type:String,
            default:''
        }
    }
}
</script>

<style lang="scss" scoped>
.header {
  text-align: center;
  background: white;
  padding: 1px;
  margin-bottom: 10px;
}

.menu {
  display: flex;
  max-width: 300px;
  margin:0 auto;
  justify-content: space-between;
  
  .menu-item {
    padding: 10px;
  cursor: pointer;
  &:hover {
    color: lightskyblue;
  }
    &.active {
      color: lightskyblue;
  }
  }


}
</style>