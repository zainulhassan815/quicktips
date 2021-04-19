
const MAX_RECORDS = 100;
const BASE_URL = 'https://api.airtable.com/v0/appm8ElrwmTUVCxbg/videos?api_key=keyzLVoGk5cLg3rMZ&view=Grid+view';
var client = new XMLHttpRequest();
var videos = [];
const VIDEO_CONTAINER = document.querySelector('.video-container');

var currentVideo = '';

const iframe = document.querySelector('.embed-container iframe');
const videoTitle = document.querySelector('.featured-description-container h4');
const videoDescription = document.querySelector('.featured-description-container .description');
const videoDate = document.querySelector('.featured-description-container .date b');

// Video Update Feature
var update = function(video) {
    currentVideo = 'https://www.youtube.com/watch?v=' + video.url;
    iframe.setAttribute('src','https://www.youtube.com/embed/' + video.url);
    videoTitle.innerText = video.title;
    videoDescription.innerText = video.description;
    videoDate.innerText = video.date;
}

// Watch On YouTube button click
var watchOnYoutube = document.querySelector('.watch-on-youtube');

watchOnYoutube.onclick = function() {
    if(currentVideo.length > 0) {
        window.open(currentVideo);
    }
}

function Video(image, title, description, date, url, featured) {
    this.image = image;
    this.title = title;
    this.description = description;
    this.url = url;
    this.date = date;
    this.featured = featured;
}

var fetchRecords = function () {
    client.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            videos = parse(client.responseText);
            videos.forEach(video => {
                createVideosList(video);
            })
        }
    }
    client.open("GET", getUrl(), true);
    client.send();
}

var getUrl = function() {
    let url = new URL(BASE_URL);
    url.searchParams.append('maxRecords',MAX_RECORDS);
    return url.toString();
}

var parse = function(response) {

    let videosArray = [];

    let responseJson = JSON.parse(response);
    let records = responseJson.records;

    records.forEach(object => {
        let fields = object.fields;
        let video = new Video(
            fields.image,
            fields.title,
            fields.description,
            fields.date,
            fields.url,
            fields.featured
        )
        videosArray.push(video);
    });

    return videosArray;
}

var createVideosList = function(video) {
    var videoDiv = document.createElement('div');
    videoDiv.setAttribute('class','video');

    videoDiv.onclick = function() {
        update(video)
    }

    var placeholder = document.createElement('img');
    placeholder.setAttribute('class','placeholder');
    placeholder.setAttribute('src','assets/images/placeholder.jpg');

    var thumbnail = document.createElement('img');
    thumbnail.setAttribute('class','video-thumbnail');
    thumbnail.setAttribute('src',video.image);

    // Update Image when thumbnail is loaded
    thumbnail.onload = function() {
        thumbnail.classList.add('loaded');
        placeholder.style.height = "0";
    }

    // Check if there is an error while loading image
    thumbnail.onerror = function() {
        thumbnail.classList.remove('loaded');
        placeholder.style.height = "auto";
    }

    var title_container = document.createElement('div');
    title_container.setAttribute('class','video-title-container');

    var title = document.createElement('h4');
    title.innerText = video.title;

    var description = document.createElement('p');
    description.setAttribute('class','subtitle');
    description.innerText = video.description;

    var date = document.createElement('p');
    date.setAttribute('class','date');
    date.innerText = video.date;

    title_container.appendChild(title);
    title_container.appendChild(description);
    title_container.appendChild(date);

    videoDiv.appendChild(placeholder);
    videoDiv.appendChild(thumbnail);
    videoDiv.appendChild(title_container);

    VIDEO_CONTAINER.appendChild(videoDiv);

    if(video.featured == 'true') {
        update(video);
    }

}