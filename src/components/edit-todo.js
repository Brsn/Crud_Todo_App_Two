import React, { Component } from 'react';
import axios from 'axios';



export default class TodosList extends Component {
    constructor(props) {
        super(props);
        this.onChangeTodoName = this.onChangeTodoName.bind(this);
        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        this.onChangeTodoCompleted = this.onChangeTodoCompleted.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            todo_name: '',
            todo_description: '',
            todo_completed: false
        }
    }
    componentDidMount() {
        axios.get('http://localhost:5000/todos/' + this.props.match.params.id)
            //get request to the backend "server" for the todolist
            .then(response => {
                this.setState({
                    //sets updated state properties w
                    todo_name: response.data.todo_name,
                    todo_description: response.data.todo_description,
                    todo_completed: response.data.todo_completed
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
    onChangeTodoCompleted(e) {
        this.setState({
            todo_completed: !this.state.todo_completed
        })
    }
    onSubmit(e) {
        e.preventDefault();
        const obj = {
            todo_name: this.state.todo_name,
            todo_description: this.state.todo_description,
            todo_completed: this.state.todo_completed
        };
        axios.post("http://localhost:5000/todos/update/" + this.props.match.params.id, obj)
            //updates our todo in the backend by matching the id and using the onsubmit object
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
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="completedCheckbox"
                                name="completedCheckBox" onChange={this.onChangeTodoCompleted} checked={this.state.todo_completed}
                                value={this.state.todo_completed}
                            />
                            <label className="form-check-label" htmlFor="completedCheckbox">
                                Completed
                        </label>
                        </div>
                        <br />
                        <div className="form-group">
                            <input type="submit" value="Update Todo" className="btn btn-primary" />
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
