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
                    <input type="file" class="form-control-file" id="resume" name="resume">
            </div>
            <button type="button" id="newuserbutton">CREATE</button>
            
            <a href= "#/users">BACK</a>
        <form>
        `
    }
    , after_render: async () => {
        document.getElementById("newuserbutton").addEventListener ("click",  () => {
            let username       = document.getElementById("username").value;
            let usertype       = document.getElementById("username").value;
            let email          = document.getElementById("email").value;
            let resume         = document.getElementById("resume").value;

            console.log(resume);
            SendRequest.send('http://localhost:3000/users/',"POST", {
                "username" : username,
                "email" : email,
                "resume" : resume,
                "usertype" : usertype
            })
        })
    }
}

export default NewUser;