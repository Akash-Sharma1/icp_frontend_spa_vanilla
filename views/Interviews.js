import SendRequest       from '../Utlis/SendRequest.js'
import Router       from '../Utlis/Router.js'

let Interviews = {
    render : async () => {
        let interviews = await SendRequest.send('http://localhost:3000/interviews/','GET');
        let view =  `
        <a href= "#/new_interview">New interview</a>
        ${interviews.map(interview => 
            `<hr>
            <p><strong>Start Time: </strong> <a href= "#/interviews/${interview.id}">${interview.id}</a> </p>
            <p><strong>Start Time: </strong> ${interview.startTime} </p>
            <p><strong>End Time: </strong> ${interview.endTime} </p>   
            <table>
                ${interview.users.map(user =>`
                <tr>
                    <td> ${user.id} <td>
                    <td> ${user.username} <td>
                    <td> ${user.email} <td>
                    <td><a href="#/users/${user.id}" >View User</a></td>
                </tr>
                `).join('\n')}
            </table>
            <p>
                <a href="#/interviews/${interview.id}">View</a>
                <a href="#/edit_interview/${interview.id}">edit</a>
                <a href="#/interviews"  Name="deletebtns" interview_id=${interview.id} >delete</a>
            </p>
            `
        ).join('\n')}
    `
        return view;
    }
    , after_render: async () => {
        let elbynames = document.getElementsByName("deletebtns");
        
        for(let i=0;i<elbynames.length;i++){
            elbynames[i].addEventListener ("click",  async (e) => {
                let response = await SendRequest.send('http://localhost:3000/interviews/'+e.path[0].attributes.interview_id.value,'DELETE');
                Router.renderpage();
            })
        }
                    
    }

}

export default Interviews;
