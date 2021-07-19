//sct top 이벤트 리스너
let count;
let reverse;
let sctTop;
let sectionTop=0;

window.addEventListener('resize', function(){
    let visualVideo = document.querySelector('#visual video')
    if(window.innerWidth <= 760){
        visualVideo.setAttribute('src','video/introMobile.mp4')
    }
})
window.addEventListener('scroll',function(){
    sctTop = window.pageYOffset;
    visual(sctTop, 300, 200);
    perfomance(sctTop);
    charging(sctTop, 1, 1.23);
    v2l(sctTop);
    vr(sctTop, 1);
    design(sctTop);
    safety(sctTop);
})

function counter(sct, minNum, length){
    return (sct-minNum)*(1/length);
}
function counterReverse(sct, maxnum, length){
    return (maxnum-sct)*(1/length);
}
function newCounter(sct, min, max){
    count =  (sct-sectionTop*min)*(1/((sectionTop*max)-(sectionTop*min)));
    reverse = (sectionTop*(max)-sct)*(1/((sectionTop*max)-(sectionTop*min)));
}

// visual event

function visual(sct, min, length){
    mainText = document.querySelector('.visual_content_text_main');
    subText = document.querySelector('.visual_content_text_sub');
    subTextP = subText.querySelectorAll('p');
    if(sct >= min && sct <= min+(1*length)){
        count = counter(sct, min, length);
        reverse = counterReverse(sct, min+(1*length), length);
        mainText.style.marginTop = `${reverse*12.5}rem`;
        mainText.style.opacity = `${count}`;
    }
    if(sct >= min+(1*length) && sct <= min+(2*length)){
        count = counter(sct, min+(1*length), length);
        reverse = counterReverse(sct, min+(2*length), length);
        subText.style.marginTop = `${reverse*12.5}rem`;
        subText.style.opacity = `${count}`;
    }
    subTextP.forEach(function(item){
        if(sct >= min+(2*length) && sct <= min+(3*length)){
            count = counter(sct, min+(2*length), length);
            reverse = counterReverse(sct, min+(3*length), length);
            item.style.marginTop = `${reverse*12.5+0.625}rem`;
            item.style.opacity = `${count}`;
        }else if (sct > min+(3*length)){
            item.style.marginTop = `0.875rem`;
            item.style.opacity = `1`;
        }
    })
}
        
//perfomance event
function perfomance(sct){
    video = document.querySelector('.perfomance_content_main')
    sectionTop = document.querySelector('#perfomance').offsetTop;
    if(window.innerWidth > 768){
        perfomanceVideo(sct,0.9 ,1.3);
        perfomanceText(sct,1.2 ,1.3);
        perfomanceBottom(sct, 1.4, 1.5);
    }else{
        perfomanceVideoMobile(sct, 0.5, 0.7);
        perfomanceText(sct, 0.7, 0.75);
        perfomanceBottom(sct, 0.9, 1);
    }
    
}

function perfomanceVideoMobile(sct, min, max){
    if(sct >= sectionTop*(min) && sct <= sectionTop*(max)){
        video.querySelector('.perfomance_content_video').play();
    }else if(sct < sectionTop*(min) || sct > sectionTop*(2.3)){
        video.querySelector('.perfomance_content_video').pause();
    }   
}

function perfomanceVideo(sct, min, max){
    if(sct >= sectionTop*(min) && sct <= sectionTop*(max)){
        newCounter(sct, min, max);
        video.querySelector('.perfomance_content_video').play();
        video.style.transform =`scale(${reverse+0.4})`;
        video.style.left = `${-count*12.5}%`;
        video.style.top = `${-count*15}vh`;
    }else if(sct> sectionTop*max){
        video.style.transform =`scale(0.4)`;
    }
    else if(sct < sectionTop*(min) || sct > sectionTop*(2.3)){
        video.querySelector('.perfomance_content_video').pause();
    }   
}

function perfomanceText(sct, min, max){
    text = document.querySelectorAll('.perfomance_content_text li');
    newCounter(sct, min, max);
    for(let i = 0; i < text.length; i++){
        if(sct >= sectionTop*min && sct <= sectionTop*max){  
            text[i].style.transform = `translateY(${-count*200}%)`;
            text[i].style.opacity = `${count}`;
        }else if(sct < sectionTop*min){
            text[i].style.transform = `translateY(0)`;
            text[i].style.opacity = 0;
        }
    }
}

