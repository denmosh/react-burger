import { Redirect, Route } from 'react-router-dom';
import {ReactNode, useEffect, useState} from 'react';
import {getUser} from "../../services/actions/user";
import {getCookie} from "../../services/utils";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";

export function ProtectedRoute({ children, ...rest }: {children: ReactNode, [x:string]:any}) {

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
            render={({ location }) =>
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