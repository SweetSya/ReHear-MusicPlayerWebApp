anyListOpen = ''; //For checking any sub list open
var list_song_active = []; //Arry to hold the list song selected to play

//================= SUB LIST ALPHABETIC HADNLER ================= 

function openSubList(id) { //adding music list when alohabetic clicked
	if(anyListOpen === id.charAt(id.length-1)) { //check if the openend are the one clicked
		closeAnyList(anyListOpen);
		anyListOpen = '';
		return '';
	}
		if(anyListOpen != '') { //check if there is openend list (eg to close the one opened and open the new one)
			closeAnyList(anyListOpen);
		}
	top_parent = document.getElementById(id);
	second_parent = document.getElementById(id+'-content');
	size = document.getElementsByClassName('list-song-wrapper').length; //check the current size of the opened list, used if i want to do load 5 each time

		if(second_parent.clientHeight !=0) return '';

	song = getDataOfSong(id.charAt(id.length-1).toUpperCase()); //get the song data based on alpabetic click
	
		if(song.length === 0) { //if the data are 0. show this
			div = document.createElement('div');
			div.style.cssText = 'height: 100%; width: 100%; overflow: hidden;';
			div.innerHTML = '<img src="icon/404_anime.jpg" style="height: 100%; width: 100%;">'
			div.id = 'list-song-not-found';
			second_parent.appendChild(div);
		}

	for(var x = size; x < song.length; x++) {
		div = document.createElement('div');
		div.innerHTML = `
							<div class="list-song-name" onclick="addSongToList(this.parentNode.id)">
								`+song[x].name+`
							</div>
							<div class="list-song-desc" onclick="addSongToList(this.parentNode.id)"> 
								`+song[x].desc+`
							</div>
							<div class="list-song-img" onclick="addSongToList(this.parentNode.id)">
								<img class="song-img-style" src="`+song[x].img+`">
							</div>
		`;
		div.id = 'list-song-'+song[x].id;
		div.style.cssText = 'background: url('+song[x].img_bg+') 0% 0% / cover rgba(0, 0, 0, 0.7);';

			if(list_song_active.includes(song[x].id)) { //statemnt if songs are selected(look code below), do the class selected, else other
				div.className = 'list-song-wrapper song-img-bg-style song-selected';
			} else {
				div.className = 'list-song-wrapper song-img-bg-style';
			}

		second_parent.appendChild(div);
	}

	top_parent.classList.add('top-alphabetic-active');
	second_parent.classList.add('second-alphabetic-active');
	anyListOpen = id.charAt(id.length-1);

	setTimeout(function(){
		document.getElementById(id).scrollIntoView({behavior: "smooth"});
	},150);
}
function closeAnyList(id) {
	elem = document.getElementById('alphabetic-'+id+'-content');
	elem2 = document.getElementById('alphabetic-'+id);
	elem.innerHTML = '';
	elem.classList.remove('second-alphabetic-active');
	elem2.classList.remove('top-alphabetic-active');
}

function getDataOfSong(letter) {
	switch(letter) {
		case 'A':
		case '1':
		return songDataA;
			break;
		case 'B':
		case '2':
		return songDataB;
			break;
		case 'C':
		case '3':
		return songDataC;
			break;
		case 'D':
		case '4':
		return songDataD;
			break;
		case 'E':
		case '5':
		return songDataE;
			break;
		case 'F':
		case '6':
		return songDataF;
			break;
		case 'G':
		case '7':
		return songDataG;
			break;
		case 'H':
		case '8':
		return songDataH;
			break;
		case 'I':
		case '9':
		return songDataI;
			break;
		case 'J':
		case '10':
		return songDataJ;
			break;
		case 'K':
		case '11':
		return songDataK;
			break;
		case 'L':
		case '12':
		return songDataL;
			break;
		case 'M':
		case '13':
		return songDataM;
			break;
		case 'N':
		case '14':
		return songDataN;
			break;
		case 'O':
		case '15':
		return songDataO;
			break;
		case 'P':
		case '16':
		return songDataP;
			break;
		case 'Q':
		case '17':
		return songDataQ;
			break;
		case 'R':
		case '18':
		return songDataR;
			break;
		case 'S':
		case '19':
		return songDataS;
			break;
		case 'T':
		case '20':
		return songDataT;
			break;
		case 'U':
		case '21':
		return songDataU;
			break;
		case 'V':
		case '22':
		return songDataV;
			break;
		case 'W':
		case '23':
		return songDataW;
			break;
		case 'X':
		case '24':
		return songDataX;
			break;
		case 'Y':
		case '25':
		return songDataY;
			break;
		case 'Z':
		case '26':
		return songDataZ;
			break;	
		
	}
}