function perfomanceBottom(sct, min, max){
    bottomText = document.querySelector('.perfomance_content_bottom');
    newCounter(sct, min, max);
    if(sct >= sectionTop*min && sct <= sectionTop*max){
        bottomText.style.transform = `translateY(${-count*100}%)`;
        bottomText.style.opacity = `${count}`;
    }else if (sct < sectionTop*min){
        bottomText.style.opacity = 0;
    }
}

//charging event

let chargeCount = 0;
let timer;
let chargingText = document.querySelector('.charging_content_text');
function charging(sct, min, max){
    sectionTop = document.querySelector('#charging').offsetTop;
    video = document.querySelector('.charging_content_video video');
    if(sct >= sectionTop*min && sct < sectionTop*max){
        video.play();
        clearInterval(timer);
        countNum();
        chargingText.classList.add('on');
    }else if(sct >= 6800 || sct < sectionTop*min){
        video.pause;;
        clearInterval(timer);
        chargingText.classList.remove('on');
        chargeCount = 0;
    }
}
function countNum(){
    timer = setInterval(function(){
        chargeCount++;
        if(chargeCount >= 0 && chargeCount < 10){
            chargingText.querySelector('span').innerHTML=`0${chargeCount}%`;
        }else if(chargeCount >=10 && chargeCount<=80){
            chargingText.querySelector('span').innerHTML=`${chargeCount}%`;
        }
        else if(chargeCount > 80){
            return;
        }
    },100);
}

//v2l event
function v2l(sct){    
    sectionTop = document.querySelector('#v2l').offsetTop;
    bg = document.querySelector('.v2l_content_main');
    textFigure = bg.querySelector('.v2l_text');
    videoFigure = bg.querySelector('.v2l_main_video');
    textBox = bg.querySelector('.v2l_content_text_box');

    v2lBackground(sct, 1, 1.08);
    v2lFigure(sct, 1.1);
    v2lBigText(sct, 1.25, 1.38);
    v2lVideo(sct, 1.5, 1.6);
    v2lTextBox(sct, 1.6, 1.65);
}


function v2lBackground(sct, min, max){
    if(sct >= sectionTop*min && sct < sectionTop*max){
        newCounter(sct, min, max);
        bg.style.width = `${count*100}vw`;
    }else if(sct > sectionTop*max){
        bg.style.width ='100vw';
    }else if(sct < sectionTop*min){
        bg.style.width = `0vw`;
    }
}

function v2lFigure(sct, min){
    number = ['first', 'second', 'third', 'fourth'];
    imgNum = [31, 56, 70, 89];
    figure = document.querySelectorAll('.video_figure');
    for(let i=0; i <= 3; i++){
        if(sct >= sectionTop*(min+0.045*i) && sct < sectionTop*(min+(0.045*(i+1)))){
            newCounter(sct, min+0.045*i, min+(0.045*(i+1)));
            figure[i].style.display = 'block';
            figure[i].children[0].play();
        }else if(sct < sectionTop*(min+0.045*i)){
            figure[i].children[0].pause();
            figure[i].style.display = 'none';
        }else if(sct > sectionTop*1.65){
            figure[i].children[0].pause();
        }
    }
}

function v2lBigText(sct, min, max){
    if(sct >= sectionTop*min && sct <= sectionTop*max){
        newCounter(sct, min, max)
        textFigure.style.display = `block`;
        textFigure.style.transform = `translate(-50%,-50%) perspective(400px) translateZ(${count*100}px) scale(${(reverse*100)})`;
    }else if(sct > sectionTop*max){
        textFigure.style.transform = `translate(-50%,-50%) perspective(400px) translateZ(100px) scale(1)`;
    }else if(sct < sectionTop*min){
        textFigure.style.display='none';
    }
}

function v2lVideo(sct, min, max){
    if(sct >= sectionTop*min && sct < sectionTop*max){
        newCounter(sct, min, max)
        videoFigure.style.display = 'block';
        videoFigure.style.transform = `translate(-50%,-50%) scale(${count})`;
        videoFigure.children[0].play();
    }else if(sct > sectionTop*max){
        videoFigure.style.transform = `translate(-50%,-50%) scale(1)`;
    }else if(sct < sectionTop*min){
        videoFigure.style.display = 'none';
        videoFigure.children[0].pause();
    }else if(sct > sectionTop*1.65){
        videoFigure.children[0].pause();
    }
}

function v2lTextBox(sct, min, max){
    if(sct>= sectionTop*min && sct < sectionTop*max){
        newCounter(sct, min, max);
        textBox.style.display = 'flex';
        textBox.style.top = `${(reverse*100)}%`;
    }else if(sct > sectionTop*max){
        textBox.style.top = `-100%`;
    }else if(sct < sectionTop*min){
        textBox.style.display = 'none';
    }
}

