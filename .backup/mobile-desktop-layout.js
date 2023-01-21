// LAYOUTING MAIN CONTAINER's CHILD
//Container utama
top_container = document.getElementById('top-container');
player_container = document.getElementById('player-container');
home_container = document.getElementById('home-container');
list_container = document.getElementById('list-container');


//Nav Button
nav_list_btn = document.getElementById('nav-list-btn');
nav_home_btn = document.getElementById('nav-home-btn');
nav_player_btn = document.getElementById('nav-player-btn');

//================= Check Device Currently used =================

function checkDeviceUsed() {
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	 	document.body.style.cssText = 'scroll-behavior: auto;';
	} else {
		//
	}
}
//====================================================================

//================= Handling List for Desktop Mode =================

list_desktop_opener = document.getElementById('list-desktop-opener');
list_desktop_icon_name = document.getElementById('list-desktop-icon-name');
list_desktop_icon = document.getElementById('list-desktop-opener-wrapper').children[0];

list_desktop_opener.addEventListener('click', ListDekstopOpenerHandling)

function ListDekstopOpenerHandling() {
		if(anyNavOpen != 1) {

			openDesktopList();
			navClickHandling(1);

			anyNavOpen = 1;
		} else {

			closeDesktopList();
			navClickHandling(1);

			anyNavOpen = 0;
		}
}
function openDesktopList() {
	list_desktop_opener.style.cssText = 'left: 560px;';
	list_desktop_icon.src = 'icon/close.png';
	list_desktop_icon_name.childNodes[1].innerHTML = 'Close List';
}
function closeDesktopList() {
	list_desktop_opener.style.cssText = 'left: 1%;';
	list_desktop_icon.src = 'icon/headbar.png';
	list_desktop_icon_name.childNodes[1].innerHTML = 'Open List';
}
//================= Nav Btn Layout Func =================
nav_list_btn.addEventListener('click', function() { navClickHandling(1) });
nav_player_btn.addEventListener('click', function() { navClickHandling(2) });
nav_home_btn.addEventListener('click', function() { navClickHandling(3)});

window.addEventListener('resize', checkNavBoxSizing);

anyNavOpen = 0; //0 = not any open, 1 - 2 = any open, 1 == list, 2 == player

function checkNavBoxSizing() {
	if (anyNavOpen === 0) return '';

	checkWindowResize();
	switch(anyNavOpen) {
		case 1:
			navListOpener();
			break;
		case 2:
			navPlayerOpener();
			break;
	}

}

function navClickHandling(evt_click) {
	try{
		if(anyQueOptionOpen != 1) document.getElementsByClassName('que-options-active')[0].children[2].click();
	} catch(err) {
		console.log('ignore this error, its intended!');
	}

	removeActiveNavLine();
	
	if(anyNavOpen === evt_click || evt_click === 3) {
		navHomeOpener();

		return '';
	}
	if(anyNavOpen != 0) {
		closeAllNav();
	}
	switch(evt_click) {
		case 1:
			nav_list_btn.children[1].classList.add('nav-btn-active');//aniamtion of lines below the nav
			navListOpener();
			break;
		case 2:
			nav_player_btn.children[1].classList.add('nav-btn-active');
			navPlayerOpener();
			break;
	}
	backgroundHandlingOnNav();
}

function navListOpener() {
	if(areMobile === 0) {
		if(areHorizontal === 0) {
			list_container.style.cssText = 'width: 100%;';
		} else {
			list_container.style.cssText = 'width: 550px;';
		}
		
	} else {
		list_container.style.cssText = 'width: 550px;';
	}
	anyNavOpen = 1;
}
function navPlayerOpener() {
	if(areMobile === 0) {
		player_container.style.cssText = 'height: 70%;';
	} else {
		//
	}
	anyNavOpen = 2;
}
function navHomeOpener() {
	closeAllNav();
	nav_home_btn.children[1].classList.add('nav-btn-active');
	anyNavOpen = 0;

	backgroundHandlingOnNav();
}

function closeAllNav() {
	switch(anyNavOpen) {
		case 1:
			list_container.style.cssText = 'width: 0%';
			break;
		case 2:
			player_container.style.cssText = 'height: 0%;';
			break;
	}
}

