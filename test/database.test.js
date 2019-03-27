const assert = require('assert');
const mongoose = require('mongoose');
const mongoDB = require('../server/database/index.js');
const chai = require('chai');
const expect = chai.expect;
const testSchema = mongoDB.bookSchema;
const testModel = mongoose.model('Test', testSchema);

describe('seeding script', function() {
  before(function(done) { // from https://medium.com/nongaap/beginners-guide-to-writing-mongodb-mongoose-unit-tests-using-mocha-chai-ab5bdf3d3b1d
    mongoose.connect('mongodb://localhost/testDatabase');
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    console.log('We are connected to test database!');
    mongoDB.seed(testModel, () => {
      done();
    });
  });

  it('should seed the database with 100 records', function(done) {
    testModel.find({}, (err, docs) => {
      expect(docs.length).to.equal(100);
      done();
    })
  });

  it('should seed the database with a correct model', function(done) {
    testModel.findOne({ id: 6 }, (err, doc) => {
      expect(doc._doc).to.have.all.keys(
        {
          id: true,
          __v: true,
          _id: true,
          title: 'String',
          author: 'String',
          description: 'String',
          ratings: {
            five: 'Number',
            four: 'Number',
            three: 'Number',
            two: 'Number',
            one: 'Number'
          },
          reviews: 'Number',
          links: {
            kindle: 'String',
            amazon: 'String',
            stores: {
              audible: 'String',
              barnesAndNoble: 'String',
              walmart: 'String',
              apple: 'String',
              google: 'String',
              abebooks: 'String',
              bookDesository: 'String',
              indigo: 'String',
              alibris: 'String',
              betterWorldBooks: 'String',
              indieBound: 'String'
            },
            worldcat: 'String'
          },
          type: 'String',
          pages: 'Number',
          publishdate: 'Date',
          publisher: 'String',
          metadata: {
            originalTitle: 'String',
            isbn: 'Number',
            isbn13: 'Number',
            asin: 'String',
            language: 'String',
            series: {
              name: 'String',
              url: 'String'
            }
          }
        }
      );
      done();
    })
  });

  after(function(done){
    mongoose.connection.db.dropDatabase(function(){
      mongoose.connection.close(done);
    });
  });
});