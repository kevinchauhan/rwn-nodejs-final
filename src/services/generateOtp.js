import crypto from 'crypto'

const generateOtp = () => {
    const otp = crypto.randomInt(1000, 9999)
    return otp
}

export default generateOtp