//================= SONG LIST HANDLING =================

function cutAndGetSongId(text) { //cut dan mendapatkan ID lagu dari sekumpulan huruf
	ret = '';
	for(var x = text.length-1; x >= 0; x--) {
		if(isNumber(text.charAt(x))){
			ret = text.charAt(x)+ret;
		} else {
			ret = text.charAt(x)+ret;
			x = -1
		}
	}
	return ret;
}
function isNumber(n) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); } //idk, im not good at regex but this is regex


function addSongToList(id) { //id === container id of songs clicked --- Remember, masukin datnatanya bisa tanpa identifier song only, bisa full id

		song = cutAndGetSongId(id); //exchange the id into songs id	
		doc = document.getElementById('list-song-'+song);

		if(list_song_active.includes(song)) { //remove and add class to respond for click
			
			try {
				if(doc.classList.contains('song-selected')) doc.classList.remove('song-selected');
			} catch(err) {
				console.log('no classlist === song-selected rn! ignore');
			}

			if(song === list_song_active[current_list_index]) { //jika song yang sedang jalan = yang unselected, maka berhentikan music
				stopMusic();

					if(list_song_active.length-1 === 0) { //jika panjang song dikurangi 1 hasilnya 0 + alasan if diatas, maka hentikan song 
						deleteSong(song);
						current_list_index = -1;
						return '';
					};

				playSong(list_song_active, current_list_index);
				animateQueBoxImg(2);
				if(current_list_index-1 === -1) {
					current_list_index = 0;
				} else {
					current_list_index = current_list_index-1;
				}
			} else { //jika bukan song yang sedang jalan unselected
				deleted_index = findSonginArr(list_song_active, song);

					if(deleted_index < current_list_index) {
						current_list_index = current_list_index-1;
					}
			}
			if(que_change_elem != '') { //check jika song pos tidak ditutup, maka tutup que pos menu
				queChangePos(que_change_elem);
			}
			deleteSong(song);

		} else {
			try {
				doc.classList.add('song-selected');
			} catch(err) {
				console.log(err)//intentional err
			}
			list_song_active.push(song);
			
			if(list_song_active.length-1 === 0) {//play when its first song
				playSong(list_song_active, current_list_index);
				animateQueBoxImg(0);
			}
			addQue(song);
		}
}
function deleteSong(id) {
	pos = findSonginArr(list_song_active, id);
	list_song_active.splice(pos, 1);
	deleteQue(id);
}
function findSonginArr(arr, id) {
	for(var x = 0; x < arr.length; x++) {
		if(arr[x] === id) return x;
	}
	return 'not-found';
}
function searchDataSongById(data, id) {
	for(var x = 0; x < data.length; x++) {
		if(data[x].id === id) return data[x];
	}
}

