import {v4 as uuidv4} from 'uuid';

export const renameFileWithPrefix = (fileName) => {
    //site domain name
    const siteName = "ASCL";

    //get the extension of the file
    const ext = getFileExtension(fileName);

    //remove all none word characters from generated uuid
    const wordUuid = uuidv4().replace(/\W/gi, "");

    //get the first 10 characters from the result
    const shortRandChars = wordUuid.slice(0, 10);

    //create extension with the dot
    const dotExt = "." + ext;

    //create a ext regex
    const extRegex = new RegExp(`${dotExt}`, "ig");

    //remove the extension from the initial filename
    const fileNameMinusExt = fileName.replace(extRegex, "");

    //create a new filename
    const newFileName = fileNameMinusExt.replace(' ', '_') + "_" + siteName + "_" + shortRandChars + dotExt;

    return newFileName;
}

export const getAcceptValue = (extArray, typesArray) => {
    const acceptValue = extArray.join(',') + ',' + typesArray.join(',');
    return acceptValue;
}

export const getFileExtension = fileName => {
    return fileName
        .split('.')
        .pop();
}

export const convertByteInString = (val) => {
    let convertedVal;
    if (val < 1048576) {
        convertedVal = Number
            .parseFloat(val / 1024)
            .toFixed(2) + 'kb';
        return convertedVal;
    } else if (val >= 1048576) {
        convertedVal = Number
            .parseFloat(val / 1048576)
            .toFixed(2) + 'mb';
        return convertedVal;
    }
}

export const strToSlug = (str) => {

    //replace all non word characters with space
    const replaceNonWord = str
        .toLowerCase()
        .replace(/\W+/gi, ' ');

    //replace underscores with spaces
    const replaceUnderScores = replaceNonWord.replace(/_/gi, ' ');

    // replace all space with single dash
    const replaceSpace = replaceUnderScores
        .trim()
        .replace(/\s+/gi, '-');

    return replaceSpace;

}

export const decode = string => {
    const output = []
    let counter = 0
    const length = string.length

    while (counter < length) {
        const value = string.charCodeAt(counter++)

        if (value >= 0xD800 && value <= 0xDBFF && counter < length) {

            // It's a high surrogate, and there is a next character.

            const extra = string.charCodeAt(counter++)

            if ((extra & 0xFC00) === 0xDC00) { // Low surrogate.
                output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000)
            } else {

                // It's an unmatched surrogate; only append this code unit, in case the next
                // code unit is the high surrogate of a surrogate pair.

                output.push(value)
                counter--
            }
        } else {
            output.push(value)
        }
    }

    return output
}

export const count = (target, options) => {
    let original = '' + target; //target is a string type

    options = options || {}

    /**
     * The initial implementation to allow for HTML tags stripping was created
     * @craniumslows while the current one was created by @Rob--W.
     *
     * @see <http://goo.gl/Exmlr>
     * @see <http://goo.gl/gFQQh>
     */

    if (options.stripTags) 
        original = original.replace(/<\/?[a-z][^>]*>/gi, '')

    if (options.ignore) {
        // original = original.replace(i, '')
    }

    const trimmed = original.trim();

    /**
     * Most of the performance improvements are based on the works of @epmatsw.
     *
     * @see <http://goo.gl/SWOLB>
     */

    return {
        paragraphs: trimmed
            ? (trimmed.match(options.hardReturns
                ? /\n{2,}/g
                : /\n+/g) || []).length + 1
            : 0,
        sentences: trimmed
            ? (trimmed.match(/[.?!…]+./g) || []).length + 1
            : 0,
        words: trimmed
            ? (trimmed.replace(/['";:,.?¿\-!¡]+/g, '').match(/\S+/g) || []).length
            : 0,
        characters: trimmed
            ? decode(trimmed.replace(/\s/g, '')).length
            : 0,
        all: decode(original).length
    }

}

export const getReadTime = string => {

    const WPM = 200;

    const estimatedReadTime = count(string).words / WPM;

    const remainder = estimatedReadTime % 1;

    // const minutes = estimatedReadTime - remainder;

    const roundedMinutes = Math.round(estimatedReadTime);

    const seconds = Math.round(remainder * 60);

    return (roundedMinutes < 1)
        ? seconds <= 1
            ? seconds + " sec read"
            : seconds + " secs read"
        : roundedMinutes <= 1
            ? roundedMinutes + " min read"
            : roundedMinutes + " mins read";

}