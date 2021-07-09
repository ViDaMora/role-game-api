/*let users=[
    {
        name:"corki",
        email:"corki@mail.com",
        password: "123456"
    },{
        name:"garen",
        email:"garen@mail.com",
        password: "123456"
    },{
        name:"swain",
        email:"swain@mail.com",
        password: "123456"
    }
]*/

let makeFakeUser =(info)=>{
    const user ={
        name:info.name,
        email:info.email,
        password: info.password
    }
    return user
}

module.exports ={makeFakeUser}