$('input').focus(function () {
    $(this).data('placeholder', $(this).attr('placeholder'))
        .attr('placeholder', '');
}).blur(function () {
    $(this).attr('placeholder', $(this).data('placeholder'));
});

let lazyLoadInstance = new LazyLoad({
    elements_selector: ".lazy"
});

let reviewSlider = $('#review').lightSlider({
    item: 1,
    loop: true,
    slideMove: 1,
    pager: false,
    controls: false,
    mode: 'fade',
    auto: true,
    speed: 800,
    pause: 3500,
    enableDrag: false
});

let productSlider;


$('#prevslide').click(function () {
    reviewSlider.goToPrevSlide();
});
$('#nextslide').click(function () {
    reviewSlider.goToNextSlide();
});

$('#prevprod').click(function () {
    productSlider.goToPrevSlide();
});
$('#nextprod').click(function () {
    productSlider.goToNextSlide();
});

let nav = $('#nav'),
    sticky = nav.offset().top;

function navScroll() {
    if (window.pageYOffset > sticky) {
        nav.addClass('sticky');
    } else {
        nav.removeClass('sticky');
    }
}
$(window).scroll(function () {
    navScroll();
});

$(document).ready(function () {
    getProducts();

    $('#products_list').on('click', 'a.to-cart', function (e) {
        e.preventDefault();
        let current = parseFloat($('#cart-qty').text());
        current++;
        $('#cart-qty').text(current);
    });

    $('.nav-burger').click(function (e) {
        e.preventDefault();
        $('.nav-burger, #nav').toggleClass('active_on_touch');
    });

    $('.main-nav a').click(function (e) {
        e.preventDefault();
        $('.nav-burger').click();
    });

    $(window).on("load", function () {
        $("a[rel='m_PageScroll2id']").mPageScroll2id({
            scrollSpeed: 800,
            scrollingEasing: "easeInOutQuint",
            autoScrollSpeed: false,
            offset: "#nav",
            highlightClass: "active"
        });
    });

    $('#search').click(function (e) {
        e.preventDefault();
        Swal.fire({
            showConfirmButton: false,
            showCloseButton: true,
            html: `
                <form method="GET" id="search_form">
                    <input type="text" placeholder="Enter your search query...">
                    <button type="submit"><i class="icon-search"></i></button>
                </form>
            `,
            showClass: {
                'popup': 'animate__animated animate__fadeIn animate__faster'
            },
            hideClass: {
                'popup': 'animate__animated animate__fadeOut animate__faster'
            }
        });
    });

    $('#login').click(function (e) {
        e.preventDefault();
        Swal.fire({
            showConfirmButton: false,
            html: `
                <form method="POST" id="login_form">
                    <input type="email" placeholder="Email">
                    <input type="password" placeholder="Password">
                    <button type="submit">Sign In</button>
                </form>
                <a href="javascript:void(0)" target="_blank" class="signup">Not a member yet? Click here to sign up.</a>
            `,
            showClass: {
                'popup': 'animate__animated animate__fadeIn animate__faster'
            },
            hideClass: {
                'popup': 'animate__animated animate__fadeOut animate__faster'
            }
        });


    });

    $('#tabs').on('click', 'li:not(.active)', function () {
        $(this)
            .addClass('active').siblings().removeClass('active')
            .closest('div.tabs_wrap').find('div.content_wrap').removeClass('current animate__animated animate__fadeIn').eq($(this).index()).addClass('current animate__animated animate__fadeIn');
    });

    let $titleTab = $('.title_tab');
    $('.faq_item:eq(1)').find('.title_tab').addClass('active').next().stop().slideDown(300);
    $('.faq_item:eq(1)').find('.answer').find('p').addClass('show');
    $titleTab.on('click', function (e) {
        e.preventDefault();
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $(this).next().stop().slideUp(500);
            $(this).next().find('p').removeClass('show');
        } else {
            $(this).addClass('active');
            $(this).next().stop().slideDown(500);
            $(this).parent().siblings().children('.title_tab').removeClass('active');
            $(this).parent().siblings().children('.answer').slideUp(500);
            $(this).parent().siblings().children('.answer').find('p').removeClass('show');
            $(this).next().find('p').addClass('show');
        }
    });

});

function getProducts() {
    $.ajax({
        type: "GET",
        url: "data/products.json",
        dataType: "json",
        success: function (json) {
            let html = '';
            for (let key in json) {
                html += `
                <li>
                    <div class="item_wrap">
                        <div class="rating">
                            <i class="icon-star"></i>
                            <i class="icon-star"></i>
                            <i class="icon-star"></i>
                            <i class="icon-star"></i>
                            <i class="icon-star"></i>
                        </div>
                        <a href="javascript:void(0)" class="prod_itemlink">${json[key].name}</a>
                        <div class="img_wrap">
                            <img alt="product" src="./img/${json[key].img}">
                        </div>
                    </div>    
                    <div class="action">
                        <p class="price">${json[key].price}</p>
                        <a href="javascript:void(0)" class="to-cart">
                            <span class="btnline"></span>
                            Shop
                        </a>
                    </div>
                </li>
                `
            };
            $('#products_list').html(html);
            productSlider = $('#products_list').lightSlider({
                item: 3,
                loop: true,
                slideMove: 1,
                pager: false,
                controls: false,
                slideMargin: 20,
                enableDrag: false,
                responsive: [
                    {
                        breakpoint: 1025,
                        settings: {
                            item: 2,
                            slideMargin: 20
                        },
                        breakpoint: 769,
                        settings: {
                            item: 2,
                            slideMargin: 15
                        },
                        breakpoint: 571,
                        settings: {
                            item: 1,
                            slideMargin: 1
                        }
                    }
                ]
            });
        }
    });
}