//vr event
let model = document.querySelector('.vr_model');
let vrBg = document.querySelector('.vr_contents_main');
let mouseDrag = false;
let modelColor = vrBg.dataset.color;
class Color{
    constructor(bgColor, colorName, startNum, textColor){
        this.bgColor = bgColor;    
        this.colorName = colorName;
        this.startNum = startNum;
        this.textColor = textColor;
    }
    colorChange(){
        vrBg.style.background = this.bgColor;
        vrBg.dataset.color = this.colorName;
        modelColor = vrBg.dataset.color;
        vrBg.children[0].style.color = this.textColor;
        model.children[0].setAttribute('src',`images/vr/${this.colorName}/${this.startNum}.png`);
    }
}
let colors = [
    new Color('#eee','atlas_white',0,'#B1B2B8'),
    new Color('#aaa','olive_green', 57, '#4B4947'),
    new Color('#333','phantom_Black', 54, '#1b1b1b'),
    new Color('teal','till_green', 51,'#293437'),
    new Color('skyblue','lucid_blue', 48,'#3F5066'),
    new Color('beige','gold_matt', 45, '#888684'),
]

function vr(sct, min){
    sectionTop = document.querySelector('#vr').offsetTop;
    if(sct>= min*sctTop && sct < (min+colors.length)*sectionTop){
        for(let i =0; i<colors.length; i++){
            if(sct>= (min+0.018*i)*sectionTop && sct < (min+0.018*(i+1))*sectionTop){
                colors[i].colorChange();
            }
        }
    }
}

vrRotate();
function vrRotate(){
    model.addEventListener('mousedown',function(){
        mouseDrag = true;
    })
    model.addEventListener('mousemove',function(event){
        if(mouseDrag == true){
            currentMouse = event.offsetX/model.offsetWidth;
            model.children[0].setAttribute('src',`images/vr/${modelColor}/${Math.floor(59-(currentMouse*59))}.png`);
        }
    })
    model.addEventListener('mouseup',function(){
        mouseDrag = false;
    })
    model.addEventListener('mouseleave',function(){
        mouseDrag = false;
    })
}

//design event

let objectTop;
let designVideo = document.querySelectorAll('.design_video');
let designArticles = document.querySelectorAll('#design article');
function design(sct){
    designArticleAni(sct);
    designVideoPlay(sct);
}

function designVideoPlay(sct){
    designVideo.forEach(function(item){
        objectTop = item.offsetTop;
        if(objectTop-400 <= sct){
            item.children[0].play();
            item.classList.add('on');
        }else if(objectTop-400 > sct){
            item.children[0].pause();
            item.classList.remove('on');
        }else if(objectTop + 1000 < sct ){
            item.children[0].pause();
        }
    })
}

function designArticleAni(sct){
    designArticles.forEach(function(item){
        objectTop = item.offsetTop;
        if(objectTop-600 <= sct){
            item.classList.add('on');
        }else if(objectTop-600 > sct){
            item.classList.remove('on');
        }
    })
}


//safety event
let safetyImgs = document.querySelectorAll('.safety_list li');
let safetyImg = document.querySelector('.safety_list')
let safetyVideoBox = document.querySelector('.safety_video_box');
let safetyVideo = safetyVideoBox.querySelector('video');
let safetyText = safetyVideoBox.querySelectorAll('.safety_video_text li');
function safety(sct){
    safetyImgOn(sct)
}

function safetyImgOn(sct){
    objectTop = document.querySelector('#safety').offsetTop;
    if(sct >= objectTop-400){
        safetyImgs.forEach(function(item){
            item.classList.add('on');
        })
    }else{
        safetyImgs.forEach(function(item){
            item.classList.remove('on');
        })
    }
}

safetyVideoOn()

function safetyVideoOn(){
    safetyImg.addEventListener('click',function(event){
        event.preventDefault();
        keyNum = event.target.dataset.num;
        if(keyNum >= 0 && keyNum < 5){
            safetyVideo.setAttribute('src',`video/safety${keyNum}.mp4`);
            safetyVideo.play();
            safetyVideoBox.classList.add('on');
            safetyText.forEach(function(item){
                item.classList.remove('on');
            })
            safetyText[keyNum].classList.add('on');
            if(window.innerWidth < 768){
                window.scrollTo(0, objectTop);
            }
        }else{
            return;
        }
    }) 
}


safetyVideoOff()

function safetyVideoOff(){
    safetyVideoBox.addEventListener('click',function(){
        safetyVideoBox.classList.remove('on');
        safetyVideo.pause();
        safetyText.forEach(function(item){
            item.classList.remove('on');
        })
    })
}