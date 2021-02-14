const posts = require('./index');
 
console.log("start!");
setInterval(function() {
  console.log("tick!");
  posts.getHtml().then(html => {
    console.log("then1");
    let postList = [];
    const $ = cheerio.load(html.data);
    const $postNumber = $("tbody").children("tr");

    $postNumber.each(function(i, elem) {
      postList[i] = {
        postNumber: $(this).find('td:nth-of-type(1)').text().trim(),
        content: $(this).find('td:nth-of-type(2)').text().trim()
      };
      if(maxPostNumber == parseInt(postList[i].postNumber) + 1) {
        maxPostNumber = parseInt(postList[i].postNumber) + 1;
        console.log("새로운 게시물 발생\n게시물번호 : " + postList[i].postNumber + "\n게시물 : " + postList[i].content);
      }
    });

    // const data = ulList.filter(n => n.title);
    return postList;
  })
}, 3000);
