import React, {Component} from 'react'
import axios from 'axios'

export default class EditUser extends Component{
    constructor(props){
        super(props)
        
        this.onChangeBio = this.onChangeBio.bind(this)
        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state={
            username:"",
            bio:"",
        }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/users/'+this.props.match.params.id)
            .then(response=>{
                this.setState({
                    username: response.data.username,
                    bio: response.data.bio,
                })
            })
            .catch(err=>{
                console.log(err)
            })


        

    }

    onChangeUsername(e){
        this.setState({
            username:e.target.value
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
            username: this.state.username,
            bio: this.state.bio,
        }
        console.log(user)
        axios.post('http://localhost:5000/users/update/'+this.props.match.params.id, user)
           .then(res=>console.log(res))
           .catch(err=>console.log(err))
        window.location='/'
    }
    render(){
        return(
            <div>
                <h3>Update User!</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Usename:</label>
                        <input type="text" required className="form-control" value={this.state.username} onChange = {this.onChangeUsername}/>
                        </div>
                             <div className="form-group">
                                 <label>Bio</label>
                                 <textarea required className="form-control" value={this.state.bio} onChange={this.onChangeBio}/>
                             </div>
                             <div className="form-group">
                                 <input type="submit"  className="btn btn-primary" value="Update Exercise Log" />
                             </div>
                </form>
            </div>
        )
    }
}


