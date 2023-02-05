/**
 * Detects using Regex if a string has chinese characters.
 * @param {String} string to detect if it has chinese characters 
 */
const detectChinese = (input) => {
    const REGEX_CHINESE = /[\u4e00-\u9fff]|[\u3400-\u4dbf]|[\u{20000}-\u{2a6df}]|[\u{2a700}-\u{2b73f}]|[\u{2b740}-\u{2b81f}]|[\u{2b820}-\u{2ceaf}]|[\uf900-\ufaff]|[\u3300-\u33ff]|[\ufe30-\ufe4f]|[\uf900-\ufaff]|[\u{2f800}-\u{2fa1f}]/u;
    return REGEX_CHINESE.test(input)
}

module.exports = { detectChinese }