import { isLoggedIn, load } from '../../api/auth/key.js'
import { getPosts } from '../../api/post/read.js'

// For showing either login or register on homepage:
document.addEventListener('DOMContentLoaded', function () {
    const formLogin = document.getElementById('loginForm')
    const formCreateAcc = document.getElementById('registerForm')
    const loggedOutHeading = document.getElementById('loggedOutHeading')
    const outlineForm = document.getElementById('outlineForm')

    const loggedInProfileButton = document.getElementById(
        'loggedInProfileButton'
    )
    const loggedInCreateButton = document.getElementById('loggedInCreateButton')
    const loggedInHeading = document.getElementById('loggedInHeading')

    if (isLoggedIn()) {
        hide(formLogin)
        hide(formCreateAcc)
        hide(loggedOutHeading)
        hide(outlineForm)

        show(loggedInProfileButton)
        show(loggedInCreateButton)
        show(loggedInHeading)
    } else {
        document.addEventListener('click', function (e) {
            if (e.target.id === 'linkRegisterForm') {
                e.preventDefault()
                toggleForms(formLogin, formCreateAcc)
            } else if (e.target.id === 'linkLogin') {
                e.preventDefault()
                toggleForms(formCreateAcc, formLogin)
            }
        })
    }

    function toggleForms(formToHide, formToShow) {
        hide(formToHide)
        show(formToShow)
    }

    function hide(elem) {
        elem.classList.add('form--hidden')
        elem.classList.remove('form--unhidden')
    }

    function show(elem) {
        elem.classList.add('form--unhidden')
        elem.classList.remove('form--hidden')
    }
})

let currentIndex = 0
const POSTS_PER_PAGE = 12
let allActivePosts = []
let sortedPosts = []

async function loadPosts() {
    const postContainer = document.getElementById('post-container')
    const searchBar = document.getElementById('searchInput')
    const loadMoreButton = document.getElementById('load-more')

    await fetchAllPosts()

    if (allActivePosts.length > 0) {
        sortedPosts = allActivePosts.sort(
            (a, b) => new Date(a.endsAt) - new Date(b.endsAt)
        )
        renderPosts(sortedPosts.slice(0, POSTS_PER_PAGE), postContainer)
        currentIndex = POSTS_PER_PAGE

        searchBar.addEventListener('input', (event) => {
            const searchTerm = event.target.value.toLowerCase()
            const filteredPosts = sortedPosts.filter(
                (post) =>
                    post.title.toLowerCase().includes(searchTerm) ||
                    (post.seller?.name &&
                        post.seller.name.toLowerCase().includes(searchTerm))
            )

            postContainer.innerHTML = ''
            renderPosts(filteredPosts.slice(0, POSTS_PER_PAGE), postContainer)
            currentIndex = POSTS_PER_PAGE

            if (filteredPosts.length > POSTS_PER_PAGE) {
                loadMoreButton.disabled = false
                loadMoreButton.innerText = 'Load More'
            } else {
                loadMoreButton.disabled = true
                loadMoreButton.innerText = 'No more posts available'
            }
        })

        loadMoreButton.addEventListener('click', () => {
            loadNextPosts(sortedPosts, postContainer)
        })
    } else {
        postContainer.innerHTML = '<p>No active posts found.</p>'
        postContainer.classList.add('font-p')
    }
}

async function fetchAllPosts() {
    let page = 1
    let hasMore = true

    while (hasMore) {
        const posts = await getPosts(page, 50)
        const postList = posts.data || posts

        if (postList.length === 0) {
            hasMore = false
        } else {
            allActivePosts = [
                ...allActivePosts,
                ...postList.filter(
                    (post) => new Date(post.endsAt) > new Date()
                ),
            ]
            page++
        }
    }
}

function renderPosts(posts, container) {
    if (posts.length > 0) {
        posts.forEach((post) => {
            const postElement = postTemplate(post)
            container.appendChild(postElement)
        })
    } else {
        container.innerHTML = '<p>No posts match your search.</p>'
    }
    container.classList.add('font-p')
}

function loadNextPosts(sortedPosts, postContainer) {
    const nextPosts = sortedPosts.slice(
        currentIndex,
        currentIndex + POSTS_PER_PAGE
    )

    if (nextPosts.length > 0) {
        renderPosts(nextPosts, postContainer)
        currentIndex += POSTS_PER_PAGE
    } else {
        const loadMoreButton = document.getElementById('load-more')
        loadMoreButton.disabled = true
        loadMoreButton.innerText = 'No more posts available'
        loadMoreButton.classList.add('font-p')
    }
}

document.addEventListener('DOMContentLoaded', loadPosts)

export function postTemplate(postData) {
    const post = document.createElement('div')
    post.classList.add('post')

    if (postData.media && postData.media.length > 0) {
        const postImage = document.createElement('img')
        postImage.setAttribute('src', postData.media[0].url)
        postImage.alt = `Image from ${postData.title}`
        postImage.classList.add('w-[40rem]', 'h-[30rem]', 'object-cover')

        postImage.onerror = function () {
            console.warn(`Image failed to load: ${postData.media[0].url}`)
            postImage.remove()
        }

        post.appendChild(postImage)
    }

    const postTitle = document.createElement('h2')
    postTitle.textContent = postData.title
    post.append(postTitle)
    postTitle.classList.add('font-h2', 'text-lg')

    const sellerAndEndsAt = document.createElement('div')
    sellerAndEndsAt.classList.add('py-8')

    const sellerName = document.createElement('p')
    sellerName.textContent = `Seller: ${postData.seller?.name}`
    sellerAndEndsAt.appendChild(sellerName)
    sellerName.classList.add('font-p')

    const auctionEnds = document.createElement('p')
    auctionEnds.textContent = `Auction ends: ${new Date(
        postData.endsAt
    ).toLocaleString([], {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    })}`

    auctionEnds.classList.add('font-p')

    sellerAndEndsAt.appendChild(auctionEnds)

    post.appendChild(sellerAndEndsAt)

    const bidButton = document.createElement('button')
    bidButton.textContent = 'BID'
    bidButton.classList.add(
        'font-h2',
        'text-center',
        'bg-button',
        'py-1',
        'px-3',
        'hover:bg-hover'
    )

    post.append(bidButton)
    bidButton.addEventListener('click', () => {
        const targetUrl = `/biddaroo/post/index.html?id=${postData.id}`
        window.location.href = targetUrl
    })

    return post
}

export function renderPostTemplate(postData, parent) {
    parent.append(postTemplate(postData))
}

export function renderPostTemplates(postDataList, parent) {
    parent.append(...postDataList.map(postTemplate))
}
