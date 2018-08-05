const dropDown = document.getElementById('country');

// ***************************************************************** 
//  This is not a correct implementation, is just for demostrations purpose
//  I'm not very familiar with Pug, and it's very complicated to manipulate the DOM
//  directly. 
// ***************************************************************** 

dropDown.addEventListener('click', function(){    
    const videoDesc = 1;
    const cardImgContainer = 0;
    const secondChildren = 1;
    const views = 0;
    const publishedAt = 1;
    const likes = 2;
    const divImgContainer = 0;

    const updateVideoInfo = (videosInfo) => {
        const cards = document.getElementsByClassName('card')
        for(let i=0; i<=cards.length; i++){
            const video = videosInfo[i];
            const secondChildrenNode = cards[i].childNodes[videoDesc].children[secondChildren];
            cards[i].childNodes[videoDesc].firstChild.innerText = video.title;     
            secondChildrenNode.children[views].innerText = video.viewCount;
            secondChildrenNode.children[publishedAt].innerText = video.publishedAt;
            secondChildrenNode.children[likes].innerText = video.likeCount;
            cards[i].childNodes[cardImgContainer].children[divImgContainer].src = video.thumbnail;
        }
    }    

    const options = {
        method: 'get',
        headers: {
            "Content-type": "application/json"
        }
    }
    const countryCode = dropDown.options[dropDown.selectedIndex].value;
    const url = `http://localhost:3000/youtube/for/${countryCode}`;
    fetch(url, options).then((response) => {
        return response.json();
    }).then(updateVideoInfo);    
})

    
