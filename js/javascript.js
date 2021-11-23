var timer;

// newstickerの設定用オブジェクト
ticker = {};
ticker.totalList = 0;   // li要素の数(リスト数)
ticker.numList = 0;     // 現在のリスト番号
ticker.time = 1000;     // アニメーションの秒数
ticker.interval = 4000; // setInterval()の間隔

$(window).on('load',function(){
    ticker.totalList = $('#ul_news li').length;  // リスト数
    
    ticker.width = $('.tick').css('width');    // 横幅
    ticker.height = $('.tick').css('height');  // 長さ
    
    var str = $('#ul_news li:first').html();   // a要素

    $('#div_ticker').html(str);
    
    timer = setInterval('showNews()', ticker.interval);
    
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

function showNews(){
    
    // リストの順番を決める
    ticker.numList ++;
    if (ticker.numList > ticker.totalList - 1){
        ticker.numList = 0;
    }

    var str = $('#ul_news li').eq(ticker.numList).html(); // a要素を取得

    // 上から下
    $('#div_ticker a').animate({top: ticker.height}, ticker.time, 'linear', function(){
        $('#div_ticker').html(str);
        $('#div_ticker a').css('top', '-' + ticker.height).animate({top: '0'}, ticker.time, 'linear');
    });
};
