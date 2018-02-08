import { Control } from "react-keeper";

export function stopPro(e) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
}

export function goToAny(fun, e){
    stopPro(e)
    fun() 
}

export function goBack(e) {
    stopPro(e)
    Control.go(-1);
}