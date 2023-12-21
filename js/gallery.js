(function($) {
    "use strict";
	var varUA = navigator.userAgent.toLowerCase();

	$(document).ready(function() {
		$('#fh5co-gallery-list').magnificPopup({
			delegate: 'a',
			type: 'image',
			tLoading: 'Loading image #%curr%...',
			mainClass: 'mfp-img-mobile',
			gallery: {
				enabled: true,
				navigateByImgClick: true,
				preload: [0,1] // Will preload 0 - before current, and 1 after the current image
			},
			image: {
				tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
				titleSrc: function(item) {
					return item.el.attr('title');
				}
			}
		});
	});

	//계좌 클립보드 복사
	$("div.account_no_copy").on('click', function (e) {
		e.preventDefault();
		var account = $(this).attr('data-account');
		copyToClipboard(account);

		console.log("asd");

		if (varUA.indexOf('android') > -1) {
			return false;
		} else {
			console.log("asdasd");
			toastPopup('복사되었습니다.', 1500);
		}
	});


}(jQuery));

//클립보드 복사
var copyToClipboard = function (text) {
	var aux = document.createElement("textarea");
	aux.value = text;
	document.body.appendChild(aux);
	aux.select();
	aux.setSelectionRange(0, 9999);
	document.execCommand("copy");
	document.body.removeChild(aux);
};

//팝업창 표시
var toastPopup = function (msg, timer) {
	var $elem = $("<p>" + msg + "</p>");

	$("div.toast").html($elem).show();

	$elem.slideToggle(100, function () {
		setTimeout(function () {
			$elem.fadeOut(function () {
				$(this).remove();
				$('div.toast').css('bottom', '');
			});
		}, timer);
		return false;
	});

	$('div.toast').stop().animate({ 'bottom': '5%' });
};