//======================== QUE LIST ============================
function deleteQue(id) {
	document.getElementById('que-box-'+id).remove();
}
function addQue(id) {
	data = searchDataSongById(getDataOfSong(id.charAt(0)), id);

	parent = document.getElementById('list-playing-box-wrapper');
	fake_name = data.name;
	if(data.name.length > 11) {
		fake_name = data.name.slice(0, 8)+'...';
	}

	div = document.createElement('div');
	div.innerHTML = `
					<div class="que-pic-wrapper" onclick="optionVisibility(this.parentNode.id)">
						<img class="que-pic" src="`+data.img+`">
						<div class="que-pic-name">
							`+fake_name+`
						</div>
					</div>
					<div class="que-options">
						<div id="que-delete" onclick="addSongToList('list-song-`+data.id+`')">
							<img class="img-h50" src="icon/trash_white.png">
							Delete
						</div>
						<div id="que-change-pos" onclick="queChangePos(this.parentNode.parentNode.id)">
							<img class="img-h50" src="icon/change_white.png">
							Switch Pos
						</div>
						<div id="que-options-close" onclick="optionVisibility(this.parentNode.parentNode.id)">
							Close
						</div>
					</div>
					<div class="que-choose-pos" onclick="quePickPos(this.parentNode.id)">
						Switch<br>Here!
					<div>
	`;
	div.id = 'que-box-'+id;
	div.className = 'que-box';
	parent.appendChild(div);
	if(indicate_change === 0) { //check jika pos menu sedang terbuka dan ada insert que baru, maka jalankan
		queChangePos(que_change_elem);
	}
}

function closeAllQueChoosePos() {
	elem = document.getElementById()	
}

indicate_change = 1;
que_change_elem = '';

function queChangePos(id) { //
	song = id.slice(8);
	pos = findSonginArr(list_song_active, song); //position of song clicked in the array of list_song_active!
	indicate = -1;
	target_elem = document.getElementsByClassName('que-box');

	elem = target_elem[pos].children[1].children[1];

	if(elem.classList.contains('que-change-pos-active')) { //jika pos menu terbuka, maka tutup
		elem.classList.remove('que-change-pos-active');
		indicate = 1;
		que_change_elem = ''; //assign elemen (id) kedalam var globe
	} else { //kebalikan dari yang atas
		elem.classList.add('que-change-pos-active');
		indicate = 0;
		que_change_elem = id;
	}
	indicate_change = indicate;

	queChooseActivator(indicate ,pos, target_elem);
}

function queChooseActivator(indicate, pos ,target_elem) {
	
	if(indicate === 0) {
		for(var x = 0; x <= target_elem.length-1; x++) {
			if(x != pos) target_elem[x].children[2].classList.add('que-choose-active');
		}
	} else {
		for(var x = 0; x <= target_elem.length-1; x++) {
			if(x != pos) target_elem[x].children[2].classList.remove('que-choose-active');
		}
	}
}

function quePickPos(id) { //id = id elem tujuan
	song = que_change_elem.slice(8); //this is the one needed to moved
	song2 = id.slice(8); //this is the target
		
		pos = findSonginArr(list_song_active, song); //index moved one
		pos2 = findSonginArr(list_song_active, song2); //index target

	switchQue(pos, pos2, song, song2)
}

function switchQue(pos,pos2,song,song2) {
	parent = document.getElementById('list-playing-box-wrapper');
	parent.innerHTML = '';

	fake_list = [];
	for(var x = 0; x <= list_song_active.length-1; x++) {
		if(x === pos) {
			fake_list.push(song2);
		}else if(x === pos2) {
			fake_list.push(song);
		} else {
			fake_list.push(list_song_active[x]);
		}
	}
	list_song_active = fake_list;
	indicate_change = 1;
	que_change_elem = '';

	for(var x = 0; x < list_song_active.length; x++) {
		addQue(list_song_active[x]);	
	}
	if(pos === current_list_index || pos2 === current_list_index) {
		playSong(list_song_active, current_list_index-1);
		animateQueBoxImg(1);// == 1 from here
	} else {
		animateQueBoxImg(1);// == 1 from here
	}
}

anyQueOptionOpen = 1; //1 === no, 0 === yes;

