//sct top 이벤트 리스너
let count;
let reverse;
let sctTop;
let sectionTop=0;

window.addEventListener('scroll',function(){
    sctTop = window.pageYOffset;
    let check = document.querySelector('.sctTop');
    check.innerHTML = sctTop;
    visual_img(sctTop)
    perfomance(sctTop)
    charging(sctTop, 1, 1.23)
    v2l(sctTop)
    vr(sctTop, 1)
})

function counter(sct, minNum, length){
    return (sct-minNum)*(1/length)
}
function counterReverse(sct, maxnum, length){
    return (maxnum-sct)*(1/length)
}
function newCounter(sct, min, max){
    count =  (sct-sectionTop*min)*(1/((sectionTop*max)-(sectionTop*min)))
    reverse = (sectionTop*(max)-sct)*(1/((sectionTop*max)-(sectionTop*min)))
}

// visual event

function visual_img(sct){
    img = document.querySelector('.visual_content_main_img');
    mainText = document.querySelector('.visual_content_text_main')
    subText = document.querySelector('.visual_content_text_sub')
    subTextP = subText.querySelectorAll('p');
    i = Math.floor(sct/10);
    if(i <= 139){
       img.setAttribute('src',`images/intro/ioniq_${i}.jpg`);
    }
    if(sct >= 1200 && sct <= 1400){
        count = counter(sct, 1200, 200)
        reverse = counterReverse(sct, 1400, 200)
        mainText.style.marginTop = `${reverse*200}px`
        mainText.style.opacity = `${count}`
    }
    if(sct >= 1400 && sct <= 1600){
        count = counter(sct, 1400, 200)
        reverse = counterReverse(sct, 1600, 200)
        subText.style.marginTop = `${reverse*200}px`
        subText.style.opacity = `${count}`
    }
    if(sct >= 1600 && sct <= 1800){
        subTextP.forEach(function(item){
            count = counter(sct, 1600, 200)
            reverse = counterReverse(sct, 1800, 200)
            item.style.marginTop = `${reverse*200+10}px`
            item.style.opacity = `${count}`
        })
    }
}
        
//perfomance event
function perfomance(sct){
    sectionTop = document.querySelector('#perfomance').offsetTop
    perfomanceVideo(sct,0.9 ,1.3)
    perfomanceText(sct,1.2 ,1.3)
    perfomanceBottom(sct, 1.4, 1.5)
}


function perfomanceVideo(sct, min, max){
    video = document.querySelector('.perfomance_content_main');
    if(sct >= sectionTop*(min) && sct <= sectionTop*(max)){
        newCounter(sct, min, max)
        video.querySelector('.perfomance_content_video').play()
        video.style.transform =`scale(${reverse+0.4})`
        video.style.left = `${-count*12.5}%`
        video.style.top = `${-count*15}vh`
    }else if(sct < sectionTop*(min) || sct > sectionTop*(2.3)){
        video.querySelector('.perfomance_content_video').pause();
    }   
}

function perfomanceText(sct, min, max){
    text = document.querySelectorAll('.perfomance_content_text li');
    newCounter(sct, min, max)
    if(sct >= sectionTop*min && sct <= sectionTop*max){  
        for(let i = 0; i < text.length; i++){
            text[i].style.transform = `translateY(${-count*200}%)`
            text[i].style.opacity = `${count}`
        }
    }else if(sct < sectionTop*min){
        for(let i = 0; i < text.length; i++){
            text[i].style.transform = `translateY(0)`
            text[i].style.opacity = 0
        }
    }
}

function perfomanceBottom(sct, min, max){
    bottomText = document.querySelector('.perfomance_content_bottom');
    newCounter(sct, min, 1.5)
    if(sct >= sectionTop*min && sct <= sectionTop*1.5){
        bottomText.style.transform = `translateY(${-count*100}%)`
        bottomText.style.opacity = `${count}`
    }else if (sct < sectionTop*min){
        bottomText.style.opacity = 0
    }
}

//charging event

let chargeCount = 0;
let timer;
let chargingText = document.querySelector('.charging_content_text')
function charging(sct, min, max){
    sectionTop = document.querySelector('#charging').offsetTop;
    video = document.querySelector('.charging_content_video video')
    if(sct >= sectionTop*min && sct < sectionTop*max){
        video.play()
        clearInterval(timer)
        countNum()
        chargingText.classList.add('on')
    }else if(sct>=6800 || sct < sectionTop*min){
        video.pause;
        clearInterval(timer)
        chargingText.classList.remove('on')
        chargeCount = 0;
    }
}
function countNum(){
    timer = setInterval(function(){
        chargeCount++
        if(chargeCount >= 0 && chargeCount < 10){
            chargingText.querySelector('span').innerHTML=`0${chargeCount}%`
        }else if(chargeCount >=10 && chargeCount<=80){
            chargingText.querySelector('span').innerHTML=`${chargeCount}%`
        }
        else if(chargeCount > 80){
            return
        }
    },100);
}

