const url= "https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=tesla&type=video&key=[YOUR_API_KEY]"; 
const resultsdiv =document.getElementById("searchedvideos")

async function searchVideo(){
    try{
    let videoquery=document.getElementById("video").value;
    let response = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${videoquery}&type=video&key=AIzaSyBeVrKNld_L514mfZGkuY_NOCiiNAR6BQY&maxResults=20`);
    let data =await response.json();
   
    var videos=data.items;
    // console.log(videos);
    appendvideos(videos);
    }
    catch(e){
        console.log(e);
    }
}

const appendvideos=(items)=>{
    var trending=document.getElementById("trending");
    trending.innerHTML=null;
    var popular=document.getElementById("popular");
    popular.innerHTML="";
    const resultsdiv =document.getElementById("searchedvideos");
    resultsdiv.innerHTML="";
items.map((el)=>{
// console.log(el);
let {snippet,id:{videoId}}=el; //nested destructuring
// console.log(snippet);
// console.log(videoId);
// let v_Id = el.id.videoId;
//iframe
// let iframe =document.createElement("iframe");
// iframe.src=`https://www.youtube.com/embed/${videoId}`;
// iframe.width=300;
// iframe.height=250;
// iframe.setAttribute("allowfullscreen","true")
const resultsdiv =document.getElementById("searchedvideos")
let title =document.createElement("p");
title.textContent=snippet.title;
let thumbnail=document.createElement("img");
thumbnail.src=snippet.thumbnails.medium.url;
let data_to_send={
   
    snippet,
    videoId
}
// console.log(data_to_send);
var div=document.createElement("div");
div.append(thumbnail,title);

div.onclick=()=>{
    showvideo(data_to_send,items);
};






resultsdiv.append(div);


})
}

function showvideo(data,items){
    console.log(items);

    localStorage.setItem("clicked_video",JSON.stringify(data));
    localStorage.setItem("recommended",JSON.stringify(items));
    window.location.href="video.html";
}

//---------for popular videos------->
searchpopular();
async function searchpopular(){
    let response1=await fetch("https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=IN&key=AIzaSyBeVrKNld_L514mfZGkuY_NOCiiNAR6BQY&maxResults=20");
     let data1= await response1.json();
    //  console.log(data1.items);
     displaypopular(data1.items);

}
function displaypopular(arr){
var popular=document.getElementById("popular");
const resultsdiv =document.getElementById("searchedvideos");
    resultsdiv.innerHTML="";
arr.map((elem)=>{
   let {id}=elem;
// console.log(id);
let iframe =document.createElement("iframe");
iframe.src=`https://www.youtube.com/embed/${id}`;
iframe.width=300;
iframe.height=250;
iframe.setAttribute("allowfullscreen","true")
popular.append(iframe);
})

}


//------Signup Page------->
function signup(){
    window.location.href="checking.html";
}
//----------gotomainpage------>
function mainpage(){
    window.location.href="index.html";
}
var req=JSON.parse(localStorage.getItem("userdata"));
console.log(req);
var user=document.getElementById("singup");
if(req.name!==undefined){
  user.textContent=req.name;  
}