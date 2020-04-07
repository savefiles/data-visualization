class DES {

    constructor() {}

    // Key is 8 bytes (64 bits).
    // Block size is 8 bytes (64 bits).
    encrypt(plaintext, key) {
        
        // Pad the plaintext (using spaces as padding).
        while(plaintext.length % 8 != 0) {
            plaintext += " ";
        }
    
        plaintext = convertToBits(plaintext);
    
        return plaintext;
    
    }
    
    decrypt(encryptedtext, key) {
    
    }



}

class DES_Subkeys {

    constructor(key) {
        this._key = key;

        // Lookup tables.
        this._PC1 = 
        [[57,49,41,33,25,17,9,1],
        [58,50,42,34,26,18,10,2],
        [59,51,43,35,27,19,11,3],
        [60,52,44,36,63,55,47,39],
        [31,23,15,7,62,54,46,38],
        [30,22,14,6,61,53,45,37],
        [29,21,13,5,28,20,12,4]]; 
        this._PC2 = 
        [[14,17,11,24,1,5,3,28],
        [15,6,21,10,23,19,12,4],
        [26,8,16,7,27,20,13,2],
        [41,52,31,37,47,55,30,40],
        [51,45,33,48,44,49,39,56],
        [34,53,46,42,50,36,29,32]];   
    }

    generateSubkeysEncryption() {
        let subkeys = [];
        let firstOutput = pc1(this.key);
        let c = firstOutput.substring(0, 28);
        let d = firstOutput.substring(28);

        for(let round = 1; round <= 16; round++) {
            if (round == 1 || round == 2 || round == 9 || round == 16) {
                // left shift by 1 bit
                c = c.substring(1, 28) + c.charAt(0);
                d = d.substring(1, 28) + d.charAt(0);
            } else {
                // left shift by 2 bits
                c = c.substring(2, 28) + c.substring(0, 2);
                d = d.substring(2, 28) + d.substring(0, 2);
            }
            // combine c+d, PC-2 substitution, store in subkeys array
            subkeys[round-1] = pc2(c + d);
        }
        return subkeys;

    }

    generateSubkeysDecryptions() {
        let subkeys = [];
        let firstOutput = pc1(key);
        let c = firstOutput.substring(0, 28);
        let d = firstOutput.substring(28);
        
        for(let round = 1; round <= 16; round++) {
            if (round == 1) {
                // don't shift
            } else if (round == 2 || round == 9 || round == 16) {
                // right shift by 1 bit
                c = c.charAt(27) + c.substring(0, 27);
                d = d.charAt(27) + d.substring(0, 27);
            } else {
                // right shift by 2 bits
                c = c.substring(26, 28) + c.substring(0, 26);
                d = d.substring(26, 28) + d.substring(0, 26);
            }
            // combine c+d, PC-2 substitution, store in subkeys array
            subkeys[round-1] = pc_2(c + d);
        }
        return subkeys;
    }

    pc1() {
        let result = "";
        for(let row = 0; row < 7; row++){
            for(let col = 0; col < 8; col++){
                result += key.charAt(PC_1[row][col]-1);
            }
        }
        return result;
    }
    pc2() {
        let result = "";
        for(let row = 0; row < 6; row++){
            for(let col = 0; col < 8; col++){
                result += key.charAt(PC_2[row][col]-1);
            }
        }
        return result;
    }
}


