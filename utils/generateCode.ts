export function generateShortCode() {
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789"
    let code = ""

    for (let i = 0; i < 6; i++) {
        code +=  characters.charAt(Math.floor(Math.random() *  characters.length))
    }

    console.log("codigo random",code)
    return code
}



