const SendRequest = {
    send_request : async(url, options) => {
        try {
            const response = await fetch(url, options)
            const json = await response.json();
            if(response.status != 200 && response.status != 201 ){
                let errors = "";
                for (var key in json) {
                    for(let i=0;i<json[key].length;i++)
                        errors += key +": " + json[key][i]+"\n";
                }
                alert(errors);
            }
            json["status"] = response.status;
            console.log(json);
            return json
        } catch (err) {
            alert(err);
            return err;
        }
    },
    send : async (url, method = 'GET', data = {}, content_type = "application/json") => {
        if(content_type == "application/json")
            data = JSON.stringify(data);

        const getoptions = {
            method: method
        };
        const alloptions = {
            method: method,
            body: data
        };

        const options = (method != "GET") ? alloptions : getoptions
        let response = await SendRequest.send_request(url, options);
        return response;
    }
}
export default SendRequest