function backgroundHandlingOnNav() {
	dimBackground();
	backgorundDisable();
}

function dimBackground() {
	console.log('dim');
	dimming = document.getElementById('dim-background');
	if(anyNavOpen != 0) {
		dimming.style.cssText = 'display: block;';
	} else {
		dimming.style.cssText = 'display: none;';
	}
}

function backgorundDisable() {
	if(anyNavOpen != 0) {
		home_container.className = 'container-disable';
	} else {
		home_container.className = 'container-enable';
	}
}

function removeActiveNavLine() {
	elem = document.querySelector('.nav-btn-active');
	elem.classList.remove('nav-btn-active');
}
//====================================================================


//================= Check if width window equals to mobile width =================
window.addEventListener('resize', checkWindowResize);
areMobile = 1; //0 = mobile, 1 = not mobile
areHorizontal = 1; //0 = horizontal, 1 = not; 

function checkWindowResize() {
	if(window.innerWidth <= 980) {
		checkMobilRotation();
		areMobile = 0;
		returnMobile();
	} else {
		areMobile = 1;
		returnDesktop();
	}
	if(searching_result_wrapper.clientHeight != 0) {
		resizingSearchingResult();
	}
}
function checkMobilRotation() {
	if(window.innerWidth <= 580) {
		areHorizontal = 0;
	} else {
		areHorizontal = 1;
	}
}
	//returning to mode, ex : removing styling from mobile style
function returnMobile() {
	if(document.querySelectorAll('.nav-btn-active').length > 1) { //chcek if the player openend in mobile mode then resizing to desktop, back to mobile
		nav_player_btn.children[1].classList.remove('nav-btn-active');
	}
	document.getElementById('list-desktop-opener').style.cssText = 'display: none;';
}
function returnDesktop() {
	removeMobileStyling();
	document.getElementById('list-desktop-opener').style.cssText = 'display: visible;';
	if(anyNavOpen === 1) {
		openDesktopList();
	} else {
		closeDesktopList();
	}
	if(anyNavOpen === 2) {
		navHomeOpener();
	}
}

function removeMobileStyling() {
	top_container.style.cssText = '';
	player_container.style.cssText = '';
	home_container.style.cssText = '';
}

list_song_box = document.getElementById('list-song-box');

function resizingSearchingResult() {
	parent_height = list_song_box.clientHeight;

	searching_result_wrapper.style.cssText = 'height: '+(parent_height+4)+'px;';
}
//====================================================================

//================= Fontsizing Handler ================= 

	//Account Name (NOT DONE YET)
account_profile_name = document.getElementById('account-profile-name');
account_name = document.getElementById('account-name');

window.addEventListener('resize', checkNameSizing);

function checkNameSizing() {
	if(account_name.clientWidth < account_profile_name.clientWidth) {
		account_name.innerHTML = `SweetW`; //change into the current name
	} 
	if(account_name.clientWidth === account_profile_name.clientWidth) {
		account_name.innerHTML = account_name.innerHTML.slice(0, 6) + '...';
	}
}

//====================================================================


//================= Re-open top container if scroll =================
home_container.addEventListener('scroll', whenScrollOnMobile);
	//initial scroll before to detect goes up or down
	var initial_scroll = 0;

function whenScrollOnMobile() {
	if(areMobile === 1) return '';

		if(home_container.scrollTop <= 0) {
			console.log('hit the top');
			scrollTopHandler('70px', '70px');
		} else {
			if(initial_scroll > home_container.scrollTop) {
				if(top_container.clientHeight === 0){
					scrollTopHandler('70px', '0px'); 
					console.log('going up');
				}
			} else if (initial_scroll < home_container.scrollTop) {
				if(top_container.clientHeight === 70) {
					scrollTopHandler('0px', '0px');
					console.log('going down');
				}
				
			}
		}
	initial_scroll = home_container.scrollTop;
}
function scrollTopHandler(evt_size, evt_margin) {
	top_container.style.cssText = `
		height: `+evt_size+`;
	`;
	home_container.style.cssText = 'margin-top: '+evt_margin+';';
}
//====================================================================

function whenLoadTest() {
	checkWindowResize();
	checkNameSizing();
	mergeAllData();
}

//test1 PASSED (For closing an re opening the list in the desktop side)
function test1() {
		
}
