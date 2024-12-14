import { getPost } from '../../api/post/read.js'
import { isLoggedIn, load } from '../../api/auth/key.js'
import { placeBid } from './bid.js'
import { initializeCarousel } from './carousel.js'

export function getPostIdFromUrl() {
    const params = new URLSearchParams(window.location.search)
    const postId = params.get('id')
    return postId
}

const postId = getPostIdFromUrl()
if (postId) {
    getPost(postId)
        .then((postData) => {
            renderTitle(postData),
                renderCreateEndsAt(postData),
                renderPostData(postData),
                renderBidderInformation(postData),
                renderBidInput(postData)

            if (
                postData.media &&
                Array.isArray(postData.media) &&
                postData.media.length > 0
            ) {
                initializeCarousel(postData.media)
            } else {
                console.log('No media available for this post.')
            }
        })
        .catch((error) => {
            console.error('Error fetching post:', error)
        })
}

function renderTitle(postData) {
    const renderTitle = document.getElementById('renderTitle')

    if (!renderTitle) {
        console.error('Post container not found')
        return
    }

    const auctionTitle = document.createElement('h2')
    auctionTitle.textContent = postData.title
    auctionTitle.classList.add('font-h2', 'text-xl', 'text-center')

    renderTitle.appendChild(auctionTitle)
}

function renderCreateEndsAt(postData) {
    const renderCreateEndsAt = document.getElementById('renderCreateEndsAt')
    renderCreateEndsAt.classList.add('flex', 'justify-between', 'mt-4', 'gap-4')

    if (!renderCreateEndsAt) {
        console.error('Post container not found')
        return
    }

    const auctionEnds = document.createElement('p')

    auctionEnds.textContent = `Auction ends ${new Date(
        postData.endsAt
    ).toLocaleString([], {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    })}`

    auctionEnds.classList.add('font-p', 'text-xs')

    const auctionDate = document.createElement('p')
    auctionDate.classList.add('font-p', 'text-xs')
    auctionDate.textContent = `Created on: ${new Date(
        postData.created
    ).toLocaleString([], {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    })}`

    renderCreateEndsAt.appendChild(auctionEnds)
    renderCreateEndsAt.appendChild(auctionDate)
}

function renderPostData(postData) {
    const postContainer = document.getElementById('post-container')

    if (!postContainer) {
        console.error('Post container not found')
        return
    }
    const auctionDescription = document.createElement('p')
    auctionDescription.textContent = postData.description
    auctionDescription.classList.add('font-p')

    const sellerName = document.createElement('p')
    sellerName.textContent = `Auctioned by ${postData.seller?.name}`
    sellerName.classList.add('font-p', 'text-xs', 'mt-4')

    postContainer.appendChild(auctionDescription)
    postContainer.appendChild(sellerName)
}

function renderBidderInformation(postData) {
    const bidderContainer = document.getElementById('bidder-container')

    if (!bidderContainer) {
        console.error('Post container not found')
        return
    }

    const bidsContainer = document.createElement('div')
    bidsContainer.classList.add('bids-container')

    const bidsTitle = document.createElement('h2')
    bidsTitle.textContent = 'Bids:'
    bidsTitle.classList.add('p-h2')
    bidsContainer.appendChild(bidsTitle)

    if (postData.bids && postData.bids.length > 0) {
        postData.bids.forEach((bid) => {
            const bidElement = document.createElement('p')
            bidElement.textContent = `Bidder: ${bid.bidder.name}, Amount: ${bid.amount}`
            bidsContainer.appendChild(bidElement)
            bidElement.classList.add('font-p')
        })
    } else {
        const noBidsMessage = document.createElement('p')
        noBidsMessage.textContent = 'No bids placed yet.'
        bidsContainer.appendChild(noBidsMessage)
    }

    bidderContainer.appendChild(bidsContainer)
}

function renderBidInput(postData) {
    const bidContainer = document.getElementById('bid-container')

    if (!bidContainer) {
        console.error('Bid container not found')
        return
    }

    if (!isLoggedIn()) {
        bidContainer.innerHTML = '<p>You need to log in to place a bid.</p>'
        return
    }

    const userProfile = load('profile')
    const loggedInUser = userProfile?.data?.name
    const sellerName = postData.seller?.name

    console.log(load('profile'))

    if (loggedInUser === sellerName) {
        bidContainer.innerHTML = '<p>You cannot bid on your own auction.</p>'
        bidContainer.classList.add('font-p', 'text-xs')
        return
    }

    const bidForm = document.createElement('form')
    bidForm.classList.add('align-center')

    const bidInput = document.createElement('input')
    bidInput.type = 'number'
    bidInput.placeholder = 'Enter your bid amount'
    bidInput.required = true
    bidInput.name = 'bidAmount'
    bidInput.classList.add(
        'p-1',
        'bg-transparent',
        'bg-transparent',
        'outline',
        'outline-1',
        'outline-white/45'
    )

    const bidButton = document.createElement('button')
    bidButton.type = 'submit'
    bidButton.textContent = 'Place Bid'
    bidButton.classList.add(
        'p-2',
        'font-h2',
        'text-center',
        'bg-button',
        'py-1',
        'px-3',
        'mt-20',
        'hover:bg-hover'
    )

    bidForm.appendChild(bidInput)
    bidForm.appendChild(bidButton)

    bidForm.addEventListener('submit', (event) => {
        event.preventDefault()
        const bidAmount = parseFloat(bidInput.value)

        if (isNaN(bidAmount) || bidAmount <= 0) {
            alert('Please enter a valid bid amount.')
            return
        }

        placeBid(postData.id, bidAmount)
            .then(() => {
                location.reload()
            })
            .catch((error) => {
                console.error('Failed to place bid:', error)
                alert('Error placing bid. Please try again.')
            })
    })

    bidContainer.appendChild(bidForm)
}
