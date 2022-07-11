import {Redirect, Route, RouteProps} from 'react-router-dom';
import {FC, ReactNode, useEffect, useState} from 'react';
import {getUser} from "../../services/actions/user";
import {getCookie} from "../../services/utils";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";

export const ProtectedRoute:FC<RouteProps> = ({ children, ...rest })=> {

    let { user,  getUserRequest, tokenRequest} = useAppSelector(store => store.user)
    const [isUserLoaded, setUserLoaded] = useState(false);

    const dispatch = useAppDispatch();

    const init = () => {
        if(user.email){
            setUserLoaded(true);
        }else{
            if(getCookie('refreshToken')){
                dispatch(getUser());
            }
            setUserLoaded(true);
        }
    };

    useEffect(() => {
        init();
    }, []);

    if(!isUserLoaded || getUserRequest || tokenRequest){
        return null;
    }
    return (
        <Route
            {...rest}
            render={({ location }):any =>
                user.email ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}