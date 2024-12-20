import { getPost, getPosts } from '../../api/post/read.js'
import { updatePost } from '../../api/post/update.js'

function getPostIdFromUrl() {
    const params = new URLSearchParams(window.location.search)
    return params.get('id')
}

const form = document.querySelector('#editListing')
const mediaContainer = document.querySelector('#media-container')

if (form) {
    const postId = getPostIdFromUrl()

    if (!postId) {
        console.error('Post ID is missing from the URL.')
    }

    async function loadPostData() {
        try {
            const post = await getPost(postId)

            if (form.title) form.title.value = post.title || ''
            if (form.description)
                form.description.value = post.description || ''

            if (form.endsAt) {
                const endsAtDate = new Date(post.endsAt)
                form.endsAt.value = endsAtDate.toISOString().substring(0, 16)
            }

            mediaContainer.innerHTML = ''

            const inputSection = document.createElement('div')
            inputSection.classList.add('flex', 'flex-col', 'space-y-4')

            if (
                post.media &&
                Array.isArray(post.media) &&
                post.media.length > 0
            ) {
                post.media.forEach((mediaItem, index) => {
                    const mediaInput = document.createElement('input')
                    mediaInput.type = 'url'
                    mediaInput.name = 'mediaURL'
                    mediaInput.placeholder = 'Image URL'
                    mediaInput.value = mediaItem.url || ''
                    mediaInput.classList.add(
                        'bg-transparent',
                        'outline',
                        'outline-1',
                        'p-1',
                        'outline-white/45',
                        'font-p'
                    )
                    mediaContainer.appendChild(mediaInput)

                    inputSection.appendChild(mediaInput)
                })
            }

            const emptyInput = document.createElement('input')
            emptyInput.type = 'url'
            emptyInput.name = 'mediaURL'
            emptyInput.placeholder = 'Image URL'
            mediaContainer.appendChild(emptyInput)
            emptyInput.classList.add(
                'bg-transparent',
                'outline',
                'outline-1',
                'p-1',
                'outline-white/45',
                'font-p'
            )

            inputSection.appendChild(emptyInput)

            mediaContainer.appendChild(inputSection)
            mediaContainer.classList.add('flex', 'flex-col', 'space-y-4')
        } catch (error) {
            console.error('Failed to fetch post data:', error)
        }
    }

    loadPostData()

    mediaContainer.addEventListener('input', (event) => {
        const allInputs = mediaContainer.querySelectorAll(
            "input[name='mediaURL']"
        )
        const lastInput = allInputs[allInputs.length - 1]

        if (
            event.target === lastInput &&
            allInputs.length < 8 &&
            lastInput.value.trim() !== ''
        ) {
            const newInput = document.createElement('input')
            newInput.type = 'url'
            newInput.name = 'mediaURL'
            newInput.placeholder = 'Image URL'
            mediaContainer.appendChild(newInput)
        }

        const emptyInputs = Array.from(allInputs).filter(
            (input) => input.value.trim() === ''
        )
        if (emptyInputs.length > 0 && allInputs.length > 1) {
            const lastEmptyInput = emptyInputs[emptyInputs.length - 1]
            if (lastEmptyInput === lastInput) {
                mediaContainer.removeChild(lastEmptyInput)
            }
        }
    })

    form.addEventListener('submit', (event) => {
        event.preventDefault()

        const formData = new FormData(form)
        const formValues = Object.fromEntries(formData.entries())
        const endsAt = new Date(formValues.endsAt).toISOString()

        const mediaInputs = mediaContainer.querySelectorAll(
            "input[name='mediaURL']"
        )
        const media = Array.from(mediaInputs)
            .filter((input) => input.value.trim() !== '')
            .map((input) => ({
                url: input.value.trim(),
                alt: formValues.mediaALT || '',
            }))

        const updatedPost = {
            id: postId,
            title: formValues.title,
            description: formValues.description,
            endsAt: endsAt,
            media: media,
        }

        updatePost(updatedPost)
            .then((response) => {
                console.log('Post updated successfully:', response)
                window.location.href = '/biddaroo/index.html'
            })
            .catch((error) => {
                console.error('Error updating post:', error)
            })
    })
} else {
    console.error('Edit post form not found')
}

async function displayActiveAuctions(auctionContainer) {
    const postContainer = document.getElementById('auctionContainer')
    if (!postContainer) {
        console.error(`Container with id "auctionContainer" not found.`)
        return
    }

    try {
        const posts = await getPosts(1, 10)

        if (!posts || !posts.data) {
            console.error('Unexpected posts structure:', posts)
            return
        }

        const activePostsWithImages = posts.data.filter((post) => {
            const endsAtDate = new Date(post.endsAt)
            return (
                endsAtDate > new Date() &&
                post.media?.length > 0 &&
                post.media[0]?.url
            )
        })

        if (activePostsWithImages.length < 2) {
            console.log('Not enough posts with images found.')
            postContainer.innerHTML = '<p>No active auctions available.</p>'
            return
        }

        activePostsWithImages.slice(0, 2).forEach((post) => {
            const postElement = document.createElement('div')
            postElement.classList.add('post')

            const title = document.createElement('h2')
            title.textContent = post.title
            title.classList.add('font-h2', 'cursor-pointer', 'mb-4')
            postElement.appendChild(title)
            title.addEventListener('click', () => {
                const targetUrl = `/biddaroo/post/index.html?id=${post.id}`
                window.location.href = targetUrl
            })
            title.classList.add('font-h2')

            const img = document.createElement('img')
            img.src = post.media[0].url
            img.alt = `Image of ${post.title}`
            img.classList.add(
                'w-80',
                'hover:cursor-pointer',
                'hover:opacity-60'
            )
            postElement.appendChild(img)
            img.addEventListener('click', () => {
                const targetUrl = `/biddaroo/post/index.html?id=${post.id}`
                window.location.href = targetUrl
            })

            postContainer.appendChild(postElement)
        })
    } catch (error) {
        console.error('Error fetching or displaying posts:', error)
    }
}

displayActiveAuctions()
