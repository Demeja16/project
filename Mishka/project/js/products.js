var card = {}; //корзина

function init(){
	//вывод товара на страницу
	$.getJSON("products.json", productsOut);
}

function productsOut(data){
	var out = "";

	for(var key in data){
		out += '<div class="catalog__item product">';
			out += '<a href="#" class="catalog__item-link">';
				out += '<picture class="product__photo-wrapper">';
					out += '<source media="(min-width: 1250px)" srcset="'+data[key].imgWebp1250+'" type="image/webp">';
					out += '<source media="(min-width: 1250px)" srcset="'+data[key].img1250+'">';
					out += '<source media="(min-width: 768px)" srcset="'+data[key].imgWebp768+'" type="image/webp">';
					out += '<source media="(min-width: 768px)" srcset="'+data[key].img768+'">';
					out += '<source srcset="'+data[key].imgWebp+'" type="image/webp">';
					out += '<img src="'+data[key].img+'" class="product__photo">';
				out += '</picture>';
			out += '</a>';
		out += '<div class="product__description">';
			out += '<a href="#" class="product__name">'+data[key].name+'</a>';
				out += '<p class="product__feature">'+data[key].arguments+'</p>';
				out += '<div class="product__cost">';
					out += '<p class="product__price">'+data[key].cost+' руб';
						out += '<button class="product__price-button" data-product-id="'+key+'">';
							out += '<svg width="21" height="18" class="product__price-image" fill="#231F20" fill-opacity="0.2">';
								out += '<use xlink:href="#basket-icon" class="user-list__icon--basket"></use>';
							out += '</svg>';
						out += '</button>';
					out += '</p>';
				out += '</div>';
			out += '</div>';
		out += '</div>';
	}
	$('.catalog__list').html(out);
	$('.product__price-button').on('click', addToCard);
}
function addToCard(){
	//Добавить товар в корзину
	var id = $(this).attr('data-product-id');
	if (card[id] == undefined) {
		card[id] = 1;
	}else{
		card[id]++;
	}
	showMiniCard();
	saveCard();
}
function showMiniCard(){
	//отображает количество товаров в корзине
	var out = "";
	for(var key in card){
		out += key +'__'+ card[key]+'<br>';
	}
	console.log(localStorage.getItem('card'));
	$('.main-nav__basket-satus').html(out);
}
function saveCard(){
	//сохранить корзину в localstorage
	localStorage.setItem('card', JSON.stringify(card));
}
function loadCard(){
	// проверка есть ли в козине товары (запись в localstorage)
	if (localStorage.getItem('card')){
		//если есть отображаю это
		card = JSON.parse(localStorage.getItem('card'));
		showMiniCard();
	}
}
jQuery(document).ready(function($) {
	init();
	loadCard();
});