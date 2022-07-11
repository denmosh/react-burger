export function getResponse(res:Response):any {
    return res.json().then((json:object) => {
        return res.ok ? json : Promise.reject(json);
    });
}
