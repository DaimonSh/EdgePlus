document.onreadystatechange = function () {
    if (document.readyState == "complete") {
		OnLoad();
    }
}

var button;

function Hover(event)
{
	if (event.type == 'mouseover' && button.classList.contains("hidden")) {
		button.classList.remove("hidden");
		active = true;
	}
	else if(event.type == 'mouseout' && !button.classList.contains("hidden")) {
		button.classList.add("hidden");
		active = false;
	}
}

function OnButtonClick(event)
{
	var video = document.getElementsByTagName("video")[0];
	if (video != document.pictureInPictureElement)
	{
		try {
			video.requestPictureInPicture();
		}
		catch (error) {
			console.warn(error);
		}
	}
	else if(document.pictureInPictureElement != null)
		document.exitPictureInPicture(); 
	event.stopPropagation();
}

console.log("Init");

function OnLoad(){
	if($(".fw-button-container").length > 0)
	{
		document.querySelectorAll('.fw-button-container').forEach(e => e.remove());
	}

	console.log("Loaded");

	if(document.getElementsByTagName("video").length > 0)
	{
		console.log("Video found");
		button = document.createElement("div");
		button.classList.add("fw-button-container");
		button.classList.add("hidden");
		button.innerHTML = `<svg class="fw-svg-icon" viewBox="0 0 20 20">
								<path fill="none" d="M8.416,3.943l1.12-1.12v9.031c0,0.257,0.208,0.464,0.464,0.464c0.256,0,0.464-0.207,0.464-0.464V2.823l1.12,1.12c0.182,0.182,0.476,0.182,0.656,0c0.182-0.181,0.182-0.475,0-0.656l-1.744-1.745c-0.018-0.081-0.048-0.16-0.112-0.224C10.279,1.214,10.137,1.177,10,1.194c-0.137-0.017-0.279,0.02-0.384,0.125C9.551,1.384,9.518,1.465,9.499,1.548L7.76,3.288c-0.182,0.181-0.182,0.475,0,0.656C7.941,4.125,8.234,4.125,8.416,3.943z M15.569,6.286h-2.32v0.928h2.32c0.512,0,0.928,0.416,0.928,0.928v8.817c0,0.513-0.416,0.929-0.928,0.929H4.432c-0.513,0-0.928-0.416-0.928-0.929V8.142c0-0.513,0.416-0.928,0.928-0.928h2.32V6.286h-2.32c-1.025,0-1.856,0.831-1.856,1.856v8.817c0,1.025,0.832,1.856,1.856,1.856h11.138c1.024,0,1.855-0.831,1.855-1.856V8.142C17.425,7.117,16.594,6.286,15.569,6.286z"></path>
							</svg>`;

		var container = document.getElementsByTagName("video")[0].parentNode;
		var maxHeight = container.offsetHeight;

		var maxDepth = 3;
		while(container.parentNode != null && (container.parentNode.offsetHeight == maxHeight || maxHeight < 10) && (maxDepth > 0 || container.parentNode.tagName == "YTMUSIC-PLAYER"))
		{
			container = container.parentNode;
			maxHeight = container.offsetHeight;
			maxDepth--;
		}
		container.onmouseover = container.onmouseout = Hover;
		button.onmouseover = button.onmouseout = Hover;
		container.appendChild(button);
		
		button.onclick = OnButtonClick;
	}
}