const axios = require("axios");
const cheerio = require("cheerio");
const { config, Group } = require('../')
const key = require('../config.json') //api키
const moment = require('moment');
const log = console.log;
var maxPostNumber = 31;
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");

console.log("Server started at " + moment().format("YYYY-MM-DD HH:mm:ss"));

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
          console.log("[새로운 게시물 발생] 게시물번호:[" + postList[i].postNumber + "] 게시물:[" + postList[i].content + "]");
          data = {
            type: 'LMS',
            text: '[지민노예]\n공주님 \"' + postList[i].content + '\"라는 새로운 채용공고가 올라왔습니다. 확인해주세요. 오늘도 정말 많이 사랑해요.\n-지민노예 올림\n게시물 보러가기 https://www.bc.ac.kr/user/nd70345.do',
            to: key.phoneNumber,
            from: key.phoneNumber
          };
          send(data);
          data.to = key.targetNumber;
          send(data);
        }
      });
      return postList;
    })
    .then(res => log("Current Post Number:[" + maxPostNumber + "]  -  " + moment().format("YYYY-MM-DD HH:mm:ss")));
}, 300000);