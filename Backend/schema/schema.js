const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql;
const crypto = require("crypto");
var User = require("../models/User");
var Order = require("../models/Order");
var Section = require("../models/Section");
var mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://samruddhi:samruddhi@sample-lgacm.mongodb.net/grubhub?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const sha1 = require("sha1");

const Result = new GraphQLObjectType({
  name: "signupBuyerResult",
  fields: () => ({
    responseMessage: { type: GraphQLString }
  })
});

const OwnerSigninResult = new GraphQLObjectType({
  name: "OwnerSigninResult",
  fields: () => ({
    responseMessage: { type: GraphQLString },
    restaurant_id: { type: GraphQLString },
    restaurant_name: { type: GraphQLString },
    owner_name: { type: GraphQLString },
    cuisine: { type: GraphQLString }
  })
});

const addItemResult = new GraphQLObjectType({
  name: "addItemResult",
  fields: () => ({
    responseMessage: { type: GraphQLString },
    item_name: { type: GraphQLString },
    description: { type: GraphQLString },
    price: { type: GraphQLInt },
    cuisine: { type: GraphQLString },
    section_name: { type: GraphQLString }
  })
});

const addSectionResult = new GraphQLObjectType({
  name: "addSectionResult",
  fields: () => ({
    responseMessage: { type: GraphQLString },
    section_name: { type: GraphQLString }
  })
});

// const UpdateBuyerProfileResult= new GraphQLObjectType({
//     name: 'UpdateBuyerProfileResult',
//     fields: () => ({
//         responseMessage: { type: GraphQLString },
//         name: { type: GraphQLString },
//         email:{ type: GraphQLString }
//     })
// });
const BuyerType = new GraphQLObjectType({
  name: "Buyer",
  fields: () => ({
    name: GraphQLString,
    email: GraphQLString,
    password: GraphQLString
  })
});

const OwnerType = new GraphQLObjectType({
  name: "Owner",
  fields: () => ({
    id: GraphQLID,
    owner_name: GraphQLString,
    owner_email: GraphQLString,
    owner_password: GraphQLString,
    restaurant_name: GraphQLString,
    cuisine: GraphQLString
  })
});

const FacultyCourseType = new GraphQLObjectType({
  name: "FacultyCourseType",
  fields: () => ({
    _id: { type: GraphQLString },
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    dept: { type: GraphQLString },
    description: { type: GraphQLString },
    room: { type: GraphQLString },
    capacity: { type: GraphQLInt },
    courseTerm: { type: GraphQLString },
    waitlistCapacity: { type: GraphQLInt },
    currentEnrolledStudents: { type: GraphQLInt }
  })
});

