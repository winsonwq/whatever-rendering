
export default [
  { name: 'root$', method: 'get', path: '/', viewName: 'todo-list-app' },
  { name: 'activity$', method: 'get', path: '/activities/:id', viewName: 'activity' },
  { name: 'readme$', method: 'get', path: '/readme', viewName: 'readme' }
];
