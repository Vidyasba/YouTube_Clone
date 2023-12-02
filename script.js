 const apiKey="AIzaSyBY82_N63eKL9FILxTw4b8o8DbZR7TBV_U";


const url="https://www.googleapis.com/youtube/v3/search";
const baseUrl="https://www.googleapis.com/youtube/v3";

const searchButton= document.getElementById("search-button");
const searchInput= document.getElementById("search-input");
const container= document.getElementById("container");


//1.not for use now
// async function fetchVideos(){
//     const searchQuery="modi";         //&q means its a key value pair   //searching modi here as search query  //part keyvalue pair is shown in console on adding part=snippet
//     const response=await fetch(`${url}?key=${apiKey}&q={searchQuery}&part=snippet`);
//     const result=await response.json();
//     console.log(result);
// }
// fetchVideos();
// console.log("somethng");
//end of 1

//
function calculateTheTimeGap(publishTime){
    let publishDate= new Date(publishTime);
    let currentDate= new Date();

    let secondsGap=(currentDate.getTime() - publishDate.getTime())/1000;

    const secondsPerDay= 24*60*60;
    const secondsPerWeek= secondsPerDay;
    const secondsPerMonth= 30*secondsPerDay;
    const secondsPerYear= 365*secondsPerDay ;

    if(secondsGap<secondsPerDay){
        return `${Math.ceil(secondsGap/(60*60))} hrs ago`;
    }
    if(secondsGap< secondsPerWeek){
        return `${Math.ceil(secondsGap/secondsPerWeek)} weeks ago`;
    }
    if(secondsGap<secondsPerMonth){
        return `${Math.ceil(secondsGap/secondsPerMonth)} months ago`;
    }
     return `${Math.ceil(secondsGap/secondsPerYear)} years ago`;
    
}


function renderVideosOntoUI(vidoesList){
    //vidoesList is an array
    vidoesList.forEach((video)=>{
        const videoContainer = document.createElement("div");
        videoContainer.className="video";
        videoContainer.innerHTML=`
        <img src="${video.snippet.thumbnails.high.url}" 
        class="thumbnail" alt="thumbnail">
        <div class="bottom-container">
            <div class="logo-container">
                <img class="logo" 
                src="https://picsum.photos/40/40" 
                alt="channel Logo">
            </div>
            <div class="title-container">
                <p class="title">${video.snippet.title}</p>
                <p class="gray-text">${video.snippet.channelTitle}</p>
                <p class="gray-text">15K Views . ${calculateTheTimeGap(video.snippet.publishTime)}</p>
            </div>
        </div>`;
        container.appendChild(videoContainer);
    });
}


//search bar functionality
async function fetchSearchResults(searchString){
    const endpoint = `${baseUrl}/search?key=${apiKey}&q=${searchString}&part=snippet&maxResults=20`;
    try{
            const response = await fetch(endpoint); 
            const result=await response.json();
            console.log(result);
            renderVideosOntoUI(result.items);
    }catch(error){
        console.log(error)
        alert("some error occured");
    }
    
}
searchButton.addEventListener("click",()=>{
    const searchValue= searchInput.value;
    fetchSearchResults(searchValue);
});
fetchSearchResults();





function toogleSideBar(){
    var sidebar = document.getElementsByClassName('sidebar')[0];
    console.log(sidebar)
    // Toggle a class to show/hide the sidebar
    sidebar.classList.toggle('show-sidebar'); 



    var videoContainer = document.querySelector('.vidoes-container');

    // Toggle classes on video container based on sidebar visibility
    if (sidebar.classList.contains('show-sidebar')) {
        videoContainer.classList.remove('show-sidebar-collapsed');
        videoContainer.classList.add('show-sidebar-expanded');
    } else {
        videoContainer.classList.remove('show-sidebar-expanded');
        videoContainer.classList.add('show-sidebar-collapsed');
    }


   
}