//v2l event
function v2l(sct){    
    sectionTop = document.querySelector('#v2l').offsetTop;
    bg = document.querySelector('.v2l_content_main')
    textFigure = bg.querySelector('.v2l_text')
    videoFigure = bg.querySelector('.v2l_main_video')
    textBox = bg.querySelector('.v2l_content_text_box')

    v2lBackground(sct, 1, 1.08)
    v2lFigure(sct, 1.1)
    v2lBigText(sct, 1.23, 1.38)
    v2lVideo(sct, 1.4, 1.5)
    v2lTextBox(sct, 1.5, 1.65)
}


function v2lBackground(sct, min, max){
    if(sct >= sectionTop*min && sct < sectionTop*max){
        newCounter(sct, min, max)
        bg.style.width = `${count*100}vw`
    }else if(sct > sectionTop*max){
        bg.style.width ='100vw'
    }else if(sct < sectionTop*min){
        bg.style.width = `0vw`
    }
}

function v2lFigure(sct, min){
    number = ['first', 'second', 'third', 'fourth'];
    imgNum = [31, 56, 70, 89]
    figure = document.querySelectorAll('.img_figure');
    for(let i=0; i <= 3; i++){
        if(sct >= sectionTop*(min+0.045*i) && sct < sectionTop*(min+(0.045*(i+1)))){
            newCounter(sct, min+0.045*i, min+(0.045*(i+1)))
            figure[i].style.display = 'block';
            figure[i].children[0].setAttribute('src',`images/v2l/v2l_${number[i]}${Math.floor(count*imgNum[i])}.jpg`)
        }else if(sct < sectionTop*(min+0.045*i)){
            figure[i].style.display = 'none';
        }
    }
}

function v2lBigText(sct, min, max){
    if(sct >= sectionTop*min && sct < sectionTop*max){
        newCounter(sct, min, max)
        textFigure.style.display = `block`;
        textFigure.style.transform = `translate(-50%,-50%) perspective(400px) translateZ(${count*100}px) scale(${(reverse*100)})`
    }else if(sct > sectionTop*min){
        textFigure.style.transform = `translate(-50%,-50%) perspective(400px) translateZ(100px) scale(1)`
    }else if(sct < sectionTop*max){
        textFigure.style.display='none'
    }
}

function v2lVideo(sct, min, max){
    if(sct >= sectionTop*min && sct < sectionTop*max){
        newCounter(sct, min, max)
        videoFigure.style.display = 'block';
        videoFigure.style.transform = `translate(-50%,-50%) scale(${count})`
        videoFigure.children[0].play()
    }else if(sct > sectionTop*max){
        videoFigure.style.transform = `translate(-50%,-50%) scale(1)`
    }else if(sct < sectionTop*min){
        videoFigure.style.display = 'none';
        videoFigure.children[0].pause()
    }else if(sct > sectionTop*1.65){
        videoFigure.children[0].pause()
    }
}

function v2lTextBox(sct, min, max){
    if(sct>= sectionTop*min && sct < sectionTop*max){
        newCounter(sct, min, max)
        textBox.style.display = 'flex';
        textBox.style.top = `${(reverse*100)}%`
    }else if(sct > sectionTop*max){
        textBox.style.top = `-100%`
    }else if(sct < sectionTop*min){
        textBox.style.display = 'none'
    }
}

//vr event
let model = document.querySelector('.vr_model');
let vrBg = document.querySelector('.vr_contents_main');
let mouseDrag = false;
let modelColor = vrBg.dataset.color
class Color{
    constructor(bgColor, colorName, startNum, textColor){
        this.bgColor = bgColor;    
        this.colorName = colorName;
        this.startNum = startNum;
        this.textColor = textColor;
    }
    colorChange(){
        vrBg.style.background = this.bgColor
        vrBg.dataset.color = this.colorName
        modelColor = vrBg.dataset.color
        vrBg.children[0].style.color = this.textColor
        model.children[0].setAttribute('src',`images/vr/${this.colorName}/${this.startNum}.png`)
    }
}
let color1 = new Color('#eee','atlas_white',0,'#B1B2B8')
let color2 = new Color('#aaa','olive_green', 57, '#4B4947')
let color3 = new Color('#333','phantom_Black', 54, '#1b1b1b')
let color4 = new Color('teal','till_green', 51,'#293437')
let color5 = new Color('skyblue','lucid_blue', 48,'#3F5066')
let color6 = new Color('beige','gold_matt', 45, '#888684')
let colors = [color1,color2,color3,color4,color5,color6]

function vr(sct, min){
    sectionTop = document.querySelector('#vr').offsetTop;
    console.log(sectionTop)
    for(let i =0; i<=colors.length; i++){
        if(sct>= (min+0.018*i)*sectionTop && sct < (min+0.018*(i+1))*sectionTop){
            colors[i].colorChange()
        }
    }
}

vrRotate()
function vrRotate(){
    model.addEventListener('mousedown',function(){
        mouseDrag = true
    })
    model.addEventListener('mousemove',function(event){
        if(mouseDrag == true){
            currentMouse = event.offsetX/model.offsetWidth;
            model.children[0].setAttribute('src',`images/vr/${modelColor}/${Math.floor(59-(currentMouse*59))}.png`)
        }
    })
    model.addEventListener('mouseup',function(){
        mouseDrag = false
    })
    model.addEventListener('mouseleave',function(){
        mouseDrag = false
    })
}

