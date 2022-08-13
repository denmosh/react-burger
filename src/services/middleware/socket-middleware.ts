import {getCookie} from "../utils";
import {Middleware} from "redux";

interface IWsActions {
    wsInit: string,
    wsClose: string,
    wsSendMessage: string,
    onOpen: string,
    onClose: string,
    onError: string,
    onMessage: string
}
export const socketMiddleware = (wsUrl:string, wsActions:IWsActions): Middleware => {
    return (store) => {
        let socket: WebSocket | null = null;

        return (next) => (action) => {
            const { dispatch, getState } = store;
            const { type, payload } = action;
            const { wsInit, wsClose, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;
            const { user } = getState().user;
            if (type === wsInit) {
                socket = new WebSocket(`${wsUrl}${payload.path}?token=${getCookie('token')}`);
            }
            if (socket) {
                if (type === wsClose) {
                    socket.close();
                }
                socket.onopen = (event) => {
                    dispatch({ type: onOpen, payload: event });
                };

                socket.onerror = (event) => {
                    dispatch({ type: onError, payload: event });
                };

                socket.onmessage = (event) => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    const { success, ...restParsedData } = parsedData;

                    dispatch({ type: onMessage, payload: restParsedData });
                };

                socket.onclose = (event) => {
                    dispatch({ type: onClose, payload: event });
                };

                if (type === wsSendMessage) {
                    const message = { ...payload, token: user.token };
                    socket.send(JSON.stringify(message));
                }
            }

            next(action);
        };
    };
};