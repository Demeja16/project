var moreButton = document.querySelector('#more-btn');
var rules = document.querySelector('.second-section__desc');
moreButton.addEventListener('click', function(){
	rules.classList.toggle('second-section__desc--clip');
})