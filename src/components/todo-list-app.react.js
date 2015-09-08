import React from 'react';
// import RR from 'reactive-react';

// import TodoListStore from '../stores/todo-list.store';

class TodoListApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = { todos: props.todos, text: '' };
  }

  componentDidMount() {
    // RR.subscribe(TodoListStore, { todos$: 'todosChange' });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ todos: nextProps.todos });
  }

  todosChange(data) {
    this.setState({ todos: data.todos });
  }

  handleSubmit(evt) {
    evt.preventDefault();
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
        <form onSubmit={ this.handleSubmit }>
          <input onChange={ this.handleTextChange } value={ this.state.text } />
          <button>{'Add #' + (this.state.todos.length + 1)}</button>
        </form>
      </div>
    );
  }

}

TodoListApp.displayName = 'TodoListApp';

export default TodoListApp;
