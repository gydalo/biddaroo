// This function controls which JavaScript file is loaded on which page
// In order to add additional pages, you will need to implement them below
// You may change the behaviour or approach of this file if you choose
export default async function router(pathname = window.location.pathname) {
    switch (pathname) {
        case '/':
            await import('./views/home.js')
            await import('./views/buttons.js')
            await import('./views/login.js')
            await import('./views/register.js')
            break
        case '/biddaroo/':
            await import('./views/home.js')
            await import('./views/buttons.js')
            await import('./views/login.js')
            await import('./views/register.js')
            break
        case '/index.html':
            await import('./views/home.js')
            await import('./views/buttons.js')
            await import('./views/login.js')
            await import('./views/register.js')
            break
        case '/biddaroo/index.html':
            await import('./views/home.js')
            await import('./views/buttons.js')
            await import('./views/login.js')
            await import('./views/register.js')
            break
        case '/post/index.html':
            await import('./views/post.js')
            await import('./views/buttons.js')
            await import('./views/bid.js')
            break
        case '/biddaroo/post/index.html':
            await import('./views/post.js')
            await import('./views/buttons.js')
            await import('./views/bid.js')
            break
        case '/post/edit/index.html':
            await import('./views/postEdit.js')
            await import('./views/buttons.js')
            break
        case '/biddaroo/post/edit/index.html':
            await import('./views/postEdit.js')
            await import('./views/buttons.js')
            break
        case '/post/create/index.html':
            await import('./views/postCreate.js')
            await import('./views/buttons.js')
            break
        case '/biddaroo/post/create/index.html':
            await import('./views/postCreate.js')
            await import('./views/buttons.js')
            break
        case '/profile/index.html':
            await import('./views/profile.js')
            await import('./views/buttons.js')
            break
        case '/biddaroo/profile/index.html':
            await import('./views/profile.js')
            await import('./views/buttons.js')
            break
        case '/profile/':
            await import('./views/profile.js')
            await import('./views/buttons.js')
            break
        case '/biddaroo/profile/':
            await import('./views/profile.js')
            await import('./views/buttons.js')
            break
        case '/biddaroo/profile/edit/index.html':
            await import('../api/profile/profileEdit.js')
            await import('./views/buttons.js')
            break
        case '/profile/edit/index.html':
            await import('../api/profile/profileEdit.js')
            await import('./views/buttons.js')
            break
    }
}
