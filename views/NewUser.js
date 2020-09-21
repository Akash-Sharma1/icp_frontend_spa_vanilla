import SendRequest from '../Utlis/SendRequest.js'

let NewUser = {

    render: async () => {
        return `
        <form>
            <div>
                Username
                <input type="text" class="form-control-file" id="username" name="username">
            </div>
            <div>
                Email
                <input type="email" class="form-control" aria-describedby="emailHelp" placeholder="Enter email" id="email" name="email">
            </div>
            <div>
                Resume
                    <input type="file" class="form-control-file" id="resume" name="resume">
            </div>
            <button type="button" id="newinterviewbutton">CREATE</button>
        <form>
        `
    }
    , after_render: async () => {
        document.getElementById("newinterviewbutton").addEventListener ("click",  () => {
            let username       = document.getElementById("username").value;
            let email        = document.getElementById("email").value;
            let resume  = document.getElementById("resume");
            SendRequest('http://localhost:3000/users/',"POST", {
                "username" : username,
                "email" : email,
                "userresume_ids" : resume
            })
        })
    }
}

export default NewUser;