const SendRequest = {
    send : async (url, method, data = null) => {
        data = data ? data : {};
        const getoptions = {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const alloptions = {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        const options = (method != "GET") ? alloptions : getoptions
        try {
            const response = await fetch(url, options)
            const json = await response.json();
            // console.log(json);
            return json
        } catch (err) {
            alert(err);
            return err;
        }
    }
}
export default SendRequest
