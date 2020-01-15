import React, { Component } from 'react';
import axios from "axios";

export default class deleteTodo extends Component {

    constructor(props) {
        super(props);
        this.onChangeTodoName = this.onChangeTodoName.bind(this);
        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            todo_name: '',
            todo_description: '',

        }
    }
    componentDidMount() {
        axios.get('https://localhost:5000/todos/' + this.props.match.params.id)
            //get request to the backend "server" for the todolist
            .then(response => {
                this.setState({
                    //sets updated state properties w
                    todo_name: response.data.todo_name,
                    todo_description: response.data.todo_description,
                })
            })
            .catch(function (error) {
                console.log(error)
            })
    }
    onChangeTodoName(e) {
        this.setState({
            todo_name: e.target.value
        });
    }
    onChangeTodoDescription(e) {
        this.setState({
            todo_description: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            todo_name: this.state.todo_name,
            todo_description: this.state.todo_description,
        };
        axios.delete("https://localhost:5000/todos/delete/" + this.props.match.params.id, obj)
            //deletes our todo in the backend by matching the id and using the onsubmit object
            .then(res => console.log(res.data));
        //this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <h3>Update Todo</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name: </label>
                        <input type="text" className="form-control" value={this.state.todo_name} onChange={this.onChangeTodoName}>
                        </input>
                    </div>
                    <div>
                        <div className="form-group">
                            <label>Description: </label>
                            <input type="text" className="form-control" value={this.state.todo_description} onChange={this.onChangeTodoDescription}>
                            </input>
                        </div>
                        <br />
                        <div className="form-group">

                            <input type="submit" value="Delete Todo" className="btn btn-primary" />
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
