var el = document.createElement("span");
el.innerHTML = `<div id="PIPB" style="
background-color: rgba(0,0,0,0.4);
border-radius: 5px;
text-align: center;
position: absolute;
cursor: pointer;
right: 2px;
width: 35px;
height: 35px;
top: -20vh;
">
<img style="
    max-height: 70%;
    max-width: 70%;
    width: auto;
    height: auto;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
	filter: invert(1);
" 
src="https://www.materialui.co/materialIcons/action/picture_in_picture_black_192x192.png"></div>`;

var container = document.getElementsByClassName("ytp-left-controls")[0];
container.parentNode.insertBefore(el, container.nextSibling);
el.onclick = function() { 
var video = document.getElementsByTagName("video")[0];
if (video != document.pictureInPictureElement)
    video.requestPictureInPicture();
else if(document.pictureInPictureElement != null)
    document.exitPictureInPicture(); 
};