import React, { Component } from 'react';
import axios from "axios";

export default class TodosList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            todo_name: '',
            todo_description: '',
            todo_completed: false
        }
        //bind the methods
        this.onChangeTodoName = this.onChangeTodoName.bind(this);
        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    // all of our set state methods
    onChangeTodoName(e) {
        this.setState({
            todo_name: e.target.value
        });
    }
    //for updates the state of name
    onChangeTodoDescription(e) {
        this.setState({
            todo_description: e.target.value
        });
    }
    //form updates the state of description 
    onSubmit(e) {
        e.preventDefault();

        console.log(`Form submitted:`);
        console.log(`Todo Name: ${this.state.todo_name}`);
        console.log(`Todo Description: ${this.state.todo_description}`);
        console.log(`Todo Completed: ${this.state.todo_completed}`);

        //stores are todos in an object
        const newTodo = {
            todo_name: this.state.todo_name,
            todo_description: this.state.todo_description,
            todo_completed: this.state.todo_completed
        }
        //we use axios to post with our server
        axios.post("http://localhost:5000/todos/add", newTodo)
            .then(res => console.log(res.data));
        this.setState({
            //here we reset the state after submitting
            todo_name: '',
            todo_description: '',
            todo_completed: false
        })
    }
    render() {
        return (
            <div style={{ marginTop: 20 }}>
                <h3>Create New Todo</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Todo Name: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.todo_name}
                            onChange={this.onChangeTodoName}
                        //call the onChange method to save to the state
                        />
                    </div>
                    <div className="form-group">
                        <label>Todo Description: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.todo_description}
                            onChange={this.onChangeTodoDescription}
                        //call the onChange method to save to the state
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Todo" className="btn btn-success" />
                    </div>
                </form>
            </div>
        )
    }
}