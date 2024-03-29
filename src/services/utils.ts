import {IIngredient, IToken} from "./interfaces/interfaces";
import {useMemo} from "react";

export function getCookie(name:string) {
    const matches = document.cookie.match(
        new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name:string, value:number|boolean|string, props:any) {
    props = props || {};
    let exp = props.expires;
    if (typeof exp == 'number' && exp) {
        const d = new Date();
        d.setTime(d.getTime() + exp * 1000);
        exp = props.expires = d;
    }
    if (exp && exp.toUTCString) {
        props.expires = exp.toUTCString();
    }
    value = encodeURIComponent(value);
    let updatedCookie = name + '=' + value;
    for (const propName in props) {
        updatedCookie += '; ' + propName;
        const propValue = props[propName];
        if (propValue !== true) {
            updatedCookie += '=' + propValue;
        }
    }
    document.cookie = updatedCookie;
}

export function deleteCookie(name:string) {
    setCookie(name, '', {expires: -1, path: '/' });
}

export function setTokenCookie(res:IToken) {
    setCookie('token', res.accessToken.split('Bearer ')[1], {expires: 1200, path: '/' });
    setCookie('refreshToken', res.refreshToken, { path: '/' });
}

export const countPrice = (ingredients:Array<string>, ingredientsDetailed: Array<IIngredient>) => {
    return ingredients.reduce((accumulator, ingredientId) => {
        let ingredient = ingredientsDetailed.find(x => x._id === ingredientId)
        let price = ingredient ? ingredient.price : 0;
        return accumulator + price;
    }, 0);
}
