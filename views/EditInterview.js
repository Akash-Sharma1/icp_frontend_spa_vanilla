import Router            from '../Utlis/Router.js'
import SendRequest       from '../Utlis/SendRequest.js'

let EditInterview = {

    render: async (request) => {
        let id = request["id"]
        let allUsers = await SendRequest.send('http://localhost:3000/users/',"GET");
        var interview = await SendRequest.send('http://localhost:3000/interviews/'+id,"GET");
        return `
        <form>
            <div>
                Start Time
                <input class="form-control" type="datetime-local"  name="startTime" id="startTime" 
                value=${interview.startTime.substring(0,interview.startTime.length-1)} >
            </div>
                <br/>
            <div>
                End Time
                <input class="form-control" type="datetime-local" name="endTime" id="endTime" 
                value=${interview.endTime.substring(0,interview.endTime.length-1)}>
            </div>
            
            <br/>
            <div>
                Choose Users
                <select multiple class="form-control" id="user_ids" name="user_ids">
                    ${allUsers.map(user => `<option value="${user.id}">${user.username}</option>` )}
                </select>
            </div>
            <button type="button" id="editinterviewbutton" interview_id = "${interview.id}">Edit</button>
            <br/><a href= ${Router.getpath("Interviews")}>back</a>
        <form>
        `
    }
    , after_render: async () => {
        document.getElementById("editinterviewbutton").addEventListener ("click",  async (e) => {
            let startTime = document.getElementById("startTime").value;
            let endTime   = document.getElementById("endTime").value;
            let options   = document.getElementById("user_ids").selectedOptions;
            let user_ids  = [];
            for(let i=0;i<options.length;i++)
                user_ids.push(options[i].value);
            
            let response = await SendRequest.send('http://localhost:3000/interviews/'+e.path[0].attributes.interview_id.value,'PATCH', {
                    "startTime" : startTime,
                    "endTime" : endTime,
                    "user_ids" : user_ids
            });
            console.log(response);
            Router.redirect("Interviews");
        })
    }
}

export default EditInterview;