function optionVisibility(id) {
	if(que_change_elem != '') { //check jika seang tidak ditutup, maka tutup que pos menu
		queChangePos(que_change_elem);
	}

	elem = document.getElementById(id);
	child_target = elem.childNodes[3]; 
	if(child_target.clientHeight < 1) {
		if(anyQueOptionOpen === 0) closeAllVisibleOption();
		child_target.classList.add('que-options-active');
		anyQueOptionOpen = 0;
	} else {
		child_target.classList.remove('que-options-active');
		anyQueOptionOpen = 1;
	}
}
function closeAllVisibleOption() {
	elem = document.getElementsByClassName('que-options-active');
	for(var x = 0; x < elem.length; x++) {
		elem[x].classList.remove('que-options-active');
	}
}
//====================================================================


//================= PLAYER SONG =================
player = document.getElementById('player');
volume_setter = document.getElementById('player-volume-control');

volume_setter.addEventListener('input', setuserPrefferedVolume);

function setuserPrefferedVolume() {
	player.volume = (volume_setter.value/100);
}
player.volume = .15;
volume_setter.value = (player.volume*100);
	player.addEventListener('ended', function() {
		playSong(list_song_active, current_list_index);
		animateQueBoxImg(2);
	});

var current_list_index = -1; //the index curretly song played

function playSong(arr, current) {

	current = current+1;
		if(current > arr.length-1) {
			current = 0;
		}
		if(current < 0) {
			current = arr.length-1;
		}

	src_song = searchSource(arr[current]);
	player.src = src_song;
	player.load();
	if(isPlayerPasued) {
		player.pause();
	} else {
		player.play();
	}

	current_list_index = current;
}

function animateQueBoxImg(evt) {
	if(evt === 0 ){
		setTimeout(function() {
			document.getElementById('list-playing-box-wrapper').children[0].children[0].children[0].classList.add('que-pic-active');
		},30);
		return '';
	}
	if(evt === 1) {
		setTimeout(function() {
			document.getElementById('list-playing-box-wrapper').children[current_list_index].children[0].children[0].classList.add('que-pic-active');
		},30);
		return '';
	}
	if(evt === 2) {
		if(list_song_active.length > 1){
			document.querySelector('.que-pic-active').classList.remove('que-pic-active');
			setTimeout(function() {
				document.getElementById('list-playing-box-wrapper').children[current_list_index].children[0].children[0].classList.add('que-pic-active');
			},30);
		} else {
			//
		}
	}
	
}

function searchSource(id) { //searching source based of ID
	list_song = getDataOfSong(id.charAt(0)); //change id to get the dataSongAlphabet

	for(var x = 0; x < list_song.length; x++) {
		if(list_song[x].id === id ) return list_song[x].src;
	}
}
function stopMusic() {
	player.pause();
	player.src = '';
}
//====================================================================

//=================================== CURRENT SONG PLAYER INFO ===========================================
isPlayerPasued = true;//player pause = true, unpause = false;

player_progress = document.getElementById('player-progress');
//Buttons for player
player_repeat = document.getElementById('player-repeat');
player_back = document.getElementById('player-back');
player_pause = document.getElementById('player-pause');
player_next = document.getElementById('player-next');
player_link = document.getElementById('player-link');

player_repeat.addEventListener('click', function() {
	if(checkavailabilityList()) {
		current_list_index = current_list_index-1;
		playSong(list_song_active, current_list_index);
	};
	
});
player_back.addEventListener('click', function() {
	if(checkavailabilityList()) {
		current_list_index = current_list_index-2;
		playSong(list_song_active, current_list_index);
		animateQueBoxImg(2);
	};
});
player_pause.addEventListener('click', function() {
		if(isPlayerPasued) {
			if(checkavailabilityList()) player.play();

			player_pause.src = 'player-icon/pause_song_white.png';
			isPlayerPasued = false;
		} else {
			if(checkavailabilityList()) player.pause();
			player_pause.src = 'player-icon/play_song_white.png';
			isPlayerPasued = true;
		}
});
player_next.addEventListener('click', function() {
	if(checkavailabilityList()) {
		playSong(list_song_active, current_list_index);
		animateQueBoxImg(2);
	};
});
player_link.addEventListener('click', function() {
	if(checkavailabilityList()) {
		//
	};
});

