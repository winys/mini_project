<template>
  <div class="chatmain">
    <ul>
        <li v-for="post in posts" key="$index">
            <Post  :post="post" v-once></Post>
        </li>
    </ul>
  </div>
</template>

<script>
import Post from "./Post"
export default {
    data (){
        return{
            posts:[]
        }
    },
    components:{
        Post
    },
    created (){
        this.appendPost()
        EventHub.$on("sendMsg",this.sendMsg.bind(this));
        EventHub.$on("appendPost",this.appendPost.bind(this));
    },
    methods: {
        sendMsg( data ){
            this.posts.push( {
                from : data.from,
                message : data.message,
                is_from_me: data.from.openId === Me.openId
            } );
        },
        appendPost (){
            for ( let item of _post_que){
                this.posts.push({
                    from : item.from,
                    message : item.message,
                    is_from_me: item.from.openId === Me.openId
                });
            }
            _post_que = [];
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chatmain{
    overflow: auto;
    background-color: #f0f2f8;
}
</style>
