function createImageCarouselItem(mediaItem, isActive = false) {
    const li = document.createElement('li')
    li.classList.add(
        'slide',
        'w-full',
        'flex',
        'justify-center',
        'items-center',
        'flex-shrink-0'
    )
    if (isActive) {
        li.dataset.active = true
    }

    const img = document.createElement('img')
    img.src = mediaItem?.url
    img.alt = mediaItem?.alt || 'Auction image'
    img.classList.add('w-auto', 'h-full', 'object-contain', 'mx-auto')

    li.appendChild(img)
    return li
}

export function initializeCarousel(media) {
    const slidesContainer = document.querySelector('[data-slides]')

    if (!slidesContainer) {
        console.error('Carousel slides container not found.')
        return
    }

    slidesContainer.innerHTML = ''

    media.forEach((mediaItem, index) => {
        const isActive = index === 0
        const carouselItem = createImageCarouselItem(mediaItem, isActive)
        slidesContainer.appendChild(carouselItem)
    })

    const buttons = document.querySelectorAll('[data-carousel-button]')

    if (media.length <= 1) {
        buttons.forEach((button) => {
            button.style.display = 'none'
        })
        return
    }

    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            const offset = button.dataset.carouselButton === 'next' ? 1 : -1
            const slides = button
                .closest('[data-carousel]')
                .querySelector('[data-slides]')

            const activeSlide = slides.querySelector('[data-active]')
            let newIndex = [...slides.children].indexOf(activeSlide) + offset
            if (newIndex < 0) newIndex = slides.children.length - 1
            if (newIndex >= slides.children.length) newIndex = 0

            slides.children[newIndex].dataset.active = true
            delete activeSlide.dataset.active
        })
    })
}
