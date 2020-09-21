import SendRequest       from '../Utlis/SendRequest.js'

let NewInterview = {

    render: async () => {
        let allUsers = await SendRequest.send('http://localhost:3000/users/',"GET");
        return `
        <form>
            <div>
                Start Time
                <input class="form-control" type="datetime-local"  name="startTime" id="startTime" >
            </div>
                <br/>
            <div>
                End Time
                <input class="form-control" type="datetime-local" name="endTime" id="endTime" >
            </div>
            
            <br/>
            <div>
                Choose Users
                <select multiple class="form-control" id="user_ids" name="user_ids">
                    ${allUsers.map(user => `<option value=${user.id}>${user.username}</option>` )}
                </select>
            </div>
            <button type="button" id="newinterviewbutton">CREATE</button>
            <br/><a href="#/interviews">back</a>
        <form>
        `
    }
    , after_render: async () => {
        document.getElementById("newinterviewbutton").addEventListener ("click",  async () => {
            let startTime       = document.getElementById("startTime").value;
            let endTime        = document.getElementById("endTime").value;
            let options  = document.getElementById("user_ids").selectedOptions;
            let user_ids = [];
            for(let i=0;i<options.length;i++)
                user_ids.push(options[i].value);
            
            let response = await SendRequest.send('http://localhost:3000/interviews/','POST', {
                    "startTime" : startTime,
                    "endTime" : endTime,
                    "user_ids" : user_ids
            });
            console.log(response);
        })
    }
}

export default NewInterview;