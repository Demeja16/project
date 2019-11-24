jQuery(document).ready(function($) {
	var clock;
	var dt = "June 24 2019 11:04:00";
	var first = new Date(dt);
	var last = Date.now();
	var remaining = first - last;
	remaining /=1000;
	if (remaining > 0) {
		clock = $('.timer').FlipClock(remaining, {
		clockFace: 'dailyCounter',
		countdown: true,
		showSeconds: true,
		callbacks: {
		stop: function() {
			$('.message').html('Акция закончена!');
		}
	}
	});
	}else{
		$('.message').html('Акция закончена!');
	}
	
	$("#contactForm").submit(function(e) { //Change form name
    var th = $(this);
    $.ajax({
      type: "POST",
      url: "mail.php", //Change
      data: th.serialize()
    }).done(function() {
      console.log('done');
      setTimeout(function() {
        // Done Functions
        th.trigger("reset");
      }, 1000);
    }).fail(function() {
      console.log('fail')
    });
     e.preventDefault();
  });
});