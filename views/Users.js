import SendRequest       from '../Utlis/SendRequest.js'

let users = {
    render : async () => {
        let users = await SendRequest.send('http://localhost:3000/users/','GET');
        let view =  `<table>
                ${users.map(user =>`
                <tr>
                    <td> ${user.id} <td>
                    <td> ${user.username} <td>
                    <td> ${user.email} <td>
                    <td><a href="#/users/${user.id}" >View User</a></td>
                </tr>
                `).join('\n')}
            </table>`
        return view;
    }
    , after_render: async () => {
    }

}

export default users;
