const self = async () => {
    const data = await fetch('/user/self', {
        credentials: 'include'
    })

    if (data.status !== 401 || data.status !== 500) {
        const { user } = await data.json()

        if (user) {
            const login = document.getElementById('head-login')
            const signup = document.getElementById('head-signup')
            const headTitle = document.getElementById('head-title')
            login.remove()
            signup.remove()

            headTitle.innerHTML = `Hello, ${user.name}`


        } else {
            const logout = document.getElementById('head-logout')
            const headTitle = document.getElementById('head-title')
            logout.remove()
            headTitle.innerText = 'PR-Final'
            headTitle.style.fontWeight = '500'
            headTitle.style.fontSize = '2rem'
        }
    }
}

self()