import Router       from '../Utlis/Router.js'
import SendRequest from '../Utlis/SendRequest.js'

let ShowInterview = {
    render : async (id) => {
        let interview =  await SendRequest.send('http://localhost:3000/interviews/'+id,'GET');
        let view = 
            `<hr>
            <p><strong>Start Time: </strong>  ${interview.id} </p>
            <p><strong>Start Time: </strong> ${interview.startTime} </p>
            <p><strong>End Time: </strong> ${interview.endTime} </p>   
            <table>
                ${interview.users.map(user =>`
                <tr>
                    <td> ${user.id} <td>
                    <td> ${user.username} <td>
                    <td> ${user.email} <td>
                </tr>
                `).join('\n')}
            </table>
            `
        return view
    }
    , after_render: async () => {
    }

}

export default ShowInterview;
