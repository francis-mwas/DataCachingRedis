const mongoose = require('mongoose');
const redis = require('redis');

const exec = mongoose.Query.prototype.exec;
const redisUrl = 'redis://127.0.0.1:6379';

const client = redis.createClient(redisUrl);
client.on('connect', () => console.log('Connected to Redis!'));
client.on('error', (err) => console.log('Redis Client Error', err));
client.connect();

// adding a custom function to mongoose
mongoose.Query.prototype.cache = function (options = {}) {
  this.useChache = true;
  this.hashKey = JSON.stringify(options.key || '');
  return this; //this allows us this function to behave normally, where we can even chain more methods i.e Model.find().limit() etc etc
};
// now lets us add more functionality to exec function
mongoose.Query.prototype.exec = async function () {
  if (!this.useChache) {
    return exec.apply(this, arguments);
  }

  const key = JSON.stringify(
    Object.assign({}, this.getQuery(), {
      collection: this.mongooseCollection.name,
    })
  );

  //  check if we have some data in redis first
  const cachedValue = await client.hGet(this.hashKey, key);
  // if we have some data,return the data
  if (cachedValue) {
    //const doc1 = new this.model(JSON.parse(cachedValue));
    const doc = JSON.parse(cachedValue);

    return Array.isArray(doc)
      ? doc.map((d) => new this.model(d))
      : new this.model(doc);
  }
  // otherwise issue a query and store the results in redis
  const result = await exec.apply(this, arguments);
  client.hSet(this.hashKey, key, JSON.stringify(result), 'EX', 10);
  return result;
};

module.exports = {
  clearHash(hashKey) {
    client.del(JSON.stringify(hashKey));
  },
};
