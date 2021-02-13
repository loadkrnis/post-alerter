const axios = require("axios");
const cheerio = require("cheerio");
const log = console.log;

const getHtml = async () => {
  try {
    return await axios.get("https://www.bc.ac.kr/user/nd70345.do");
  } catch (error) {
    console.error(error);
  }
};
 
getHtml()
  .then(html => {
    let postList = [];
    const $ = cheerio.load(html.data);
    const $postNumber = $("tbody").children("tr");

    $postNumber.each(function(i, elem) {
      postList[i] = {
        postNumber: $(this).find('td:nth-of-type(1)').text().trim(),
        content: $(this).find('td:nth-of-type(2)').text().trim()
      };
    });

    // const data = ulList.filter(n => n.title);
    return postList;
  })
  .then(res => log(res));
