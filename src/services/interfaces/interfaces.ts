export interface IIngredient {
    _id:string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
}
export interface IIngredientUniq extends IIngredient{
    uuid: string;
}
export interface IUuid {
    uuid: string;
}

export interface IOrderResponse {
    order:{
        number: number,
    }
}
export interface IError {
    message: string,
}

export interface IUser {
    email: string,
    name: string,
}

export interface IToken {
    accessToken: string,
    refreshToken: string,
}

export interface IRegistration  extends IUser{
    password: string,
}

export interface IAuthorization{
    email: string,
    password: string,
}
export interface ILogout{
    token:string|undefined,
}

export interface IResetPassword{
    token: string,
    password: string
}

export interface IForgotPassword{
    email:string
}
