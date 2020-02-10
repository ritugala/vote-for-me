import React, {Component} from 'react'
import axios from 'axios'

export default class VoteOff extends Component{
    constructor(props){
        super(props)

        this.choseUser2 = this.choseUser2.bind(this)
        this.choseUser1 = this.choseUser1.bind(this)
        this.state={
            users:[]
        }
    }
    componentDidMount(){
        console.log('It did mount')
        axios.get('http://localhost:5000/users')
          .then(res=>{
              console.log(res.data[0])
              if(res.data.length>1)
              {
                var index1 = Math.floor(Math.random()*res.data.length)
                var index2 = Math.floor(Math.random()*res.data.length)
                
                while(index1===index2)
                {
    
                    index2 = Math.floor(Math.random()*res.data.length)
                }
                console.log(index2, index1)
            
                var chosenUsers = [res.data[index1], res.data[index2]]
                console.log(chosenUsers)
                this.setState({
                  users: chosenUsers
                })
                 console.log("This is the state"+(this.state.users))
              }
          })    
              
              
          .catch(err=>console.log('Errorrr'+err))
          
    }
    choseUser1(e){
        var temp = this.state.users[0].votes+1
        console.log(temp)
        var user={
            username: this.state.users[0].username,
                bio: this.state.users[0].bio,
                votes: temp,
                img: this.state.users[0].img
        }
        
        
        axios.post('http://localhost:5000/users/chosen/'+this.state.users[0]._id, user)
            .then(res=>{console.log(res);console.log('upfated')})
            .catch(err=>{console.log(err);console.log('upfated')})
        console.log('User1 updated successfully '+user.votes)
        window.location='/voteoff'
    }
    choseUser2(e){
        
        var user={
                username: this.state.users[1].username,
                bio: this.state.users[1].bio,
                votes: this.state.users[1].votes+1,
                img:this.state.users[1].img
             }
             axios.post('http://localhost:5000/users/chosen/'+this.state.users[1]._id, user)
                .then(res=>console.log(res))
                .catch(err=>console.log(err))
        
            console.log('User2 updated successfully '+user.votes)
            window.location='/voteoff'
        
    }

    render(){
        return(
            <div>
                <h3>Vote Off</h3>
                <form>
                    <button className="btn btn-outline-dark btn-md" type="submit" onClick={this.choseUser1}>{this.state.users.length>0?this.state.users[0].username:null}</button>
                    <button className="btn btn-outline-dark btn-md" type="submit" onClick={this.choseUser2}>{this.state.users.length>0?this.state.users[1].username:null}</button>
                </form>
            </div>
        )
    }
}
