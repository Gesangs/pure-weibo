
export function numFormat(s) {
    const str = Number.parseInt(s).toFixed(0);
    let result;
    switch(str.length) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
            result = str;break;
        case 6:
            result = `${str.slice(0,2)}.${str[2]}万`;break;
        case 7:
            result = `${str.slice(0,3)}万`;break;
        case 8:
            result = `${str.slice(0,4)}万`;break;
        case 9:
            result = `${str[0]}.${str[1]}亿`;break;
        default: 
            result = str;
    }
    return result;
} 