import {RootState} from "../store";

interface IWsActions {
    wsInit: string,
    wsSendMessage: string,
    onOpen: string,
    onClose: string,
    onError: string,
    onMessage: string
}
export const socketMiddleware = (wsUrl:string, wsActions:IWsActions) => {
    return (store:any) => {
        let socket:any = null;

        return (next:any) => (action:any) => {
            const { dispatch, getState } = store;
            const { type, payload } = action;
            const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;
            const { user } = getState().user;
            if (type === wsInit) {
                socket = new WebSocket(`${wsUrl}`);
            }
            if (socket) {
                socket.onopen = (event:any) => {
                    dispatch({ type: onOpen, payload: event });
                };

                socket.onerror = (event:any) => {
                    dispatch({ type: onError, payload: event });
                };

                socket.onmessage = (event:any) => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    const { success, ...restParsedData } = parsedData;

                    dispatch({ type: onMessage, payload: restParsedData });
                };

                socket.onclose = (event:any) => {
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