
it('smoke test', () => {
  const node = document.createElement('div');
  node.id = 'root';
  document.body.appendChild(node);

  const app = require('./'); 
});