const FacultyCourseList = new GraphQLObjectType({
  name: "FacultyCourseList",
  fields: () => ({
    courses: { type: new GraphQLList(FacultyCourseType) }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    facultycourses: {
      type: FacultyCourseList,
      args: {
        faculty_id: {
          type: GraphQLString
        }
      },
      async resolve(parent, args) {
        console.log("in get faculty courses data args: ", args);
        var courseDetails = [];

        await CoursesModel.find({ faculty_id: args.faculty_id }, function(
          err,
          results
        ) {
          if (err) {
            console.log("Error while querying user info:", err);
          } else {
            if (results) {
              console.log("results:", results);
              courseDetails = results.concat();
            }
          }
        });
        var courseList = {
          courses: courseDetails
        };
        return courseList;
      }
    }
    /* buyer:{
            type:BuyerType,
            args:{
                name:{type:GraphQLString},
                email:{type:GraphQLString},
                password:{type:GraphQLString}
            },
            resolve(parent,args){

                User.findOne({
                    email: args.email       
                }).then(function(data,err){
                    
                    if(data){
                    console.log("Buyer Data is ",data);
                    }
                }
                )

            }
        }
        ,*/
    // owner:{
    //     type:OwnerType,
    //     args:{
    //         name:{type:GraphQLString},
    //         email:{type:GraphQLString},
    //         password:{type:GraphQLString}
    //     },
    //     resolve(parent,args){

    //         User.findOne({
    //             email: args.email
    //         }).then(function(data,err){

    //             if(data){
    //             console.log("Owner Data is ",data);
    //             }
    //         }
    //         )

    //     }

    // }

    //     author:{

    //         type:AuthorType,
    //         args:{id:{type:GraphQLID}},
    //         resolve(parent,args){
    //             return _.find(authors,{id:args.id});
    //         }
    //     },

    //     books:{
    //         type:new GraphQLList(BookType),
    //     resolve(parent,args){
    //         return books;
    //     }
    // },
    //     authors:{
    //         type:new GraphQLList(AuthorType),
    //         resolve(parent,args){
    //             return authors;
    //         }
    //     }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    signupBuyer: {
      type: Result,
      args: {
        name: {
          type: GraphQLString
        },
        email: {
          type: GraphQLString
        },
        password: {
          type: GraphQLString
        }
      },

      resolve: (parent, args) => {
        return new Promise(async (resolve, reject) => {
          console.log("Inside Signup Mutation");
          console.log("Printing args");
          console.log(args);
          await User.findOne(
            {
              email: args.email
            },
            (err, user) => {
              if (err) {
                console.log("Error while querying user info:", err);
              } else {
                if (user) {
                  console.log("User Exists!", user);
                  var resultData = {
                    responseMessage: "User Already exists!"
                  };
                  resolve(resultData);
                } else {
                  console.log("ARGSSS:", args);
                  var newuser = new User({
                    email: args.email,
                    hashpwd: sha1(args.password),
                    name: args.name
                  });
                  console.log("user saving..");
                  newuser.save().then(doc => {
                    console.log("user saved successfully.", doc);
                    console.log("EOF");
                    var resultData = {
                      responseMessage: "Successfully Added!"
                    };
                    resolve(newuser);
                  });
                }
              }
            }
          );
        });
      }
    },

    updateBuyerProfile: {
      UpdateBuyerProfile: {
        type: UpdateBuyerProfileResult,
        args: {
          name: { type: GraphQLString },
          email: { type: GraphQLString }
        },
        resolve(parent, args) {
          console.log("args value", args);
          var user = User.findOneAndUpdate(
            {
              email: args.email
            },
            {
              $set: {
                name: args.name,
                email: args.email
              }
            },
            { upsert: true }
          );
          console.log("Profile Updated Successfully");
          return user;
        }
      }
    },

    updateOwnerProfile: {
      updateOwnerProfile: {
        type: updateOwnerProfileResult,
        args: {
          name: { type: GraphQLString },
          email: { type: GraphQLString },
          restaurant_name: { type: GraphQLString },
          cuisine: { type: GraphQLString }
        },
        resolve(parent, args) {
          console.log("args value", args);
          var user = User.findOneAndUpdate(
            {
              email: args.email
            },
            {
              $set: {
                name: args.name,
                email: args.email,
                restaurant_name: { type: GraphQLString },
                cuisine: { type: GraphQLString }
              }
            },
            { upsert: true }
          );
          console.log("Profile Updated Successfully");
          return user;
        }
      }
    },
    signinBuyer: {
      type: Result,
      args: {
        name: {
          type: GraphQLString
        },
        email: {
          type: GraphQLString
        },
        password: {
          type: GraphQLString
        }
      },

      resolve: (parent, args) => {
        return new Promise(async (resolve, reject) => {
          console.log("Inside Signin Mutation");
          console.log("Printing args");
          console.log(args);
          await User.findOne(
            {
              email: args.email
            },
            (err, user) => {
              if (err) {
                console.log("Error while querying user info:", err);
              } else {
                if (user.hashpwd === sha1(args.password)) {
                  console.log("hashpwd matched!", user);

                  resolve(user);
                }
              }
            }
          );
        });
      }
    },
    signupOwner: {
      type: Result,
      args: {
        name: {
          type: GraphQLString
        },
        email: {
          type: GraphQLString
        },
        password: {
          type: GraphQLString
        },
        restaurant_name: {
          type: GraphQLString
        },
        cuisine: {
          type: GraphQLString
        }
      },

      resolve: (parent, args) => {
        return new Promise(async (resolve, reject) => {
          console.log("Inside Signup Owner Mutation");
          console.log("Printing args");
          console.log(args);
          await User.findOne(
            {
              email: args.email
            },
            (err, user) => {
              if (err) {
                console.log("Error:", err);
              } else {
                if (user) {
                  console.log("Owner Exists!", user);
                  var resultData = {
                    responseMessage: "Owner Already exists!"
                  };
                  resolve(resultData);
                } else {
                  console.log("ARGSSS:", args);
                  var newuser = new User({
                    email: args.email,
                    hashpwd: sha1(args.password),
                    name: args.name,
                    restaurant_name: args.restaurant_name,
                    cuisine: args.cuisine
                  });
                  console.log("user saving..");
                  newuser.save().then(doc => {
                    console.log("user saved successfully.", doc);
                    console.log("EOF");
                    var resultData = {
                      responseMessage: "Successfully Added!"
                    };
                    resolve(resultData);
                  });
                }
              }
            }
          );
        });
      }
    },
    signinOwner: {
      type: OwnerSigninResult,
      args: {
        name: {
          type: GraphQLString
        },
        email: {
          type: GraphQLString
        },
        password: {
          type: GraphQLString
        }
      },

      resolve: (parent, args) => {
        return new Promise(async (resolve, reject) => {
          console.log("Inside Signin Mutation");
          console.log("Printing args");
          console.log(args);
          await User.findOne(
            {
              email: args.email
            },
            (err, user) => {
              if (err) {
                console.log("Error while querying user info:", err);
              } else {
                console.log("User:", user);
                if (user.hashpwd === sha1(args.password)) {
                  console.log("hashpwd matched!", user);
                  resolve(user);
                }
              }
            }
          );
        });
      }
    },

    addItem: {
      type: addItemResult,
      args: {
        item_name: {
          type: GraphQLString
        },
        description: {
          type: GraphQLString
        },
        price: {
          type: GraphQLString
        },
        restaurant_id: {
          type: GraphQLString
        },
        cuisine: {
          type: GraphQLString
        },
        section_name: {
          type: GraphQLString
        }
      },

      resolve: (parent, args) => {
        return new Promise(async (resolve, reject) => {
          console.log("Inside Add Item Mutation");
          console.log("Printing args");
          console.log("ARGSSS:", args);
          var newItem = new Order({
            placed_order: false,
            item_name: args.item_name,
            description: args.description,
            price: args.price,
            restaurant_id: args.restaurant_id,
            section_name: args.section_name,
            cuisine: args.cuisine
          });
          console.log("Adding Item..");
          newItem.save().then(doc => {
            console.log("Item saved successfully.", doc);
            console.log("EOF");
            var resultData = {
              responseMessage: "Successfully Added!"
            };
            resolve(resultData);
          });
        });
      }
    },
    addSection: {
      type: addSectionResult,
      args: {
        section_name: {
          type: GraphQLString
        }
      },

      resolve: (parent, args) => {
        return new Promise(async (resolve, reject) => {
          console.log("Inside Add Section Mutation");
          console.log("Printing args");
          console.log("ARGSSS:", args);
          var newSection = new Section({
            section_name: args.section_name,
            restaurant_id: args.restaurant_id
          });
          console.log("Adding Section..");
          newSection.save().then(doc => {
            console.log("Item saved successfully.", doc);

            var resultData = {
              responseMessage: "Successfully Added!"
            };
            resolve(newSection);
          });
        });
      }
    }
  })
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
