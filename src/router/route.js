import { Control } from "react-keeper";

export function stopPro(e) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
}

export function goToAny(path, state, e){
    stopPro(e)
    Control.go(path, state);
}

export function goBack(e) {
    stopPro(e)
    Control.go(-1);
}