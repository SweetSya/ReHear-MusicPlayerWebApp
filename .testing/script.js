boxes = document.getElementsByClassName('box');

box1 = document.getElementById('box-1'); //box yang dipindah
rela = document.getElementById('rela');

function test1() {
	console.log('test1 inside');
	if(rela.style.marginLeft === '50%') {
		rela.style.cssText = 'margin-left: 0%; background-color: white;';
		rela.children[0].src = 'm.png';
		return '';
	}
	rela.style.cssText = 'margin-left: 50%; background-color: black;';
	rela.children[0].src = 'n.png';
}