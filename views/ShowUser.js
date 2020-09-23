
import SendRequest from '../Utlis/SendRequest.js'

let ShowUsers = {
    render : async (id) => {
        let user = await SendRequest.send('http://localhost:3000/users/'+id,'GET');
        let view =  `
                <p> ${user.id} </p>
                <p> ${user.username} </p>
                <p> ${user.email} </p>
                <p> <a href="http://localhost:3000${user.resume}">Resume link</a> </p>
                <a href= "#/users">BACK</a>
            `
        return view;
    }
    , after_render: async () => {
    }

}

export default ShowUsers;
