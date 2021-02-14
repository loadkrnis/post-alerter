const axios = require("axios");
const cheerio = require("cheerio");
const log = console.log;
const { config, Group } = require('../')
const key = require('../config.json') //api키
var maxPostNumber = 30;

config.init({
  apiKey: key.apiKey,
  apiSecret: key.apiSecret
});

async function send(message, agent = {}) {
  try {
    console.log(await Group.sendSimpleMessage(message, agent))
  } catch (error) {
    console.error(error);
  }
}

let getHtml = async () => {
  try {
    return await axios.get("https://www.bc.ac.kr/user/nd70345.do");
  } catch (error) {
    console.error(error);
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
          data = {
            type: 'SMS',
            text: '[지민노예봇]\n지민공주님!\n\"' + postList[i].content + '\"\n라는 새로운 채용공고가 올라왔습니다.',
            to: '01042614444',
            from: '01042614444'
          };
          // send(data);
        }
      });
      return postList;
    })
    .then(res => log("현재 최대 게시물 번호 : " + maxPostNumber));
}, 2000);

module.exports = {
  getHtml
}