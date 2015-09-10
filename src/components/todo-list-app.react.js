import React from 'react';
import RR from 'reactive-react';
import Link from './link.react';

import TodoListStore from '../stores/todo-list.store';

const submitTodo$ = RR.Observable.bind('submitTodo$');

class TodoListApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = { todos: props.todos || [], text: '' };
  }

  componentDidMount() {
    this.setState({
      todoDisposable: TodoListStore.todos$.subscribe(this.todosChange.bind(this))
    });
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
      <div>
        <h1>TODO</h1>
        <ul>
          { todoItems }
        </ul>
        <form onSubmit={ this.handleSubmit.bind(this) }>
          <input type="text" onChange={ this.handleTextChange.bind(this) } value={ this.state.text }/>
          <button>{'Add #' + (this.state.todos.length + 1)}</button>
        </form>
        <Link path="/readme">Readme</Link>
      </div>
    );
  }

}

TodoListApp.displayName = 'TodoListApp';

export default TodoListApp;