function checkavailabilityList() {
	if(list_song_active.length === 0) {
		return false;
	} else {
		return true;
	}
}

player.addEventListener('canplaythrough', function() {
	setPlayerInformation(list_song_active[current_list_index]); //set gambar, nama dan lain2, passing ID LAGU
	setPlayerProgress();
});
player.addEventListener('error', function() {
		refreshPlayerInformation();
	});
player.addEventListener('timeupdate', function() {
	setPlayerProgress();
});
player_progress.addEventListener('input', setUserProgress);

function setPlayerInformation(id) {
	data = searchDataSongById(getDataOfSong(id.charAt(0)), id);

	document.getElementById('player-pic').src = data.img;
	document.getElementById('player-container-wrapper').style.cssText = 'background: url('+data.img+') no-repeat center rgba(0, 0, 0, .7); background-size: cover;';
	document.getElementById('player-current-name').innerHTML = data.name;
	document.getElementById('player-current-desc').innerHTML = data.desc;
}

function setPlayerProgress() { //set progressnya if song still played or to be played
	player_progress.value = player.currentTime;
		if(player_progress.max === player.duration) return '';//return if max already set soo doenst need to do it again
	player_progress.max = player.duration;
}
function setUserProgress() {
	player.currentTime = player_progress.value;
}
function refreshPlayerInformation() {
	document.getElementById('player-pic').src = 'audio-img/404_anime.jpg';
	document.getElementById('player-container-wrapper').style.cssText = 'background: url() no-repeat center rgba(0, 0, 0, .7);';
	document.getElementById('player-current-name').innerHTML = '';
	document.getElementById('player-current-desc').innerHTML = '';
}
//====================================================================

//=================================== SEARCHING ===========================================

searching_box = document.getElementById('searching-block');
searching_result_wrapper = document.getElementById('searching-result-wrapper');
search_icon = document.getElementById('search-icon');

searching_box.addEventListener('keyup', checkSearchingKey);
searching_text = '';

function checkSearchingKey(event) {
	addResultSet(searching_box.value);
}

function addResultSet(text_searched) {
	if(anyListOpen != '') { //check if the openend are the one clicked
		closeAnyList(anyListOpen);
		anyListOpen = '';
	}

	clearResultSet();

	try {

		if(text_searched === '') throw 'err'; //throw kebawah langsung kalau nothing searched
		
		song = mergingDatas; //getting the date based from the first letter of text searched
		
		if(searching_result_wrapper.clientHeight === 0) { //check if the result box dipslay are absloter or still none
			
			resizingSearchingResult();
			
			search_icon.src = 'icon/close.png';
			search_icon.onclick = function() {searching_box.value = ''; addResultSet(searching_box.value);};

		}
		if(song.length === 0) {//if no song found in the data alphabetic, reutrn the not found
			noSearchFound();
			return '';
		}
		wrap_parent = searching_result_wrapper;

		for(var x = 0; x < song.length; x++) {
			if(song[x].name.toLowerCase().includes(text_searched.toLowerCase())) {
				div = document.createElement('div');
				div.innerHTML = `
									<div class="list-song-name" onclick="addSongToList(this.parentNode.id)">
										`+song[x].name+`
									</div>
									<div class="list-song-desc" onclick="addSongToList(this.parentNode.id)"> 
										`+song[x].desc+`
									</div>
									<div class="list-song-img" onclick="addSongToList(this.parentNode.id)">
										<img class="song-img-style" src="`+song[x].img+`">
									</div>
				`;
				div.id = 'list-song-'+song[x].id;
				div.style.cssText = 'background: url('+song[x].img_bg+') 0% 0% / cover rgba(0, 0, 0, 0.7);';

					if(list_song_active.includes(song[x].id)) { //statemnt if songs are selected(look code below), do the class selected, else other
						div.className = 'list-song-wrapper song-img-bg-style song-selected';
					} else {
						div.className = 'list-song-wrapper song-img-bg-style';
					}

				wrap_parent.appendChild(div);
			} else {
			}
		}
		if(wrap_parent.childElementCount === 1) { //jika countnya true, maka tampilkkan pencarion kosong
			noSearchFound();
		}
	} catch(err) {
		exitSearching();
	}

}

