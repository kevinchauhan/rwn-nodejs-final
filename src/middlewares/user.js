const user = (req, res, next) => {
    try {
        if (!req.user) {
            res.clearCookie('token')
            return res.redirect('/user/login')
        }

        if (req.user.role !== 'user') {
            res.clearCookie('token')
            return res.redirect('/user/login')
        }

        if (!req.user.emailVerified) {
            return res.redirect(`/user/emailverification/${req.user._id}`)
        }

        next()
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Error while verifying token',
            success: false
        })
    }
}

export default user