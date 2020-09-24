import Router            from '../Utlis/Router.js'
import SendRequest       from '../Utlis/SendRequest.js'

let users = {
    render : async () => {
        let users = await SendRequest.send('http://localhost:3000/users/','GET');
        let view =  `
            <a href= ${Router.getpath("NewUser")}>New user</a>
            <table>
                ${users.map(user =>`
                <tr>
                    <td> ${user.id} </td>
                    <td> ${user.username} </td>
                    <td> ${user.email} </td>
                    <td> <a href="http://localhost:3000${user.resume}">Resume link</a> </td>
                    <td><a href= ${Router.getpath("ShowUser", {"id":user.id} )} >View User</a></td>
                    <td><a href= ${Router.getpath("EditUser", {"id":user.id} )} >Edit User</a></td>
                    <td><a href= ${Router.getpath("Users")} Name="deletebtns" user_id=${user.id}  >delete User</a></td>
                </tr>
                `).join('\n')}
            </table>`
        return view;
    }
    , after_render: async () => {
        let elbynames = document.getElementsByName("deletebtns");
        
        for(let i=0;i<elbynames.length;i++){
            elbynames[i].addEventListener ("click",  async (e) => {
                let response = await SendRequest.send('http://localhost:3000/users/'+e.path[0].attributes.user_id.value,'DELETE');
                let status = response.status;
                if (status == 200 || status == 201)
                    Router.redirect("Users");
            })
        }
          
    }

}

export default users;
