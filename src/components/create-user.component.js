import React, {Component} from 'react'
import axios from 'axios'

export default class CreateUser extends Component{
    constructor(props){
        super(props)
        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.onChangeBio = this.onChangeBio.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onChangeImg = this.onChangeImg.bind(this)

        this.state={
            username : "",
            bio : "",
            img: ""
        }
    }

    onChangeImg(e){
        this.setState({
            img: e.target.value
        })
    }
    onChangeUsername(e){
        this.setState({
            username: e.target.value
        })
    }

    onChangeBio(e){
        this.setState({
            bio:e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();
        const user = {
            username : this.state.username,
            bio : this.state.bio,
            img: this.state.img
        }
        console.log(user)
        axios.post('http://localhost:5000/users/add', user)
           .then(res=>console.log(res.data))
           .catch(err=>console.log('Error: ', err))
        this.setState({
            username:"",
            bio:""
        })

               
    }
    render(){
        return(
            <div>
                <h3>Create User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" required className="form-control" value={this.state.username} onChange={this.onChangeUsername}/>   
                    </div>
                    <div className="form-group">
                        <label>Bio</label>
                        <textarea required className="form-control" value={this.state.bio} onChange={this.onChangeBio}/>   
                    </div>
                    <div className="form-group">
                        <label>Image</label>
                        <br/>
                        <input type="file"  name="pic" accept="image/*"/>
                    </div>
                    <div className="form-group">
                        <input className="btn btn-primary btn-lg" type="submit"/>
                    </div>
                </form>
            
            </div>
        )
    }
}