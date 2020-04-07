// File contains helper functions to be used by any encryption.

function convertToBits(string) {
    let output = "";
    let bits;

    for(let i = 0; i < string.length; i++) {
        bits = string[i].charCodeAt(0).toString(2);
        while(bits.length != 8) {
            bits = "0" + bits;
        }
        output += bits;
    }

    return output;
}

function countBits(n) {
    return n.toString(2).length
}