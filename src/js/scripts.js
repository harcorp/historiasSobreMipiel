(function ($) {

    let $columna = $('.columna');
    let $menu = $('.menu');
    let $submenu = $('.submenu');
    let $contenido = $('.contenido');
    $columna.on('click', function (e) {
        e.preventDefault();
        let $this = $(e.currentTarget);
        const id = $this.data('id');
        animateColumns(id);
    });

    function animateColumns(currentColumnId) {
        $columna.each(function (index, value) {
            index++;
            if (currentColumnId !== index) {
                let $this = $(value);
                $this.css({'transform': 'translate3d(0, -100%, 0)'});
                $menu.css({'pointer-events': 'none'});
            }
        });
        let $this = $(`.columna-${currentColumnId}`);
        $this.css({'left': '0'});
        $submenu.css('opacity', 1);
        $contenido.css('opacity', 1);
    }

    $('.audio').on('mouseenter mouseleave', function (e) {
        e.preventDefault();
        if (e.type === 'mouseenter') {

        } else if (e.type === 'mouseleave') {

        }
    });

    $('.video').on('mouseenter mouseleave', function (e) {
        e.preventDefault();
    });

    $('.cronicas').on('click', function (e) {
        let $this = $(e.currentTarget);
        let cronica = $this.data('cronica');
        $('.contenidoHtml').each(function (index, element) {
            let $this = $(this);
            if ($this.data('cronica') !== cronica) {
                $this.addClass('oculta');
            } else {
                $this.removeClass('oculta');
            }
        })
    });

    $('.galeria').on('click', function (e) {
        e.preventDefault();
        let $this = $(this);
        let id = $this.data('galeria');

        $('.gallery-slick').each(function (index, element) {
            let $this = $(this);
            if ($this.data('galeria') === id) {
                $this.children('.gallery-slick-slick').slick();
                $this.removeClass('oculta');
            }
        });
    });

    $('.close-button').on('click', function (e) {
        e.preventDefault();
        let $this = $(this);
        $this.parent().addClass('oculta');
        $this.parent().children('.gallery-slick-slick').slick('unslick');
    })
})(jQuery);
