import React from 'react';
import RR from 'reactive-react';
import Link from './link.react';

import { todos$ } from '../stores/todo-list.store';

const submitTodo$ = RR.Observable.bind('submitTodo$');

class TodoListApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = { todos: props.todos || [], text: '' };
  }

  componentDidMount() {
    this.setState({
      todoDisposable: todos$.subscribe(this.todosChange.bind(this))
    });

    var input = this.refs.taskTextInput.getDOMNode();
    input.focus();
  }

  componentWillUnmount() {
    this.state.todoDisposable.dispose();
  }

  todosChange(data) {
    this.setState({ todos: data.todos });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    submitTodo$({ text: this.state.text });
    this.setState({ text: '' });
  }

  handleTextChange(evt) {
    this.setState({ text: evt.target.value });
  }

  render() {

    var todoItems = this.state.todos.map(function(item) {
      return (<li>{ item.text }</li>);
    });

    return (
      <div className="todo-list-app">
        <h1>todos</h1>
        <div className="app-container">
          <form onSubmit={ this.handleSubmit.bind(this) }>
            <input placeholder="What needs to be done?" ref="taskTextInput" type="text" onChange={ this.handleTextChange.bind(this) } value={ this.state.text }/>
            <button>{'Add #' + (this.state.todos.length + 1)}</button>
          </form>
          <ul>
            { todoItems }
          </ul>
        </div>
        <p className="bottom-bar">
          <Link path="/readme">about whatever-rendering &raquo;</Link>
        </p>
      </div>
    );
  }

}

TodoListApp.displayName = 'TodoListApp';

export default TodoListApp;
