export function getResponse(res) {
    return res.json().then(json => {
        return res.ok ? json : Promise.reject(json);
    });
}
