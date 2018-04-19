
export function getScrollTop() {
    return window.pageYOffset || document.documentElement.scrollTop
        || document.body.scrollTop
}

export function setScrollTop(value) {
    window.scrollTo(0, value)
}

export const windowInnerHeight =
            window.screen.height ||
            window.innerHeight ||
            document.documentElement.clientHeight;

export const windowInnerWidth =
            window.screen.width ||
            window.innerWidth ||
            document.documentElement.clientWidth;