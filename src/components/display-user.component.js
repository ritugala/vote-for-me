import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
function User(props){
    return(
        <tr>
            <td>{props.user.username}</td>
            <td>{props.user.bio}</td>
            <td>{props.user.votes}</td>
            <td>
                <Link to={"/edit/"+props.user._id}>Edit</Link> | <a href='#' onClick={()=>props.deleteUser(props.user._id)}>Delete</a>
            </td>
        </tr>
    )
}

export default class DisplayUser extends Component{
    constructor(props){
        
        super(props)
        this.state=({
         users:[]   
        })
        this.clearUsers = this.clearUsers.bind(this)
        this.deleteUser = this.deleteUser.bind(this)
    }

    clearUsers(){
        console.log('Ented on clicking')
        var temp = JSON.parse(localStorage.getItem('CompletedUsers'))
        temp = []
        localStorage.setItem('CompletedUsers', JSON.stringify(temp))
        for(var i=0; i<this.state.users.length; i++)
        {
            this.deleteUser(this.state.users[i]._id)
        }
        console.log(JSON.parse(localStorage.getItem('CompletedUsers')))


    }

    componentDidMount(){
        axios.get('http://localhost:5000/users')
           .then(response=>{
               if(response.data.length>0){                  
                   this.setState({
                       users :response.data.sort((a, b)=> {
                        return (a.votes > b.votes) ? -1 :  1;
                    })
                   })
                //    for(var i=0; i<response.data.length; i++)
                //    {
                //        chosen_users[response.data[i].username] = {}
                //        for(var j=0; j<response.data.length-1; j++)
                //        {
                //            if(i!=j)
                //                 chosen_users[response.data[i].username][response.data[j].username] = false
                //        }
                //    }
                  
                
               }
           })
           .catch(err=>console.log('Errorrrrrrr',err))
    }

    userList(){
        return this.state.users.map(user=>{
            return <User user={user} key={user._id} deleteUser={this.deleteUser}/>
        })
    }

    deleteUser(id){
        console.log('deleted user')
        axios.delete("http://localhost:5000/users/"+id)
          .then(res=>{
              console.log(res)
              this.setState({
                users:this.state.users.filter(user=>user._id!=id)
            })
          })
          .catch(err=>console.log('Errorrr'+err))
          
    }

    render(){
        return(
            <div>
                <h3>Current Users</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Bio</th>
                            <th>Votes</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.userList()}
                    </tbody>
                </table>
                <button onClick={this.clearUsers} type="button" className="btn btn-primary">Clear All Users</button>
            </div>
        )
    }

}
// chosen_users = {"Hi":"Hi"}
// console.log(chosen_users)
// export {chosen_users}