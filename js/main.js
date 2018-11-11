const videoArray = Array.from(document.querySelectorAll('.shape'));
const btn = document.getElementById('btn');
const container = document.querySelector('.flex-container');

function changeClasses() {
    let classArray = videoArray.map((value) => value.className);
    videoArray.forEach((v, i, arr) => {
        if (i < arr.length - 1) {
            v.className = arr[++i].className;
        } else {
            v.className = classArray[0];
        }
    });
}

function playOnScroll() {
    $(window).scroll(function (e) {
        let offsetRange = $(window).height() / 3,
            offsetTop = $(window).scrollTop() + offsetRange;
        offsetBottom = offsetTop + offsetRange;
        $("video").each(function () {
            let y1 = $(this).offset().top;
            let y2 = offsetTop;
            if (y1 + $(this).outerHeight(true) < y2 || y1 > offsetBottom) {
                this.pause();
            } else {
                this.play();
            }
        });
    });
}

window.addEventListener('scroll', (e) => {
    playOnScroll();
});

btn.addEventListener('click', function (e) {
    let activeVideo = container.querySelector('video[autoplay]');
    if (activeVideo) {
        activeVideo.pause();
        activeVideo.attributes.removeNamedItem('autoplay');
        let figureItem = activeVideo.parentNode.parentNode;
        figureItem.nextElementSibling.querySelector('video').setAttribute('data-active', true);
        figureItem.nextElementSibling.querySelector('video').play();

    } else {
        let activeVideo = container.querySelector('video[data-active]');
        let nextVideo = activeVideo.parentNode.parentNode.nextElementSibling;
        if (nextVideo) {
            activeVideo.pause();
            activeVideo.attributes.removeNamedItem('data-active');
            let figureItem = activeVideo.parentNode.parentNode;
            figureItem.nextElementSibling.querySelector('video').setAttribute('data-active', true);
            figureItem.nextElementSibling.querySelector('video').play()
        } else {
            activeVideo.pause();
            let firstVideo = document.getElementById('rhombus-video');
            firstVideo.play();
            firstVideo.setAttribute('autoplay', true);
        }
    }
    changeClasses();
});
