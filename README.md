# post-alerter
[node.js] 크롤링을 이용한 새 게시글 문자 알림

### 개요
여자친구의 교직원 계약이 2021년 8월에 끝이난다. 계약이 끝나면 당분간 실업급여를 받을 예정이었지만 그 전에 학교에 계약직이 아닌 정규직 취업 기회가 된다면 취업을 하리라 계획하던 중 어느날 학교의 정규직 채용공고가 올라와 있었다. 하지만 지원날짜는 **어제**까지 였던것! 이런 낭패를 겪고 앞으로 채용공고가 올라왔는지 웹페이지에 들어가서 확인해야하는 번거로움이 따랐다. 하지만 최근 node.js의 맛을 좀 보고 **어깨뽕**이 좀 올라가있던 차에 그런일이 생겨 멋들어지게 **"내가 만들어줄게! 걱정하지마!"** 라고 말해버리고 개발을 하게 된것이다.

<br/>

### 요구사항
요구사항은 매우 간단했다.
> **새로운 게시글이 올라온다면 문자로 알려주는 서비스**

<br/><br/>
      
### 코드
```javascript
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
```
![](https://images.velog.io/images/charming__kyu/post/704e626d-b483-4d31-8433-ea7624c41c77/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-02-15%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%204.32.36.png)일단 해당 홈페이지의 HTML을 간단히 분석 후 코딩을 한다. 
(해당 게시물번호와 제목은 tbody > tr의 1번자식과 2번자식인 td를 가져온다.) 
axios로 get하여 HTML을 가져온 뒤 cheerio로 파싱하여 게시글의 번호와 제목만 싹 긁어왔다. 현재 31번 게시글까지 있으니 global 변수를 31로 선언 후 31보다 큰 숫자가 나오면 문자를 보내는 로직만 추가 한다면 벌써 끝!
<br/><br/>
```javascript
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
            text: '[XX노예봇]\nXXXX님! \"' + postList[i].content + '\"라는 새로운 채용공고가 올라왔습니다. 확인해주세요!!! 오늘 하루도 화이팅하세요!\n사랑해요!\n-XX노예 올림',
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
```
![](https://images.velog.io/images/charming__kyu/post/62d9d521-02b0-4580-adc6-be0a43c40bd2/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-02-15%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%204.57.26.png) 문자서비스는 **coolsms**를 사용했다. crypto-js의 HmacSHA256를 사용해 apikey인증을 해야하지만 저번 프로젝트에서 쿠팡api를 이용할 때 Hmac/SHA256을 이용한 사용자 인증을 해봤기에 손쉽게 추가가 가능했다. 문자전송 기능을 추가 후 마지막으로 setInterval로 주기적인 반복을 만들고 끝!
<br/>

> ** 블로그 주소 = > https://velog.io/@charming__kyu/postAlerter **