function clearResultSet() {
	searching_result_wrapper.innerHTML = '<h2 style="white-space: nowrap;">Result : </h2>';
}

function noSearchFound() {
	div = document.createElement('div');
	div.style.cssText = 'height: 100%; width: 100%; overflow: hidden;';
	div.innerHTML = '<img src="icon/404_anime.jpg" style="height: auto; width: 100%;">'
	div.id = 'list-song-not-found';
	searching_result_wrapper.appendChild(div);
}

function exitSearching() {
	searching_result_wrapper.style.cssText = 'height: 0%;';
	search_icon.src = 'icon/search_white.png';
	search_icon.onclick = '';
}

mergingDatas = [];

function mergeAllData() {
	for(x = 1; x <= 26; x++) {
		data = getDataOfSong(x.toString());
		for(y = 0; y < data.length; y++) {
			mergingDatas.push(data[y]);
		}
	}
}




//====================================================================


//=================================== RECOMMENDED ===========================================

page_recommended_wrapper = document.getElementById('page-recommended-wrapper');
recommended_left_arrow = document.getElementById('recommended-left-arrow');
recommended_right_arrow = document.getElementById('recommended-right-arrow');

recommended_left_arrow.addEventListener('click', function() {
	defineRecommendationSizing('decrease');
});
recommended_right_arrow.addEventListener('click', function() {
	defineRecommendationSizing('increase');
});

current_rec_pos = 0;

window.addEventListener('resize', recommendationResizing);

function recommendationResizing() {
	parent = document.getElementById('recommended-content-wrapper');
	fake_pos = searchAllDataIndexById(parent.children[0].id.slice(12));
	current_rec_pos = fake_pos;

	parent.innerHTML = '';

	createRecommendationContent(1, current_rec_pos);
	defineRecommendationSizing('default');
}

function defineRecommendationSizing(arrow) {
	wrapper_width = page_recommended_wrapper.clientWidth;
	content =  document.getElementsByClassName('recommended-content');
	content_width = content[0].clientWidth;

	size = Math.floor(wrapper_width/content_width)-1;
	
	if(content.length != 0) { //define if there is one reccomendation, then delete first the first one
		document.getElementById('recommended-content-wrapper').innerHTML = '';
	}
	switch(arrow) {
		case 'increase':
			rec_pos_handling = checkIfRecExceed('increase',size);
			createRecommendationContent(size, rec_pos_handling);
		break;
		case 'decrease':
			rec_pos_handling = checkIfRecExceed('decrease',size);
			createRecommendationContent(size, rec_pos_handling);
		break;
		case 'default':

			createRecommendationContent(size, current_rec_pos);
		break;
	}
}

function createRecommendationContent(size, pos) {
	parent = document.getElementById('recommended-content-wrapper');
	
	try{
		if(size === 0 ) size = 1;

		for(var x = pos; x < pos+size; x++) {
			if(pos+size >= mergingDatas.length ) { //merging datas dioganti recommended data nanti
				throw 'overflowing data';
			}
			div = document.createElement('div');
			div.innerHTML = `
							<div class="recommended-content-image-wrapper">
								<img class="recommended-content-image" onclick="addMenuSongToList(this.parentElement.parentElement.id)" src="`+mergingDatas[x].img+`">
							</div>
							<div class="recommended-content-about">
								<p>`+mergingDatas[x].name+`</p>
							</div>
		`;
		div.className = 'recommended-content';
		div.id = 'rec-content-'+mergingDatas[x].id;
		parent.appendChild(div);
		}
	} catch(err) {
		if(err === 'overflowing data') {
			//handling id there is no more data, but the screen size is increasing
			if(size > mergingDatas.length) size = mergingDatas.length;

			for(var x = mergingDatas.length - size; x < mergingDatas.length; x++) {
				div = document.createElement('div');
				div.innerHTML = `
								<div class="recommended-content-image-wrapper">
									<img class="recommended-content-image" onclick="addMenuSongToList(this.parentElement.parentElement.id)" src="`+mergingDatas[x].img+`">
								</div>
								<div class="recommended-content-about">
									<p>`+mergingDatas[x].name+`</p>
								</div>
			`;
			div.className = 'recommended-content';
			div.id = 'rec-content-'+mergingDatas[x].id;
			parent.appendChild(div);
			}
		}
	}

	current_rec_pos = searchAllDataIndexById(parent.children[parent.childElementCount-1].id.slice(12))
}

