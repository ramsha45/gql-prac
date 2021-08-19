const graphql = require('graphql');
const User = require('../model/user');
const Task = require('../model/task');

const { 
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLID,
  GraphQLList
} = graphql;

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    tasks: {
      type: new GraphQLList(TaskType),
      resolve(parent, args){
        return Task.find({userId: parent.id})
      }
    }
  })
})

const TaskType = new GraphQLObjectType({
  name: 'Task',
  fields: () => ({
    id: { type: GraphQLID },
    task: {type: GraphQLString},
    status: {type: GraphQLString},
    user: {
      type: UserType,
      resolve(parent,args){
        return User.findById(parent.userId)
      }
    }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields:{
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args){
        return User.find();
      }
    },
    
    user: {
      type: UserType,
      args: { id: { type: GraphQLID }},
      resolve(parent, args){
        return User.findById(args.id)
      }
    }
  }
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        name: { type: GraphQLString }
      },
      resolve(parent, args){
        let user =  new User({
          name: args.name
        });
        return user.save()
      }
    },

    addTask: {
      type: TaskType,
      args: {
        task: { type: GraphQLString },
        status: { type: GraphQLString },
        userId: { type: GraphQLID}
      },
      resolve(parent, args){
        let task =  new Task({
          task: args.task,
          status: args.status,
          userId: args.userId
        });
        return task.save()
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})