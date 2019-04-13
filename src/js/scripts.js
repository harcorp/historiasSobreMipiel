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
        let id = $(this).data('audio');
        let $audio = $(`#audio-${id}`);
        if (e.type === 'mouseenter') {
            $audio[0].play();
        } else if (e.type === 'mouseleave') {
            $audio[0].pause();
            $audio[0].currentTime = 0;
        }
    });

    $('.video').on('click', function (e) {
        e.preventDefault();
        let $this = $(this);
        let id = $this.data('video');

        $('.videoContainer').each(function (index, element) {
            let $this = $(this);
            if ($this.data('video') === id) {
                $this.removeClass('oculta');
            }
        });
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

    $('.gallery-slick .close-button').on('click', function (e) {
        e.preventDefault();
        let $this = $(this);
        $this.parent().addClass('oculta');
        $this.parent().children('.gallery-slick-slick').slick('unslick');
    });
    $('.videoContainer').on('click', '.close-button', function (e) {
        e.preventDefault();
        let $this = $(this);
        $this.parent().addClass('oculta');
        let $vimeoWrap = $this.parent();
        $vimeoWrap.html($vimeoWrap.html());
    });
})(jQuery);

google.charts.load('current', {packages: ['corechart', 'bar']});
google.charts.setOnLoadCallback(drawBarColors);

function drawBarColors() {
    var data = google.visualization.arrayToDataTable([
        ['Año', 'Numero de Casos', { role: 'annotation' }],
        ['2015', 3, '0,8%'],
        ['2016', 3, '0,8%'],
        ['2017', 13, '5,2%'],
        ['2018 (1er semestre)', 8, '3,2%']
    ]);

    var options = {
        title: 'Número de Casos de Lepra en Cundinamarca',
        width: '80%',
        chartArea: {width: '60%'},
        colors: ['#f1b059'],
        titleTextStyle: {
            color: '#ffffff'
        },
        hAxis: {
            title: 'Porcentajes de Casos',
            minValue: 0,
            textStyle: {
                color: '#ffffff'
            },
            titleTextStyle: {
                color: '#ffffff'
            },
        },
        vAxis: {
            title: 'Año',
            textStyle: {
                color: '#ffffff'
            },
            titleTextStyle: {
                color: '#ffffff'
            },
        },
        annotations: {
            textStyle: {
                color: '#ffffff',
                bold: true
            }
        },
        backgroundColor: 'none',
        legend: {
            textStyle: {
                color: '#ffffff'
            },
            position: 'none'
        },
        animation:{
            duration: 5000,
            easing: 'out',
            startup: true
        },
    };
    var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}
