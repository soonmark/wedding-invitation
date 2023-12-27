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
				preload: [0,3] // Will preload 0 - before current, and 1 after the current image
			},
			image: {
				markup: '<div class="mfp-figure">'+
					'<div class="mfp-close"></div>'+
					'<div class="mfp-img"></div>'+
					'<div class="mfp-bottom-bar">'+
					'<div class="mfp-title"></div>'+
					'<div class="mfp-counter"></div>'+
					'</div>'+
					'</div>',
				tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
				titleSrc: function(item) {
					return item.el.attr('title');
				}
			},
			callbacks: {
				open: function() {
					location.href = location.href.split('#')[0] + "#gal";
				}
				,close: function() {
					if (location.hash) history.go(-1);
				}
			}
		});
	});

	$(window).on('hashchange',function() {
		if(location.href.indexOf("#gal")<0) {
			$.magnificPopup.close();
		}
	});

	//계좌 클립보드 복사
	$("div.account_no_copy").on('click', function (e) {
		e.preventDefault();
		var account = $(this).attr('data-account');
		copyToClipboard(account);

		if (varUA.indexOf('android') > -1) {
			return false;
		} else {
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