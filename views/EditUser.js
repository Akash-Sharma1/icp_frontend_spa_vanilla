import Router            from '../Utlis/Router.js'
import SendRequest from '../Utlis/SendRequest.js'

let NewUser = {

    render: async (id) => {
        let user = await SendRequest.send('http://localhost:3000/users/'+id,"GET");
        return `
        <form>
            <div>
                Username
                <input type="text" class="form-control-file" id="username" name="username" value=${user.username}>
            </div>
            <div>
                Email
                <input type="email" class="form-control" aria-describedby="emailHelp" placeholder="Enter email" id="email" name="email"  value=${user.email}>
            </div>
            <div>
                Usertype
                <select class="form-control" id="usertype" name="usertype" >
                    <option value="admin">admin</option>
                    <option value="participant">participant</option>
                </select>
            </div>
            <div>
                Resume
                    <input type="file" class="form-control-file" id="resume" name="resume">
            </div>
            <button type="button" id="edituserbutton" user_id = "${user.id}">EDIT</button>
            
            <a href=  ${Router.getpath("Users")}>BACK</a>
        <form>
        `
    }
    , after_render: async () => {
        document.getElementById("edituserbutton").addEventListener ("click",  async (e) => {
            let username       = document.getElementById("username").value;
            let usertype       = document.getElementById("username").value;
            let email          = document.getElementById("email").value;
            let resume         = document.getElementById("resume").value;

            let response = await SendRequest.send('http://localhost:3000/users/'+e.path[0].attributes.user_id.value,"PATCH", {
                "username" : username,
                "email" : email,
                "resume" : resume,
                "usertype" : usertype
            })
            Router.redirect("Users");
        })
    }
}

export default NewUser;