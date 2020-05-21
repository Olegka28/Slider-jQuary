'use strict';

//++ 1 Должен содержать стрелочки влево/вправо по клику на которые показываем предыдущий/следующий слайд соответственно.
//++ 2 Должен содержать пагинацию (точки или цифры по нажатию на которые изменяется текущий слайд). Пагинация генерируется с помощью js, в зависимости от количества слайдов.
//++ 3 Переход должен анимироваться fadeIn/fadeOut или slide.

// Сделать минимум 2-3 дополнительных задания на выбор. Звездочка обозначает сложность задания.

//++ (*) Вместо fadeIn/Out сделать анимацию slideIn/slideOut
// (*) Несколько слайдеров на странице должны работать вместе корректно.
//++ (*) Реализовать возможность автоматической смены слайдов по таймауту. Учесть что таймер нужно обнулять после пользовательского выбора слайда.
//++ (*) Организовать слайдер как функцию, которая принимает html элемент слайдера и список параметров (показывать ли стрелки, пагинацию, скорость анимации...).
//++ (**) По клику на слайд должна открываться модалка с содержимым слайда.
//++ (**) Реализовать возможно бесконечной смены слайдов (если мы дошли до конца слайдера следующий клик на правую стрелочку покажет первый слайд) и тоже самое если нажимаем на левую стрелку когда находимся на первом элементе должны прыгнуть в конец слайдера.
// (***) Слайдер внутри слайдера должен работать корректно.

function slider(selector) {
    let slider = $(selector);
    let imgs = slider.children();

    slider
        .addClass('slider')
        .append('<a href="#" class="slider_arrow slider_arrow_left"></a>').append('<div class="slider_slides"></div>')
        .append('<div class="slider_dots"></div>')
        .append('<a href="#" class="slider_arrow slider_arrow_right"></a>')
        .on('click', '.slider_arrow, .slider_dot', function slideTo (event) {
            event.preventDefault();
                
            let a = $(this);
            let active = slider.find('.slider_item_active');
            let current = active.index();
            let next = current;
            let left = false;

            // console.log(current);
            // console.log(next);

            if (a.hasClass('slider_arrow_left')) {
                setInterval(() => current - 1 >= 0 ? current - 1 : imgs.length - 1, 1000)
                next = current - 1 >= 0 ? current - 1 : imgs.length - 1;
                left = true;
            } else if (a.hasClass('slider_arrow_right')) {
                next = (current + 1) % imgs.length;
            } else {
                next = a.index();
                left = next < current ? true : false;
            }
            
            if(current === next) {
                return
            }

            slider.append('<div class="slider_temp"></div>');

            let temp = slider.find(".slider_temp");
            let i = current;
            let j = 0;
            let animate = {};

            while (true) {
                let img = imgs
                    .eq(i)
                    .clone()
                    .css({
                        display: 'inline-block',
                        width: slider.css('width')
                    });

                    if (left) {
                        img.prependTo(temp);
                    } else {
                        img.appendTo(temp);
                    }

                    if (i === next) {
                        break;
                    }

                    if(left) {
                        i = i - 1 >= 0 ? i - 1 : imgs.length - 1;
                        j--;
                    } else {
                        i = (i + 1) % imgs.length;
                        j++;
                    }
            }

            temp.css({
                width: (Math.abs(j) + 1) * 100 + '%',
                position: 'absolute',
                top: 0
            });

            if (left) {
                temp.css('left', j * 100 + '%');
                animate.left = 0;
            } else {
                temp.css('left', 0);
                animate.left = j * 100 + '%';
            }

            active.removeClass('slider_item_active');
            slider
                .find('.slider_dot')
                .removeClass('slider_dot_active')

            imgs
                .eq(next)
                .addClass('slider_item_active')

            slider
                .find('.slider_dot')
                .eq(next)
                .addClass('slider_dot_active')


            temp.animate(animate, 500, function() {
                temp.remove();
            })
        });
    
    let slides = slider.children('.slider_slides');
    let dots = slider.children('.slider_dots');

    imgs
        .prependTo(slides)
        .each((i) => {
            if (!i) {
                dots.append('<a href="#" class="slider_dot slider_dot_active"></a>')
            } else {
                dots.append('<a href="#" class="slider_dot"></a>')
            }
        })
        .addClass('slider_item')
        .eq(0)
        .addClass('slider_item_active');
        
        $('.slider_item').on('click', modal);

        function modal () {

        let modal = $(".modal");
        let modalImg = $('#modalImg')
        let captionText = modal.find(".caption");
        let activeImg = $('.slider_item_active')

            modal.css({
                display: 'block',
            });
            if (activeImg.hasClass('slider_item_active')) {
                modalImg.attr('src', activeImg.attr('src'));
                captionText.text(activeImg.attr('alt'));
            }
    }
}


slider('#slider');


// Второй слайдер
// slider('#slider2');
