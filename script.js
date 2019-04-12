(function() {
    var currentOpen;
    var endpoint = 'https://www.googleapis.com/customsearch/v1?cx=007266624843193050590:pgnzl3oz9ms&q=new%20york&key=AIzaSyCJl12QQJjjJjhK0Q0mTs6O-aEKZgCbvG8&searchType=image';
    fetch(endpoint)
    .then(function(response) {
        return response.json();
    })
    .then(function(response)  {
        var images = response.items;
        images = [].concat(images, images);
        var imagesHtml = images.map((img, id) => {
            return `<div data-index="${id}"  class="grid-item">
                <div class="image" style="background-image: url('${img.image.thumbnailLink}');"></div>
                <a class="title" href="${img.link}">
                    <span>${img.htmlTitle}</span>
                    <span>${img.displayLink}</span>
                </a>
            </div>`
        });

        document.querySelector('.container').innerHTML = imagesHtml.join('');
        return images;
    }).then(function(images) {
        var currentOpen;
        document.addEventListener('click', function(e) {
            if(e.target.matches('.grid-item .image')) {
                currentOpen = e.target.parentElement;
                openPreview(currentOpen, images[currentOpen.dataset.index].link)
            }
        })

        window.addEventListener('resize', function() {
            if (currentOpen) {
                openPreview(currentOpen, images[currentOpen.dataset.index].link)
            }
        })
    })

    var preview;

    function openPreview(element, imageSrc) {
        
        if (preview) {
            preview.remove();
        }
        var rightMostElement = getTheRightMostElement(element);
        console.log(rightMostElement.dataset.index);
        var currentOpen = element;
        preview = document.createElement('div');
        preview.classList.add('preview');
        preview.setAttribute('style', `background-image: url('${imageSrc}');`)
        rightMostElement.after(preview);
        preview.scrollIntoView({
            block: 'center',
            inline: 'nearest',
        })
    }

    function getTheRightMostElement(e) {
        if (e.nextSibling && window.innerWidth - e.offsetLeft > 300) {
            return e.nextSibling;
        } else {
            return e;
        }
    }
    
})()