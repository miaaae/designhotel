//메뉴
const appbar=$('.app-bar-wrap .appbarBt');
const mobileMenu=$('.mobile-menu')
const appbarCloseBt=$('.appbarCloseBt')

appbar.on('click', function(){
    mobileMenu.stop().animate({left: 0},500);
    $('.header-mobile-menu').stop().animate({left:'100%'},500)
})

appbarCloseBt.on('click', function(){
    mobileMenu.stop().animate({left: -100+'%'},500);
    $('.header-mobile-menu').stop().animate({left:0},500)
})


//비디오

let winW=$(window).innerWidth();
let winH=$(window).innerHeight();
let vidH=$('#mainVideo').innerHeight();
let vidW=$('#mainVideo').innerWidth();

/* console.log(winW)
console.log(winH)
console.log(vidW)
console.log(vidH) */

let videoPlay='on';
let soundMuted='off';

$('#mainVideo').get(0).autoplay=true;
$('#mainVideo').get(0).loop=0;
$('#mainVideo').get(0).muted=true;

$('.video').css({width:'100%', height:winH});

if(winH>vidH){
    $('#mainVideo').css({width: 'auto', height: winH})
}
if(winW>vidW){
    $('#mainVideo').css({width: winW, height: 'auto'})
}

$(window).resize(videoResizeFn);

function videoResizeFn(){
    winW=$(window).innerWidth();
    winH=$(window).innerHeight();
    vidH=$('#mainVideo').innerHeight();
    vidW=$('#mainVideo').innerWidth();

    $('.video').css({width:'100%', height: winH})

    if(winH>vidH){
        $('#mainVideo').css({width: 'auto', height: winH})
    }
    if(winW>vidW){
        $('#mainVideo').css({width: winW, height: 'auto'})
    }

}

$('.m-again').hide();

// 정지버튼
$('.pauseIcon').on('click', function(){
    if(videoPlay === 'on'){
        videoPlay = 'off';
        $('#mainVideo').get(0).pause();
        $(this).find('i').attr('class', 'fas fa-play');
    }else{
        videoPlay = 'on';
        $('#mainVideo').get(0).play();
        $(this).find('i').attr('class', 'fas fa-pause');
    }
});

$(document).keypress(function(e){
    if(e.keyCode === 32 && videoPlay === 'on'){
        e.preventDefault();
        videoPlay = 'off';
        $('#mainVideo').get(0).pause();
        $('.pauseIcon').find('i').attr('class', 'fas fa-play');
    }else if(e.keyCode === 32 && videoPlay === 'off'){
        videoPlay = 'on';
        $('#mainVideo').get(0).play();
        $('.pauseIcon').find('i').attr('class', 'fas fa-pause');
        $('.m-again').hide();
    }
});

// 소리버튼
$('.mutedIcon').on('click', function(){
    if(soundMuted === 'off'){
        soundMuted = 'on';
        $('#mainVideo').get(0).muted = false;
        $(this).find('i').attr('class', 'fas fa-volume-up');
    }else{
        soundMuted = 'off';
        $('#mainVideo').get(0).muted = true;
        $(this).find('i').attr('class', 'fas fa-volume-mute');
    }
});

$(document).keypress(function(e){
    if(e.keyCode === 13 && soundMuted === 'on'){
        e.preventDefault();
        soundMuted = 'off';
        $('#mainVideo').get(0).muted = true;
        $('.mutedIcon').find('i').attr('class', 'fas fa-volume-mute');
    }else if(e.keyCode === 13 && soundMuted === 'off'){
        soundMuted = 'on';
        $('#mainVideo').get(0).muted = false;
        $('.mutedIcon').find('i').attr('class', 'fas fa-volume-up');
    }
});

let setId = setInterval(videoTimeCountFn,100);
function videoTimeCountFn(){
    //console.log('비디오 진행 시간:' + $('#mainVideo').get(0).currentTime)
    /* console.log('비디오 진행 시간:' + $('#mainVideo').get(0).duration)
    console.log('정지여부:' + $('#mainVideo').get(0).ended) */
    
    if($('#mainVideo').get(0).ended == true){
        $('.m-again').show();
        videoPlay = 'off';
        $('.pauseIcon').find('i').attr('class', 'fas fa-play');
        clearInterval(setId);
    }

}

$('.m-again').on('click', function(){
    videoPlay = 'on';
    $('#mainVideo').get(0).play();
    $('.pauseIcon').find('i').attr('class', 'fas fa-pause');
    $(this).hide();
});


const TrendingWrap = $('.trending-wrap');
let offset = TrendingWrap.offset().left;

TrendingWrap.on({mousemove(e){
    //console.log(e.pageX);

    if(e.pageX >= 1560){
        return false;
    }else{
        $(this).css({left: -e.pageX})
    }
}})