var el = document.createElement("span");
el.innerHTML = `<div class="fw-button-container">
<img src="https://www.materialui.co/materialIcons/action/picture_in_picture_black_192x192.png">
</div>`;

var container = document.getElementsByClassName("ytp-left-controls")[0];
container.parentNode.insertBefore(el, container.nextSibling);
el.onclick = function() { 
    var video = document.getElementsByTagName("video")[0];
    if (video != document.pictureInPictureElement)
        video.requestPictureInPicture();
    else if(document.pictureInPictureElement != null)
        document.exitPictureInPicture(); 
};