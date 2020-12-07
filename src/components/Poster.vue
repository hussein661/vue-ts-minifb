<template>
    <div class="input-container">
    <form @submit="submit">
        <input placeholder="What's on your mind ?" v-model="postBody" />
    </form>
   </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
@Component
export default class Poster extends Vue { 
    postBody = ''
    submit(e:any){
        e.preventDefault()
        this.$emit('newPost',this.postBody)
        this.postBody = ''
    }
}
</script>

<style lang="scss" scoped>
.input-container {
    margin-bottom: 10px;
   input {
    width: 100%;
    padding: 20px;
    border-radius: 5px;
    outline: none;
    border:1px solid lightgrey;
}
   }
</style>