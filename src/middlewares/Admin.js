const admin = (req, res, next) => {
    try {
        if (!req.user) {
            res.clearCookie('token')
            return res.redirect('/user/login')
        }

        if (req.user.role === 'user') {
            res.clearCookie('token')
            return res.redirect('/user/login')
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

export default admin