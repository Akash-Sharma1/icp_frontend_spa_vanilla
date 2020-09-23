import Router            from '../Utlis/Router.js'
import SendRequest from '../Utlis/SendRequest.js'

let NewUser = {

    render: async (request) => {
        let id = request["id"]
        let user = await SendRequest.send('http://localhost:3000/users/'+id,"GET");
        return `
        <form id="edit_user_form" enctype="multipart/form-data"  user_id = "${user.id}">
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
            <button type="submit" >EDIT</button>
            
            <a href=  ${Router.getpath("Users")}>BACK</a>
        <form>
        `
    }
    , after_render: async () => {
        const edit_form = document.getElementById("edit_user_form")
        edit_form.onsubmit = async (e) => {
            
            e.preventDefault();
            let username       = document.getElementById("username").value;
            let usertype       = document.getElementById("username").value;
            let email          = document.getElementById("email").value;
            let resume         = document.getElementById("resume").files;
            if(resume.length > 0) resume = resume[0];

            let response = await SendRequest.send('http://localhost:3000/users/'+e.path[0].attributes.user_id.value,"PATCH","POST", {
                "username" : username,
                "email" : email,
                "resume" : resume,
                "usertype" : usertype
            })
            // Router.redirect("Users");
        }
    }
}

export default NewUser;