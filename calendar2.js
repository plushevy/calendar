(function(){
	var modalOverlay = $(".modal-overlay");

	$("body").on("click", "#calendar-nav_prev, #calendar-nav_next", function() {
        $.ajax({
            type: "POST",
            url: "/ajax/calendar_component2.php",
            data: "monday=" + $(this).data("monday"),
            dataType: "html",
            success: function(html){
            	$("#calendar").html(html);
            }
        });
    });

	$("body").on("click", ".calendar_set_reservation", function() {
		var ths = $(this);
		var time = ths.data("time");

		var options = {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			weekday: 'long',
			timezone: 'UTC',
			hour: 'numeric',
			minute: 'numeric',
			second: 'numeric'
		};
		$("#calc_order_time_value").val(time);

		var date = new Date(time * 1000);
		$("#calendar_order_modal").find(".form1__part-time").html(date.toLocaleString("ru", options));
		$("#calendar_order_modal").addClass("modal-content--show");

		var selector = "#calc_section" + ths.data("section");
		$(".calc_section").hide();
		$(selector).show();

		$("#calcItemId").val($(selector).find(".form1__select").val());


		$(".form1__select").change(function(){
			$("#calcItemId").val($(selector).find(".form1__select").val());
		});
	});

	$("body").on("submit", "#calendar_order_form", function(e) {
		e.preventDefault();
		$.ajax({
			method: "POST",
			url: '/ajax/calendar.php',
			data: $("#calendar_order_form").serialize(),
			dataType: 'json',
			success: function(obj){
				$(".calendar_order-modal").removeClass("modal-content--show");
				$("#calendar_order_modal_success").addClass("modal-content--show");
		  	}
		});
	});

	$("body").on("click", ".calendar_modal_close", function() {
		var modalContent = $(this).parents(".modal-content");
    	modalContent.removeClass("modal-content--show");
    	modalOverlay.removeClass("modal-overlay--show");
    });


	$("body").on("click", ".table_prev", tapHandlerLeft);
	$("body").on("click", ".table_next", tapHandlerRight);


	function tapHandlerLeft(){
		var listLength = $('.calendar_today').innerWidth() + 1;
		$('.scrolled').scrollTo('-='+listLength+'px', 800, {axis:'x'});
  }

	function tapHandlerRight(){
		var listLength = $('.calendar_today').innerWidth() + 1;
		$('.scrolled').scrollTo('+='+listLength+'px', 800, {axis:'x'});
  }



}) (jQuery);
