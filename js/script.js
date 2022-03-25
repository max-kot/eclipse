"use strict"

/*---1)Определяет через какое устройство пользователь зашёл на страницу и определяет что используется тачскрин или мышка ---*/

var isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function () {
		return (
			isMobile.Android()
			|| isMobile.BlackBerry()
			|| isMobile.iOS()
			|| isMobile.Opera()
			|| isMobile.Windows()
		);
	}
};

// Делаем проверку если это тачскрин то будем добавлять к body то будем добавлять класс _touch а иначе _pc
if (isMobile.any()) {
	document.body.classList.add('_touch');

	/*--- если определилось что тачкскрин показывает стрелочку подменю ---*/
	let menuArrows = document.querySelectorAll('.menu__arrow'); //собираем все стрелочки
	if (menuArrows.length > 0) {// проверяет есть ли вообще в массиве стрелочки
		for (let index = 0; index < menuArrows.length; index++) { // пробегаемся по всем стрелочкам 
			const menuArrow = menuArrows[index]; // создаём константу для стрелки
			menuArrow.addEventListener('click', function (e) {
				menuArrow.parentElement.classList.toggle('_active'); // добавляет к родителю класс (и убирает старый) 
			});
		}
	}
} else {
	document.body.classList.add('_pc');
}
/*---2)Плавная прокрутка к нужному разделу при клике---*/

// Собираем массив объектов, которые будут учавствовать в навигации т.е ссылок с атрибутом data-goto
const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
//проводим проверку на то что есть ли что-то в массиве
if (menuLinks.length > 0) {
	// проводим иттерацию
	menuLinks.forEach(menuLink => {
		menuLink.addEventListener('click', onMenuLinkClick); //отправляем на функцию
	});

	function onMenuLinkClick(e) {
		// получаем объект на который мы кликаем
		const menuLink = e.target;
		//проверяем заполнен ли data-goto и существует ли объект на который ссылаются
		if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
			// получаем объект
			const gotoBlock = document.querySelector(menuLink.dataset.goto);
			// высчитываем положение этого объекта с учетом высоты шапки(отнимаем)
			const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY - document.querySelector('header').offsetHeight;


			/*//! Скрываем меню на мобилках при нажатии на нужный раздел */
			if (iconMenu.classList.contains('_active')) {
				//убираем антипрокрутку
				document.body.classList.remove('_lock');
				iconMenu.classList.remove('_active');
				menuBody.classList.remove('_active');
			}

			//заставляет скролл крутиться -> обращается к окну браузера
			window.scrollTo({
				top: gotoBlockValue,
				behavior: 'smooth' // плаваная
			});
			e.preventDefault(); //отключаем работу ссылки
		}
	}
}

/*---Меню бургер---*/
//получаем кнопку
const iconMenu = document.querySelector('.menu__btn');
const menuBody = document.querySelector('.menu__body');
//делаем проверку на наличие
if (iconMenu) {
	iconMenu.addEventListener('click', function (e) {
		//отключаем скролл страницы при включёном меню 
		document.body.classList.toggle('_lock');
		//добавляем класс _active к кнопке и к телу меню
		iconMenu.classList.toggle('_active');
		menuBody.classList.toggle('_active');
	})
}
