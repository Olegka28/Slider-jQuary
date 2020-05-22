'use strict';

//++ 1 Должен содержать стрелочки влево/вправо по клику на которые показываем предыдущий/следующий слайд соответственно.
//++ 2 Должен содержать пагинацию (точки или цифры по нажатию на которые изменяется текущий слайд). Пагинация генерируется с помощью js, в зависимости от количества слайдов.
//++ 3 Переход должен анимироваться fadeIn/fadeOut или slide.

// Сделать минимум 2-3 дополнительных задания на выбор. Звездочка обозначает сложность задания.

//++ (*) Вместо fadeIn/Out сделать анимацию slideIn/slideOut
//++ (*) Несколько слайдеров на странице должны работать вместе корректно.
//++ (*) Реализовать возможность автоматической смены слайдов по таймауту. Учесть что таймер нужно обнулять после пользовательского выбора слайда.
//++ (*) Организовать слайдер как функцию, которая принимает html элемент слайдера и список параметров (показывать ли стрелки, пагинацию, скорость анимации...).
//++ (**) По клику на слайд должна открываться модалка с содержимым слайда.
//++ (**) Реализовать возможно бесконечной смены слайдов (если мы дошли до конца слайдера следующий клик на правую стрелочку покажет первый слайд) и тоже самое если нажимаем на левую стрелку когда находимся на первом элементе должны прыгнуть в конец слайдера.
// (***) Слайдер внутри слайдера должен работать корректно.

function createSlider ( {
    selector, 
    autoPlay = false, 
    autoPlayTime = 4000, 
    timeAnimation = 700 
} ) {
    const slider = selector[0];
    const imgItems = selector.children();
    const currentImg = imgItems.length;
    let currentSlide = 0;

    let timerId = null;

    if(autoPlay){
        autoPlayTimer();
    }

    function autoPlayTimer () {
        if (timerId) {
            clearInterval(timerId);
        }
        timerId = setInterval(() => {
            slideMove(currentSlide + 1);
        }, autoPlayTime)
    }

    imgItems
        .addClass('slider_item')
    
    const firsImg = imgItems[0];
    firsImg.classList.add('slider_item_active')

    selector
        .append('<a href="#" class="slider_arrow slider_arrow_left"></a>')
        .append('<div class="slider_slides"></div>')
        .append('<div class="slider_dots"></div>')
        .append('<a href="#" class="slider_arrow slider_arrow_right"></a>')


    const sliderSlides = selector.find('.slider_slides');
    
    sliderSlides
        .append(imgItems);

    const sliderWidth = slider.clientWidth
    const trackWidth = sliderWidth * currentImg;
   
    sliderSlides.css({
        width: trackWidth
    })

     
    imgItems
        .each((index, value) => value.style.width = sliderWidth + 'px');

    const sliderArrowRight = selector.find('.slider_arrow_right');
    const sliderArrowLeft = selector.find('.slider_arrow_left');
    

    sliderArrowRight
        .attr('data-slide-to', 1);

    sliderArrowLeft
        .attr('data-slide-to', -1);

    selector  
        .on('click','.slider_arrow, .slider_dot', function(event){
            event.preventDefault();

            const sliderArrow = event.target.closest('.slider_arrow');
            const dotsSlider = event.target.closest('.slider_dot');

            if(sliderArrow) {
                const sliderTo = Number(sliderArrow.getAttribute('data-slide-to'));
                slideMove(currentSlide + sliderTo)
                
            }
            if(dotsSlider) {
                const dotsTo = Number(dotsSlider.getAttribute('data-slide-index'))
                slideMove(dotsTo)
            }
        })

    const dot = selector.children('.slider_dots');
    
    imgItems
        .prependTo(sliderSlides)
        .each((i) => {
            if (!i) {
                dot.append(`<a data-slide-index="${i}" href="#" class="slider_dot slider_dot_active"></a>`)
            } else {
                dot.append(`<a data-slide-index="${i}" href="#" class="slider_dot"></a>`)
            }
        })

function slideMove (current) {
    if(current < 0) {
        current = currentImg - 1
    } else if (current >= currentImg) {
        current = 0
    }
    currentSlide = current;

    const translate = current * sliderWidth;
    sliderSlides.css({
        'transform': `translateX(-${translate}px)`
    });
    updateActiveElement(currentSlide);
    autoPlayTimer();
}

function updateActiveElement (active) {

    let dots = selector.find('.slider_dots').children();
    let imgs = selector.find('.slider_slides').children();
console.log(dots)
    imgs.each((index, item) => {
        if (index === active) {
            item.classList.add('slider_item_active')
        } 
        else {
            item.classList.remove('slider_item_active')
        }
    })

    dots.each((index, child) => {
        if (index === active) {
            child.classList.add('slider_dot_active')
        } 
        else {
            child.classList.remove('slider_dot_active')
        }
    })
}

selector.find('.slider_item').on('click', modal);

function modal () {
    
    let modal = $(".modal");
    let modalImg = $('#modalImg')
    let captionText = modal.find(".caption");
    let activeImg = selector.find('.slider_item_active');

        modal.css({
            display: 'block',
    });

    if (activeImg.hasClass('slider_item_active')) {
        modalImg.attr('src', activeImg.attr('src'));
        captionText.text(activeImg.attr('alt'));
    }
}
       
}

const sliders = $('.slider');

each(sliders, (slider) => {
    createSlider({
        selector: $(slider),
        autoPlay: true,
        autoPlayTime: 3000,
        timeAnimation: 700,
    })
})

function each (collection, cb) {
    for (let index = 0; index < collection.length; index++){
        const element = collection[index]
        cb(element, index)
    }
}