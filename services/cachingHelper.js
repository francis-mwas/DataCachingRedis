const mongoose = require('mongoose');
const redis = require('redis');

const exec = mongoose.Query.prototype.exec;
const redisUrl = 'redis://127.0.0.1:6379';

const client = redis.createClient(redisUrl);
client.on('connect', () => console.log('Connected to Redis!'));
client.on('error', (err) => console.log('Redis Client Error', err));
client.connect();

// now lets us add more functionality to exec function
mongoose.Query.prototype.exec = function () {
  console.log('About to issue a QUERY');

  const key = Object.assign({}, this.getQuery(), {
    collection: this.mongooseCollection.name,
  });

  console.log(key);

  return exec.apply(this, arguments);
};

// Person.find({ occupation: /host/ })
//   .where('name.last')
//   .equals('Ghost')
//   .where('age')
//   .gt(17)
//   .lt(66)
//   .where('likes')
//   .in(['vaporizing', 'talking'])
//   .limit(10)
//   .sort('-occupation')
//   .select('name occupation')
//   .exec(callback);
