const axios = require("axios");
const cheerio = require("cheerio");
const log = console.log;
const { config, Group } = require('../')


var maxPostNumber = 30;

config.init({
  apiKey: 'NCSMQ16BEMIBHLCG',
  apiSecret: 'QQEUWNUOMWSLFNEJQ05D2ABQE5NDFXPE'
});

async function send(message, agent = {}) {
  console.log(await Group.sendSimpleMessage(message, agent))
}

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
          try {
             send({
              type: 'SMS',
              text: '[지민노예봇]\n지민공주님! "' + postList[i].content + '"라는 새로운 게시글이 올라왔습니다.',
              to: '01042614444',
              from: '01042614444'
            });
          } catch (error) {
            console.error(error);
          }
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