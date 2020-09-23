import Router from '../Utlis/Router.js';
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
                Usertype
                <select class="form-control" id="usertype" name="usertype">
                    <option value="admin">admin</option>
                    <option value="participant">participant</option>
                </select>
            </div>
            <div>
                Resume
                    
            </div><input type="file" class="form-control-file" id="resume" name="resume">
            <button type="button" id="newuserbutton">CREATE</button>
            
            <a href= "#/users">BACK</a>
        <form>
        `
    }
    , after_render: async () => {
        document.getElementById("newuserbutton").addEventListener ("click",  async () => {
            let username       = document.getElementById("username").value;
            let usertype       = document.getElementById("username").value;
            let email          = document.getElementById("email").value;
            let resume         = document.getElementById("resume").files;
            if(resume.length > 0) resume = resume[0];

            let response = await SendRequest.send('http://localhost:3000/users/',"POST", {
                "username" : username,
                "email" : email,
                "resume" : resume,
                "usertype" : usertype
            })
            Router.redirect("Users")
        })
    }
}

export default NewUser;