export const generateNewCode = (count: number) => {
    let min = Math.pow(10, count - 1)
    let max = Math.pow(10, count) - 1
    return Math.floor(Math.random() * (max - min + 1)) + min
}
