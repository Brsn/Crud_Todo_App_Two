import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Todo = props => (
    <tr>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_name}</td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_description}</td>
        <td>
            <Link to={"/edit/" + props.todo._id}>Edit</Link>

        </td>
        <td>

            <Link to={"/delete/" + props.todo._id}> Delete</Link>
        </td>
    </tr>
)

export default class TodosList extends Component {

    constructor(props) {
        super(props);
        this.state = { todos: [] };


        this.refreshPage = this.refreshPage.bind(this)

    }


    refreshPage() {
        axios.get('https://localhost:5000/todos/')
            .then(response => {
                this.setState({ todos: response.data });

            })
            .catch(function (error) {
                console.log("Testing for an error:", error);
            })
    }

    componentDidMount() {

        this.refreshPage();



    }


    //when the component is updated through the edit-to, the page will render automatically

    // componentDidUpdate() {
    //     axios.get('http://localhost:5000/todos/')
    //         .then(response => {
    //             if (this._isMounted) {
    //                 this.setState({ todos: response.data });
    //             }
    //             this.refreshPage();

    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         })
    // }
    todoList() {
        return this.state.todos.map(function (currentTodo, i) {
            return <Todo todo={currentTodo} key={i} />;
        });
    }

    render() {
        return (
            <div>
                <h3>Todos List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Todo Name</th>
                            <th>Description</th>
                            <th>Completed</th>
                            <th>Delete </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.todoList()}
                    </tbody>
                </table>
            </div>
        )
    }
}