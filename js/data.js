const $container = $('.gallery-wrap');
const $loadMoreBtn = $('.loadMoreBt');

let $addItemCount = 3;
let $added = 0;
let $allData = []; // data를 배열로 가져옴

let $filter = $('#gallery-filter');
let $filterdData = [];


$.getJSON('./data/video.json', function(data){ //.getJSON('불러올 json 파일 경로') : json data를 가져옴
    $allData = data;
    $filterdData = $allData;
    
    addItem();
    $loadMoreBtn.click(addItem);

    $filter.on('change', 'input[type=radio]', filterItems);    
}); 

function addItem(data){
    let element = [];
    let slicedData;
    slicedData = $filterdData.slice($added, $added += $addItemCount);

    $.each(slicedData, function(index, item){
        const fileExtention = item.video.split('.').pop().toLowerCase(); // video file의 .아래만 가져옴 = . 아래 확장자를 소문자로 가져옴
        const isMp4 = fileExtention === 'mp4';
        const sw = isMp4 ? (`<video autoplay muted loop src=${item.video}></video>`) : (`<img src=${item.video} />`);

        let itemHTML = `
            <li>
                <div>
                    <a href="javascript:" class="galleryBt">
                        <span class="g-video">
                            ${sw}
                        </span>
                        <span class="g-color"></span>
                        <span class="g-title">
                            <span><strong>${item.title}</strong></span>
                            <span><b>${item.description}</b></span>
                            <span><i class="exploreBt">Explore</i></span>
                        </span>
                    </a>
                </div>
            </li>
        `;
        element.push($(itemHTML).get(0));

        if($added < $allData.length){
            $loadMoreBtn.text('Load More');
        }else{
            $loadMoreBtn.css({background:'#384244',color:'#bee4e3',border:'1px solid #5e686a'}).text('The End'); // video를 다 불러오면 the end로 텍스트 변경
        }

    });

    $container.append(element);

    // 필터 값을 다 불러오면 버튼 텍스트 변경
    if($added < $filterdData.length){
        $loadMoreBtn.text('Load More');
    }else{
        $loadMoreBtn.css({background:'#384244',color:'#bee4e3',border:'1px solid #5e686a'}).text('The End'); // video를 다 불러오면 the end로 텍스트 변경
    }
}

function filterItems(){
    let key = $(this).val(); // this의 value 값을 받아서 key에 받아
    $filterdData = [];
    // $added = 0;
    $container.empty(); // 우선 리스트를 다 비운 후 필터 값에 따른 데이터로 채움
    $added = 0;

    if(key == 'all'){
        $filterdData = $allData;
    }else{
        $filterdData = $.grep($allData, function(item){
            return item.category === key;
        });        
    }
    addItem(true);
}