import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

global.EventHub = new Vue();

//Android接口
global._post_que = [];
global.appendPost = function (post){
  if ( toString.call(post) === "[object String]")
    post = JSON.parse(post);
  _post_que.push(post);
  EventHub.$emit('appendPost');  
}
global.setMe = function ( me ){
  if ( toString.call(me) === "[object String]")
    me = JSON.parse(me);
  global.Me = me;
}
global.setGuest = function ( guest ){
  if ( toString.call( guest ) === "[object String]")
    guest = JSON.parse( guest );
  global.Guest = guest;
}

global.Me = global.Me || {
  openId:"winys",
  icon:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLpY7YvdWLphsuZol9lYUQTPVDkb8u_0hF6ly0Ge1g3qoSFxBj"
}

global.Guest = global.Guest ||{
  openId:"winys2",
  icon:""
}

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
