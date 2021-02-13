const schedule = require('node-schedule');

// var rule = new schedule.RecurrenceRule();
// rule.second = 5;
schedule.scheduleJob('3 * * * *', function(){
  console.log('매 3초에 실행');
});