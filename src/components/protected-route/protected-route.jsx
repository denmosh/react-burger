import { Redirect, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "../../services/actions/user";
import {getCookie} from "../../services/utils";

export function ProtectedRoute({ children, ...rest }) {

    let { user,  getUserRequest, tokenRequest} = useSelector(store => store.user)
    const [isUserLoaded, setUserLoaded] = useState(false);

    const dispatch = useDispatch();

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