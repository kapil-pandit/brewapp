function countPalindromicSubstrings(s) {
    // Transform the input string to include '#' between each character
    const modifiedString = addHashes(s);

    // Initialize an array to store the length of palindromic substrings
    const p = new Array(modifiedString.length).fill(0);
    // console.log(modifiedString, p);
    let center = 0; // Center of the palindrome
    let right = 0; // Right boundary of the palindrome
    let count = 0; // Counter for palindromic substrings (excluding single characters)

    for (let i = 0; i < modifiedString.length; i++) {
        // Mirror index
        const mirror = 2 * center - i;

        if (i < right) {
            p[i] = Math.min(right - i, p[mirror]);
        }

        let a = i + (1 + p[i]);
        let b = i - (1 + p[i]);

        while (a < modifiedString.length && b >= 0 && modifiedString[a] === modifiedString[b]) {
            p[i]++;
            a++;
            b--;
        }

        if (i + p[i] > right) {
            center = i;
            right = i + p[i];
        }

        if (p[i] > 0) {
            count += Math.floor((p[i] + 1) / 2);
        }
    }
    count-=s.length;
    return count;
}

function addHashes(s) {
    return '#' + s.split('').join('#') + '#';
}

const inputString = "abbaeae";
const result = countPalindromicSubstrings(inputString);
// console.log(result);


for (var index = 0; index < 5; index++) {
    let d = 5+9;
    setTimeout(()=>{
        console.log(index);
    })
}