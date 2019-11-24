var card = {};
var overlay = $('.overlay');

function loadCard(){
	// проверка есть ли в козине товары (запись в localstorage)
	if (localStorage.getItem('card')){
		//если есть отображаю это
		card = JSON.parse(localStorage.getItem('card'));
		showCard();
	}else{
		
	}
}

function showCard(){
	if(isEmpty(card)){
		$('.basket__items').prepend('<h2 class="basket__status">Корзина пуста</h2>');
		$('.basket__item').remove();
	}else{
			$.getJSON("products.json", function(data){
			var prod = data;
			var out = "";

			for(var id in card){
				out += '<div class="basket__item">';
				out += '<picture class="basket__item-photos">';	
				out += '<source media="(min-width: 1250px)" srcset="'+prod[id].imgWebp1250+'" type="image/webp">';
				out += '<source media="(min-width: 1250px)" srcset="'+prod[id].img1250+'">';
				out += '<source media="(min-width: 768px)" srcset="'+prod[id].imgWebp768+'" type="image/webp">';
				out += '<source media="(min-width: 768px)" srcset="'+prod[id].img768+'">';
				out += '<source srcset="'+prod[id].imgWebp+'" type="image/webp">';
				out += '<img src="'+prod[id].img+'" class="product__photo">';		
				out += '</picture>';	
				out += '<div class="basket__item-desc-wrapper">';	
				out += '<a href="#" class="basket__item-name">'+prod[id].name+'</a>';		
				out += '<p class="basket__item-arguments">'+prod[id].arguments+'</p>';		
				out += '<p class="basket__item-desc">'+prod[id].desc+'</p>';		
				out += '<p class="basket__item-quantity-name">Кол-во</p>';		
				out += '<div class="basket__item-quantity-wrapper">';		
				out += '<a class="basket__item-quantity-btn basket__item-quantity-minus" data-product-id="'+id+'"></a>';			
				out += '<span class="input-quantity basket__item-quantity" data-cost="'+prod[id].cost+'">'+card[id]+'</span>';			
				out += '<a class="basket__item-quantity-btn basket__item-quantity-plus" data-product-id="'+id+'"></a>';			
				out += '</div>';		
				out += '<span class="basket__item-cost item-cost">'+card[id]*prod[id].cost+' руб</span>';		
				out += '</div>';	
				out += '<a class="basket__item-remove-btn" data-product-id="'+id+'"></a>';	
				out += '</div>';
			}

			$('.basket__items').html(out);
			$('.basket__item-remove-btn').on('click', delProd);
			$('.basket__item-quantity-plus').on('click', plusProd);
			$('.basket__item-quantity-minus').on('click', minusProd);
		});
	}
}


function delProd(e){
	// e.stopImmediatePropagation();
	//удалить товар из корзины
	var id = parseInt($(this).attr('data-product-id'));
	delete card[id];
	saveCard();
	loadCard();
}
function plusProd(e){
	var id = $(this).attr('data-product-id');
	card[id]++;
	saveCard();
	loadCard();
}
function minusProd(e){
	var id = $(this).attr('data-product-id');
	card[id]--;
	if(card[id]<=0){
		card[id]=1;
		return false;
	}
	saveCard();
	loadCard();
}
function saveCard(){
	//сохранить корзину в localstorage
	localStorage.setItem('card', JSON.stringify(card));
}

function isEmpty(object) {
    for (var key in object)
    if (object.hasOwnProperty(key)) return false;
    return true;
}
function sendBasket(e){
	e.preventDefault();
	var cTel = $('#customerTel').val();
	var cEmail = $('#customerEmail').val();
	var cOp = $('#customerOptions').val();
	console.log(cTel,cEmail,cOp)

	if(isEmpty(card)){
		overlay.toggleClass('overlay--active');
		$('.error-modal__title').html('Корзина пуста');
  		$('.error-modal').toggleClass('modal--active');
	}else{
		if(cTel !="" && cEmail !=""){
			if(cOp ==''){
				cOp="Нет пожеланий";
			}else{
				cOp = cOp;
			}
			$.post(
				"core/card.php",
				{
					"cTel" : cTel,
					"cEmail" : cEmail,
					"cOp" : cOp,
					"card" : card
				}
			).done(function(){
				overlay.toggleClass('overlay--active');
			  	$('.success-modal').toggleClass('modal--active');
			  	setTimeout(function() {
					// Done Functions
					$('form').trigger("reset");
				}, 1000);
			}).fail(function() {
		 		overlay.toggleClass('overlay--active');
		  		$('.error-modal').toggleClass('modal--active');
		 	});
		}else{
			overlay.toggleClass('overlay--active');
			$('.error-modal__title').html('Заполните поля');
		  	$('.error-modal').toggleClass('modal--active');
		  	return;
		}
	}
}
jQuery(document).ready(function($) {
	
	loadCard();
	$(".basket__send-btn").on('click', sendBasket);
});