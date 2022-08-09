const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

console.log(format(new Date(), 'yyyyMMdd\tHH:mm:ss')); // 20220807        00:08:44

console.log(uuid());


