$(window).on('load',function(){
    //並び替えボタン設定
    $('.sort-btn li').on('click',function(){			//並び替えボタンをクリックしたら
    	var $this = $(this),
    	$grid = $('.sortgrid');

		$('.sort-btn .active').removeClass('active');
		$this.addClass('active');
		
        $grid.shuffle($this.data('group'));
    });

    // 設定
    $('.sortgrid').shuffle({
        group: "all",
        speed: 700,
        easing: 'ease-in-out'
    });

});