function searchAllDataIndexById(target_id) {
	for(var x = 0; x < mergingDatas.length; x++) {
		if(mergingDatas[x].id === target_id) {
			return x;
		}
	}
	return 'err';
}

function checkIfRecExceed(evt, size) {
	if(evt === 'decrease') {
		if(current_rec_pos-((size*2)-1) < 0) {
			return 0;
		} else {
			return current_rec_pos-((size*2)-1);
		}
	}
	if(evt === 'increase') {
		if(current_rec_pos+size >= mergingDatas.length) {
			return (mergingDatas.length) - size;
		} else {
			return current_rec_pos+1;
		}
	};
	if(evt === 'default') {

	}
}


//====================================================================

//=================================== HITS ===========================================

window.addEventListener('resize', defineHitsContent);

function defineHitsContent() {
	parent = document.getElementById('page-hits-content-outer');
	news_parent = document.getElementById('page-news-content-outer');

	elem = document.getElementsByClassName('hits-content-wrapper')[0];
	size = Math.floor(news_parent.clientHeight/elem.clientHeight) - 1;

	console.log('size : '+size);
	if(size < 1 || areMobile === 0) {
		size = 5;
	}
	
	if(size > mergingDatas.length) {
		size = mergingDatas.length;
	}

	parent.innerHTML = '';

	for(var x = 0; x < size; x++) {
		div = document.createElement('div');
				div.innerHTML = `
								<div class="hits-image">
									<img src="`+mergingDatas[x].img+`">
								</div>
								<div class="hits-about">
									<h3>`+mergingDatas[x].name+`</h3>
								</div>
								<div class="hits-function">
									<div class="hits-function-span" onclick="addMenuSongToList(this.parentElement.parentElement.id)"><img src="player-icon/play_song_white.png"> <p>Play</p></div>
									<div class="hits-function-span"><img src="player-icon/link_song_white.png"> <p>More Info</p></div>
								</div>
			`;
			div.className = 'hits-content-wrapper';
			div.style.cssText = `
			background: linear-gradient(rgba(0,0,0,.5), rgba(var(--secondary_color),.5)), url('`+mergingDatas[x].img_bg+`') no-repeat center;
			background-size: cover;
			`;
			div.id = 'hit-content-'+mergingDatas[x].id; //merging datas bisa diganti dengan arr data baru
			parent.appendChild(div);
	}

}
//====================================================================

function addMenuSongToList(id) {
	if(findSonginArr(list_song_active, cutAndGetSongId(id)) === 'not-found') {
		addSongToList(id);
		animationAddQueFromMenu('Song Succesfully Added!');
		return '';
	}
	animationAddQueFromMenu('Song Failed to Add! Duplication Found!');
}

//========================================================



