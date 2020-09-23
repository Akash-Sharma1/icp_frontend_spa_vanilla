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
            if(response.status != 200){
                let errors = "";
                for (var key in json) {
                    for(let i=0;i<json[key].length;i++)
                        errors += key +": " + json[key][i]+"\n";
                }
                alert(errors);
            }
            return json
        } catch (err) {
            alert(err);
            return err;
        }
    }
}
export default SendRequest
