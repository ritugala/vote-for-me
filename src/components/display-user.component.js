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
            </div>
        )
    }

    

}