const axios = require('axios')
const {makeFakeUser} = require('./fakes/User')
const {makeFakeCharacter} = require('./fakes/Characters')
const mongoose = require('mongoose');
const User = require('../models/User')
const Character = require('../models/Character')
const config = require('config')
const db = config.get("mongoURI")
const time = 10000

describe('Game user API',()=>{

    beforeAll(()=>{
        axios.defaults.baseURL = "http://localhost:5000/gameapi/v1/"
        axios.defaults.headers.common['Content-Type'] = 'application/json'
        axios.defaults.validateStatus = function (status) {
            // Throw only if the status code is greater than or equal to 500
            return status < 500
          }
    },time)


    afterAll(async ()=>{
        await mongoose.connect(db,{ useNewUrlParser: true,
            useUnifiedTopology: true ,
            useCreateIndex: true })
         await  mongoose.connection.dropCollection('users')
         await  mongoose.connection.dropCollection('characters')
    },time)

    describe('Sign a user',()=>{
        it('Sing Up a user correctly', async()=>{
            const response = await axios.post(
                'signup',
               makeFakeUser({name:"corki",
               email:"corki@mail.com",
               password: "123456"})
              )
              expect(response.status).toBe(200)
              const {name,email,token} = response.data
              expect(name).toBe("corki")
              expect(email).toBe("corki@mail.com")
              expect(token)
        },time)

        it('Sign In a User',async () => {
            const response = await axios.post(
                'signin',
               makeFakeUser({
               email:"corki@mail.com",
               password: "123456"})
              )

              expect(response.status).toBe(200)
              const {token, email} = response.data
              expect(email).toBe("corki@mail.com")
              expect(token)
        },time)
    })


    describe('User management', () => {
        beforeAll(async () => {
            const response = await axios.post(
                'signup',
               makeFakeUser({name:"swain",
               email:"swain@mail.com",
               password: "123456"})
              )
              axios.defaults.headers.common['session-token'] = response.data.token
        })

        it('Get user info',async () => {
            const  response = await axios.get('user')
            const {name,email,date} = response.data
            expect(response.status).toBe(200)
            expect(name).toBe("swain")
            expect(email).toBe("swain@mail.com")
            expect(date)
        },time)

        it('Delet user by email', async () => {
            const  response = await axios.delete('user',{
                data:{
                    email:"swain@mail.com"
                }
            })
            const {msg} = response.data
            expect(response.status).toBe(200)
            expect(msg).toBe("User removed")
        },time)
        


    })

    describe('Characters management',() => {

        beforeAll(async () => {
            const response = await axios.post(
                'signup',
               makeFakeUser({name:"urgot",
               email:"urgot@mail.com",
               password: "123456"})
              )

              axios.defaults.headers.common['session-token'] = response.data.token
             
              await axios.post('character',
              makeFakeCharacter({
                  name: "kanugro",
                  race: "hobbit",
                  classtype: "warlock",
                  sex: "male"
              }))
      
            },time)

        it('Create a new character', async () => {

            const response = await axios.post('character',
            makeFakeCharacter({
                name: "trokitronko",
                race: "elf",
                classtype: "warrior",
                sex: "male"
            }))
            expect(response.status).toBe(200)
            const {name,user,race,classtype,level,sex,status} = response.data
            expect(name).toBe("trokitronko")
            expect(race).toBe("elf")
            expect(user)
            expect(classtype).toBe("warrior")
            expect(level).toBe(1)
            expect(sex).toBe("male")
            expect(status).toBe("innactive")

        },time)

        
        it('Get a characters', async()=>{

            const response= await axios.get('character')
            expect(response.status).toBe(200)
            const characterOne = response.data[0]
            const {name,user,race,classtype,level,sex,status} = characterOne
            expect(name).toBe("kanugro")
            expect(race).toBe("hobbit")
            expect(user)
            expect(classtype).toBe("warlock")
            expect(level).toBe(1)
            expect(sex).toBe("male")
            expect(status).toBe("innactive")
        },time)


        it('Patch the character`s level ', async () => {

            const response = await axios.patch('character',
            makeFakeCharacter({
                name: "kanugro",
            }))
            expect(response.status).toBe(200)
            const {name,user,race,classtype,level,sex,status} = response.data
            expect(name).toBe("kanugro")
            expect(race).toBe("hobbit")
            expect(user)
            expect(classtype).toBe("warlock")
            expect(level).toBe(2)
            expect(sex).toBe("male")
            expect(status).toBe("innactive")

        },time)

        it('Delete a character', async()=>{
            const response = await axios.delete('character',{
                data:{name: "kanugro"}
            })
            expect(response.status).toBe(200)
            const {msg} = response.data
            expect(msg).toBe("Character removed")
        },time)






    })











})