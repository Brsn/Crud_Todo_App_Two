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
        this.onChangeTodoName = this.onChangeTodoName.bind(this);
        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChangeTodoDescription(e) {
        this.setState({
            todo_description: e.target.value
        });
    }
    onChangeTodoName(e) {
        this.setState({
            todo_name: e.target.value
        });
    }
    onSubmit(e) {
        e.preventDefault();

        console.log(`Form submitted:`);
        console.log(`Todo Name: ${this.state.todo_name}`);
        console.log(`Todo Description: ${this.state.todo_description}`);
        console.log(`Todo Completed: ${this.state.todo_completed}`);

        const newTodo = {
            todo_name: this.state.todo_name,
            todo_description: this.state.todo_description,
            todo_completed: this.state.todo_completed
        }

        axios.post("http://localhost:5000/todos/add", newTodo)
            .then(res => console.log(res.data));
        this.setState({
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
                        />
                    </div>
                    <div className="form-group">
                        <label>Todo Description: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.todo_description}
                            onChange={this.onChangeTodoDescription}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Todo" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}