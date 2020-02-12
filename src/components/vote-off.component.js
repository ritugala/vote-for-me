import React, {Component} from 'react'
import axios from 'axios'

export default class VoteOff extends Component{
    constructor(props){
        super(props)

        this.choseUser2 = this.choseUser2.bind(this)
        this.choseUser1 = this.choseUser1.bind(this)
        this.isPossible = this.isPossible.bind(this)
        this.state={
            users:[],
            max_count:0,
            completed_users:[]

        }
    }

    isPossible(user1, user2, max_count){
        console.log('Is possible has been entered   '+this.state.completed_users.length)
        
        var CompletedUsers  = JSON.parse(localStorage.getItem("CompletedUsers"))
        if(max_count+1===CompletedUsers.length)
        {
            console.log('MAx has been reachd')
            window.location = '/'
        }
        for(var i=0; i<CompletedUsers.length; i++)
        {
            console.log("comparong time",CompletedUsers[i][0],CompletedUsers[i][1])
            if((CompletedUsers[i][0]===user1&&CompletedUsers[i][1]===user2)||(CompletedUsers[i][1]===user1&&CompletedUsers[i][0]===user2))
            {
                console.log('True was returned for:'+user1+user2)
                return true;

            }
                
        }
        return false;
        
    }
    componentDidMount(){
       
        axios.get('http://localhost:5000/users')
          .then(res=>{
              console.log(res.data[0])
              if(res.data.length>1)
              {
                //   var temp = []
                // localStorage.setItem('CompletedUsers', JSON.stringify(temp))
                  var n = res.data.length;
                var CompletedUsers = JSON.parse(localStorage.getItem('CompletedUsers'))
                console.log("This is inital completed users"+CompletedUsers)
                var max_count = (n*(n-1))/2;
                //var max_count = 10;
                var index1 = Math.floor(Math.random()*res.data.length)
                var index2 = Math.floor(Math.random()*res.data.length)
                var count = 0;
                var ext_counter = 0
                while(index1===index2||Math.abs(res.data[index1].votes-res.data[index2].votes)>2||this.isPossible(res.data[index1].username,res.data[index2].username, max_count)===true)
                {
                    ext_counter+=1
                    if(count==4){
                        index1 = Math.floor(Math.random()*res.data.length)
                        count=0;
                    }
                    index2 = Math.floor(Math.random()*res.data.length)
                    count++;
                    if(ext_counter===max_count)
                    {
                        console.log('ext counters had come')
                        console.log(ext_counter)
                        window.location='/user'
                        break
                    }
                }

                console.log(index2, index1)
                var chosenUsers = [res.data[index1], res.data[index2]]
                
                this.setState(previousState=>{
                    
                     CompletedUsers.push([res.data[index1].username, res.data[index2].username])
         
                     console.log("New chosenUsers is",CompletedUsers)
                    return{
                        //completed_users:[1,2,3]
                        max_count  :max_count,
                        users: chosenUsers,
                        completed_users:CompletedUsers

                    }
                
                 })
                 console.log("state lemgth"+this.state.completed_users.length)
                 localStorage.setItem('CompletedUsers',JSON.stringify(CompletedUsers))
              }
          })    
              
          
          .catch(err=>console.log('Errorrr'+err))

          
    }
    choseUser1(e){
        
        var user={
            username: this.state.users[0].username,
                bio: this.state.users[0].bio,
                votes: 1+this.state.users[0].votes,
                img: this.state.users[0].img
        }
        
        
        axios.post('http://localhost:5000/users/chosen/'+this.state.users[0]._id, user)
            .then(res=>{console.log(res);console.log('upfated')})
            .catch(err=>{console.log(err);console.log('upfated')})
        console.log('User1 updated successfully '+user.votes)


        // this.setState((previousState)=>{            
                

        //         console.log("New array is",previousState.completed_users[0])
        //         return{
        //             completed_users:previousState.completed_users
        //         }
        
        //  }, ()=>)
        console.log('This is afater chooseing'+this.state.completed_users.length+this.state.max_count)
            if(this.state.completed_users.length===this.state.max_count)
            {
                window.location = '/user'
            }
            else{
                window.location='/voteoff'
            }
       
   
        
        
    }

    choseUser2(e){
        
        var user={
                username: this.state.users[1].username,
                bio: this.state.users[1].bio,
                votes: this.state.users[1].votes+1,
                img:this.state.users[1].img
             }
    // this.setState(previousState=>{
    //     return{
    //         completed_users: previousState.completed_users.push([this.state.users[0].username, this.state.users[1].username])
    //     }
    // })
             axios.post('http://localhost:5000/users/chosen/'+this.state.users[1]._id, user)
                .then(res=>console.log(res))
                .catch(err=>console.log(err))
        
            console.log('User2 updated successfully '+user.votes)
            console.log('This is afater chooseing'+this.state.completed_users.length+this.state.max_count)
            if(this.state.completed_users.length===this.state.max_count)
            {
                window.location = '/user'
            }
            else{
                window.location='/voteoff'
            }

            
    }

    render(){
        return(
            <div>
                <h3>Vote Off</h3>
                <form>
                    <button className="btn btn-outline-dark btn-lg" type="submit" onClick={this.choseUser1}>{this.state.users.length>0?this.state.users[0].username:null}</button>
                    <button className="btn btn-outline-dark btn-lg" type="submit" onClick={this.choseUser2}>{this.state.users.length>0?this.state.users[1].username:null}</button>
                </form>
            </div>
        )
    }
}
