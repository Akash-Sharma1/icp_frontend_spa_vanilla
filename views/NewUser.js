import Router from '../Utlis/Router.js';
import SendRequest from '../Utlis/SendRequest.js'

let NewUser = {

    render: async () => {
        return `
        <form id="new_user_form">
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
            <button type="submit" id="newuserbutton">CREATE</button>
            
            <a href= "#/users">BACK</a>
        <form>
        `
    }
    , after_render: async () => {
        const new_form = document.getElementById("new_user_form");
        new_form.onsubmit =   async (e) => {
            e.preventDefault();
            const formData = new FormData(new_form);

            let response = await SendRequest.send('http://localhost:3000/users/',"POST", formData, "formdata");
            let status = response.status;
            if (status == 200 || status == 201)
                Router.redirect("Users")
        }
    }
}

export default NewUser;