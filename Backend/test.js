var assert = require("assert");
var supertest = require("supertest");
var should = require("should");
var server = supertest.agent("http://localhost:3001");

//Test case- 0 - register
//Get Request all trips
it("Signin For Owner", function(done) {
    server
      .post("/ownersignin")
      .send({"name": "Lisa", "password": "lisa"})
      
      .expect(200)
      .end(function(err, res) {
        console.log("Status: ", res.status);
        res.status.should.equal(200);
        done();
      });
  });


  it("Signin For Buyer", function(done) {
    server
      .post("/buyersignin")
      .send({"name": "samruddhi", "password": "samruddhi"})
      
      .expect(200)
      .end(function(err, res) {
        console.log("Status: ", res.status);
        res.status.should.equal(200);
        done();
      });
  });

  it("Search request from buyer home page", function(done) {
    server
      .post("/search")
      .send({"searchedItem": "pizza"})
      
      .expect(200)
      .end(function(err, res) {
        console.log("Status: ", res.status);
        res.status.should.equal(200);
        done();
      });
  });

  it("Request to restaurant Page", function(done) {
    server
      .post("/restaurant")
      .send({"id  ": "1"})
      
      .expect(200)
      .end(function(err, res) {
        console.log("Status: ", res.status);
        res.status.should.equal(200);
        done();
      });
  });


  it("Request to the orders on the owner side", function(done) {
    server
      .post("/ownerorder")
      .send({"buyer_id  ": "1","restuarant_id":"1"})
      
      .expect(200)
      .end(function(err, res) {
        console.log("Status: ", res.status);
        res.status.should.equal(200);
        done();
      });
  });