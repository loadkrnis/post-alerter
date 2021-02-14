const posts = require('./index');
 
console.log("start!");
setInterval(function() {
  console.log("tick!");
  posts.getHtml()
}, 3000);
