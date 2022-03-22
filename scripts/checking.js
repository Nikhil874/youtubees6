//api link - https://masai-api-mocker.herokuapp.com/
  //registerurl- https://masai-api-mocker.herokuapp.com/auth/register
  //login url- https://masai-api-mocker.herokuapp.com/auth/login

  async function Register(event){
    try{
    event.preventDefault();
    var resgister_data={
        name:document.getElementById("name").value,
        email:document.getElementById("email").value,
        password:document.getElementById("password").value,
        mobile:document.getElementById("mobile").value,
        description:document.getElementById("description").value,
        username:document.getElementById("username").value
    };
    resgister_data=JSON.stringify(resgister_data);
    console.log("registered_data:",resgister_data);
  }
  catch(e){
      console.log(e);
  }
 


let reg_api=`https://masai-api-mocker.herokuapp.com/auth/register`;

let response= await fetch(reg_api,{
  method:"POST",
  body: resgister_data,

  headers:{
      "Content-Type":"application/json",
  },
});

let data= await response.json();
console.log("data:",data);
if(data.error==false){
  window.alert("Registration succesful Please Login to Continue");
}
}


async function login(e){
e.preventDefault();
let login_data={
  username: document.getElementById("username-login").value,
  password: document.getElementById("password-login").value
};

login_data= JSON.stringify(login_data);
let login_url=`https://masai-api-mocker.herokuapp.com/auth/login`;
let response=await fetch(login_url,{

  method:"POST",
  body: login_data,

  headers:{
      "Content-Type":"application/json",
  },
});

let data=await response.json();
console.log("data",data);
let username= document.getElementById("username-login").value;
getUser(username,data.token);


}


async function getUser(username,token){


try{
  let api=`https://masai-api-mocker.herokuapp.com/user/${username}`;

  let response=await fetch(api,{
      headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${token}`
      },
  });

  let data= await response.json();
localStorage.setItem("userdata",JSON.stringify(data));
var req=JSON.parse(localStorage.getItem("userdata"));
  if(data.username!==undefined){
      
      window.location.href="index.html"
  }
}
catch(e){
  console.log(e);
}
}

function mainpage(){
  window.location.href="index.html";
}