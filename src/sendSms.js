const axios = require('axios');

async function makeGetRequest() {

    let data = {
        "type": "SMS",
        "from": "string",
        "subject": "string",
        "content": "string",
        "messages": [
            {
                "to": "string",
                "subject": "string",
                "content": "string"
            }
        ],
        "files": [
            {
                "name": "string",
                "body": "string"
            }
        ],
        "reserveTime": "yyyy-MM-dd HH:mm",
        "reserveTimeZone": "string",
        "scheduleCode": "string"
    }

    let res = await axios.post('http://httpbin.org/post', data);

    let reponse = res.data;
    console.log(reponse);
}

makeGetRequest();