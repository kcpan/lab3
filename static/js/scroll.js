		$(document).ready(function() {
			$("#scr1").click(function() {
				$('html, body').animate({
					scrollTop: $("html").offset().top
				}, 500);
			});
			$("#scr2").click(function() {
				$('html, body').animate({
					scrollTop: $("#id1").offset().top
				}, 500);
			});
			$("#scr3").click(function() {
				$('html, body').animate({
					scrollTop: $("#id2").offset().top
				}, 500);
			});
			$("#scr4").click(function() {
				$('html, body').animate({
					scrollTop: $("#id3").offset().top
				}, 500);
			});
			$("#scr5").click(function() {
				$('html, body').animate({
					scrollTop: $("#id4").offset().top
				}, 500);
			});

			var toggled = false;
			$('.toggler').click(function(){
				if(toggled)
				{
										showPopUp();

				}
				else
				{
										hidePopUp();
				}
				toggled = !toggled;
			});

			function hidePopUp(){
					$('.aboutContainer').addClass('hidden');
			}

			function showPopUp(){
				$('.aboutContainer').removeClass('hidden');
			}
		});
