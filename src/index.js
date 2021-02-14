const axios = require("axios");
const cheerio = require("cheerio");
const log = console.log;

var maxPostNumber = 28;

let getHtml = async () => {
  try {
    return await axios.get("https://www.bc.ac.kr/user/nd70345.do");
  } catch (error) {
    console.error(error);
  } finally {
    // return await getHtml.postList;
  }
};
setInterval(function () {
  getHtml()
    .then(html => {
      let postList = [];
      const $ = cheerio.load(html.data);
      const $postNumber = $("tbody").children("tr");

      $postNumber.each(function (i, elem) {
        postList[i] = {
          postNumber: $(this).find('td:nth-of-type(1)').text().trim(),
          content: $(this).find('td:nth-of-type(2)').text().trim()
        };
        if (maxPostNumber + 1 == parseInt(postList[i].postNumber)) {
          maxPostNumber++;
          console.log("새로운 게시물 발생\n게시물번호 : " + postList[i].postNumber + "\n게시물 : " + postList[i].content);
        }
      });

      // const data = ulList.filter(n => n.title);
      return postList;
    })
    .then(res => log("현재 최대 게시물 번호 : " + maxPostNumber));

}, 2000);

module.exports = {
  getHtml
}