function definePacksWrapper() {
	parent = document.getElementById('list-group-pack');

	parent.innerHTML = '';

	for(var x = 0; x < 3; x++) { //create the pack wrapper
		div = document.createElement('div');
		div.innerHTML = `
						<div class="group-pack-header">
							<div class="group-pack-header-head">
								<h1>MIX</h1>
							</div>
							<div class="group-pack-header-func">
								<img src="icon/list_white.png">
								<img src="icon/plus_white.png" onclick="packAddingToList(this.parentElement.parentElement.nextElementSibling.nextElementSibling)">
								<img src="icon/star_white.png">
							</div>
						</div>
						<div class="pack-arrow-wrapper">
							<img class="pack-arrow-wrapper-left" src="icon/double_arrow_left_white.png" onmouseover="packArrowHoverHandler('left', this.parentElement.nextElementSibling)" onmouseleave="packArrowLeaveHandler()">
						</div>
						<div class="group-pack-content" id="group-pack-content-`+x+`">

						</div>
						<div class="pack-arrow-wrapper">
							<img class="pack-arrow-wrapper-right" src="icon/double_arrow_right_white.png" onmouseover="packArrowHoverHandler('right', this.parentElement.previousElementSibling)" onmouseleave="packArrowLeaveHandler()">
						</div>
		`;

		div.className = 'group-pack-wrapper';
		div.id = 'group-pack-wrapper-'+x;

		parent.appendChild(div);
	}

	for(var x = 0; x < 3; x++) { //isi content dari pack
		definePackContent(x);
		console.log('out');
	}

}

function definePackContent(index) {
	parent = document.getElementsByClassName('group-pack-content')[index];

	for(var x = 0; x < mergingDatas.length; x++) {
		div = document.createElement('div');
		div.innerHTML = `
			<h3 class="pack-content-head">`+mergingDatas[x].name+`</h3>
		`;
		div.className = 'pack-content-wrapper';
		div.id = 'pack-content-wrapper-'+mergingDatas[x].id;
		div.style.cssText = `
			background: url('`+mergingDatas[x].img+`') no-repeat center rgba(0, 0, 0, .4);
			background-size: cover;
			background-blend-mode: darken;
		`;
		parent.appendChild(div);
	}
}

pack_arrow_indicator = 1; //0 == aktif, 1 == not active
function packArrowLeaveHandler() {
	pack_arrow_indicator = 1
}

function packArrowHoverHandler(evt, target_elem) {
	pack_arrow_indicator = 0;
	alr_scroll = target_elem.scrollLeft;
	moving = 0;
	adding = 0;
	switch(evt) {
		case 'left':
			moving = alr_scroll-50;
			adding = -50;
			break;
		case 'right':
			moving = alr_scroll+50;
			adding = 50;
			break;
	}
	packArrowMove(adding, target_elem, moving);
}

function packArrowMove(adding, target_elem, moving) {
	if(pack_arrow_indicator === 0) {
		target_elem.scrollTo({left: moving, behavior: 'smooth'});
		setTimeout(function() {
			moving = moving+(adding);
			packArrowMove(adding, target_elem, moving);
		},250);
	}
	
}

function packAddingToList(target_list) {
	for(var x = 1; x < target_list.childElementCount+1; x++) {//for untuk insertion
		if(findSonginArr(list_song_active, cutAndGetSongId(target_list.childNodes[x].id)) === 'not-found') { //cek dulu jika song sudah ad atau belum
			addSongToList(target_list.childNodes[x].id);//insertion to song playlist
		}
	}
	animationAddQueFromMenu('Pack Succesfully Added!');
}

//====================================================================

function scriptJsWhenLoad() {
	createRecommendationContent(1, current_rec_pos);
	defineRecommendationSizing('default'); //increase , decrease, default
	defineHitsContent();
	definePacksWrapper();
}

function animationAddQueFromMenu(msg) {
	document.getElementById('pop-up-data').style.display = 'grid';
	parent = document.getElementById('pop-console-log');
	parent.innerHTML = '';
	p = document.createElement('p');
	p.style.cssText = 'color: var(--text_color_2)';
	p.innerHTML = msg;
	parent.appendChild(p);
	//Dim
	dimming = document.getElementById('dim-background');
	dimming.style.cssText = 'display: block;';

	popUpCountdown();
}

pop_inner_button = document.getElementById('pop-inner-button');

pop_inner_button.addEventListener('click', function() {
	dimming = document.getElementById('dim-background');
	dimming.style.cssText = 'display: none;';
	document.getElementById('pop-up-data').style.display = 'none';
});