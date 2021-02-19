var pageUpdatedTimeout;

function OnLoad(){
	DestroyButtons();

	console.log("Loaded");

	CreateButtons();

	const callback = function(mutationsList, observer) {
		clearTimeout(pageUpdatedTimeout);
		pageUpdatedTimeout = setTimeout(function() { DestroyButtons(); CreateButtons(); console.log("Page updated!"); }, 1000);
	};

	const observer = new MutationObserver(callback);

	observer.observe(document.body, {
		childList: true
	});
}

function OnButtonClick(event, video)
{
	if (video != document.pictureInPictureElement && !video.disablePictureInPicture)
	{
		video.requestPictureInPicture().catch(err => console.log(err));
	}
	else if(document.pictureInPictureElement != null)
		document.exitPictureInPicture(); 

	event.stopPropagation();
}

function CreateButtons(){
	if($("video").length > 0)
	{
		$("video").toArray().forEach(videoElement => {		
			console.log("Video found");
			
			var button = document.createElement("div");
			button.classList.add("fw-button-container","hidden");
			button.innerHTML = `<svg class="fw-svg-icon" viewBox="0 0 20 20">
									<path fill="none" d="M8.416,3.943l1.12-1.12v9.031c0,0.257,0.208,0.464,0.464,0.464c0.256,0,0.464-0.207,0.464-0.464V2.823l1.12,1.12c0.182,0.182,0.476,0.182,0.656,0c0.182-0.181,0.182-0.475,0-0.656l-1.744-1.745c-0.018-0.081-0.048-0.16-0.112-0.224C10.279,1.214,10.137,1.177,10,1.194c-0.137-0.017-0.279,0.02-0.384,0.125C9.551,1.384,9.518,1.465,9.499,1.548L7.76,3.288c-0.182,0.181-0.182,0.475,0,0.656C7.941,4.125,8.234,4.125,8.416,3.943z M15.569,6.286h-2.32v0.928h2.32c0.512,0,0.928,0.416,0.928,0.928v8.817c0,0.513-0.416,0.929-0.928,0.929H4.432c-0.513,0-0.928-0.416-0.928-0.929V8.142c0-0.513,0.416-0.928,0.928-0.928h2.32V6.286h-2.32c-1.025,0-1.856,0.831-1.856,1.856v8.817c0,1.025,0.832,1.856,1.856,1.856h11.138c1.024,0,1.855-0.831,1.855-1.856V8.142C17.425,7.117,16.594,6.286,15.569,6.286z"></path>
								</svg>`;

			var container = videoElement.parentNode;
			var maxHeight = container.offsetHeight;

			var maxDepth = 2;
			if($("YTMUSIC-PLAYER").length > 0)
			{
				console.log("YT MUSIC");
				container = $("YTMUSIC-PLAYER")[0];
			}
			else
			{
				while(container.parentElement != null && container.parentElement != document.body.parentElement && (container.parentNode.offsetHeight == maxHeight || maxHeight < 10) && (maxDepth > 0))
				{
					container = container.parentNode;
					maxHeight = container.offsetHeight;
					maxDepth--;
				}
			}

			if(!container.contains(videoElement))
			{
				setTimeout(function(){DestroyButtons();CreateButtons();},100);
				console.log("Encountered an error!");
				return;
			}

			console.log(videoElement);
			console.log(container);
			container.append(button);

			(button,container).addEventListener("mouseenter", function( event ) {
				if(button.classList.contains("hidden"))
					button.classList.remove("hidden");
			});

			(button,container).addEventListener("mouseleave", function( event ) {
				if(!button.classList.contains("hidden"))
					button.classList.add("hidden");
			});

			if(container != document.body)
				$(container).css("position","relative");

			button.addEventListener("click", function( event ) {
				OnButtonClick(event, videoElement);
			});
		});
	}
}

function DestroyButtons()
{
	if($(".fw-button-container").length > 0)
	{
		$('.fw-button-container').toArray().forEach(e => e.remove());
	}
}

console.log("Init");

document.onreadystatechange = function () {
    if (document.readyState == "complete") {
		OnLoad();
    }
}