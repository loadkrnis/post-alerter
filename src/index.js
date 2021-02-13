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
    let ulList = [];
    const $ = cheerio.load(html.data);
    const $postNumber = $("tbody").children("tr").children("td");

    $postNumber.each(function(i, elem) {
      ulList[i] = {
        //   title: $(this).find('strong.news-tl a').text(),
        //   url: $(this).find('strong.news-tl a').attr('href'),
        //   image_url: $(this).find('p.poto a img').attr('src'),
        //   image_alt: $(this).find('p.poto a img').attr('alt'),
        //   summary: $(this).find('p.lead').text().slice(0, -11),
        //   date: $(this).find('span.p-time').text()
        title: $(this).text()
      };
    });

    const data = ulList.filter(n => n.title);
    return data;
  })
  .then(res => log(res));