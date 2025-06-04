import { getProfile } from '../profile/index.js'
import { updateProfile } from '../profile/index.js'
import { load, save } from '../auth/key.js'
import { getPosts } from '../post/read.js'

const form = document.querySelector('#editProfile')

if (form) {
    const profileData = load('profile')
    const profileName = profileData?.data?.name || profileData?.name || null

    const messageEl = document.createElement('div')
    messageEl.id = 'profileMessage'
    messageEl.className = 'text-center mt-2 font-p'
    form.appendChild(messageEl)

    function showMessage(text, isSuccess = true) {
        messageEl.textContent = text
        messageEl.className = isSuccess
            ? 'text-green-500 text-center mt-2 font-p'
            : 'text-red-500 text-center mt-2 font-p'
    }

    async function loadProfileData() {
        try {
            const profile = await getProfile(profileName)
            const profileDetails = profile?.data

            if (!profileDetails || !profileDetails.name) {
                showMessage('Invalid or missing profile data.', false)
                return
            }

            if (form.username) form.username.value = profileDetails.name || ''
            if (form.bio) form.bio.value = profileDetails.bio || ''
            if (form.avatarURL)
                form.avatarURL.value =
                    profileDetails.avatar?.url ||
                    'https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=400&w=400'
            if (form.bannerURL)
                form.bannerURL.value =
                    profileDetails.banner?.url ||
                    'https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=500&w=1500'
        } catch {
            showMessage('Failed to load profile. Please try again.', false)
        }
    }

    loadProfileData()

    form.addEventListener('submit', async (event) => {
        event.preventDefault()

        const formData = new FormData(form)
        const formValues = Object.fromEntries(formData.entries())

        const updatedProfile = {
            name: profileName,
            username: formValues.username,
            bio: formValues.bio,
            avatar: {
                url: formValues.avatarURL,
                alt: formValues.avatarALT,
            },
            banner: {
                url: formValues.bannerURL,
                alt: formValues.bannerALT,
            },
        }

        try {
            const response = await updateProfile(updatedProfile)

            if (response) {
                save('profile', response)
                showMessage('Profile updated successfully!', true)
                setTimeout(() => {
                    window.location.href = '/biddaroo/profile/index.html'
                }, 1500)
            } else {
                showMessage('Failed to update profile.', false)
            }
        } catch {
            showMessage('Something went wrong. Please try again later.', false)
        }
    })
} else {
    console.error('Edit profile form not found')
}

async function displayActiveAuctions() {
    const postContainer = document.getElementById('auctionContainer')
    if (!postContainer) return

    try {
        const posts = await getPosts(1, 10)

        if (!posts?.data) return

        const activePostsWithImages = posts.data.filter((post) => {
            const endsAtDate = new Date(post.endsAt)
            return (
                endsAtDate > new Date() &&
                post.media?.length > 0 &&
                post.media[0]?.url
            )
        })

        if (activePostsWithImages.length < 2) {
            postContainer.classList.add('font-p')
            postContainer.innerHTML = '<p>No active auctions available.</p>'
            return
        }

        activePostsWithImages.slice(0, 2).forEach((post) => {
            const postElement = document.createElement('div')
            postElement.classList.add('post')

            const title = document.createElement('h2')
            title.textContent = post.title
            title.classList.add('font-h2', 'cursor-pointer', 'mb-4')
            title.addEventListener('click', () => {
                window.location.href = `/biddaroo/post/index.html?id=${post.id}`
            })
            postElement.appendChild(title)

            const img = document.createElement('img')
            img.src = post.media[0].url
            img.alt = `Image of ${post.title}`
            img.classList.add(
                'w-80',
                'hover:cursor-pointer',
                'hover:opacity-60'
            )
            img.addEventListener('click', () => {
                window.location.href = `/biddaroo/post/index.html?id=${post.id}`
            })
            postElement.appendChild(img)

            postContainer.appendChild(postElement)
        })
    } catch {
        // Silent fail
    }
}

displayActiveAuctions()
