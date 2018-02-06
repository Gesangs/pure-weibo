
export function numFormat(s) {
    const str = Number.parseInt(s).toFixed(0);
    switch(str.length) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
            return str;break;
        case 6:
            return `${str.slice(0,2)}.${str[2]}万`;break;
        case 7:
            return `${str.slice(0,3)}万`;break;
        case 8:
            return `${str.slice(0,4)}万`;break;
        case 9:
            return `${str[0]}.${str[1]}亿`;break;
    }
} 