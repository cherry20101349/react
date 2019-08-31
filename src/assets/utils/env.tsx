const PORT = 5566
const getEnv = () => {
    if (process.env.NODE_ENV === 'development') {
        return `http://localhost:${PORT}`
    } else {
        return 'http://192.168.50.111'
    }
}
export default getEnv()