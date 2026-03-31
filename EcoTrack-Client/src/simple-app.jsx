import React from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  const [count, setCount] = React.useState(0);
  
  return React.createElement('div', null, 
    React.createElement('h1', null, 'EcoTrack - Working!'),
    React.createElement('p', null, 'React hooks are working!'),
    React.createElement('p', null, `Count: ${count}`),
    React.createElement('button', {
      onClick: () => setCount(count + 1)
    }, 'Increment'),
    React.createElement('br', null),
    React.createElement('a', {
      href: '/login'
    }, 'Go to Login'),
    React.createElement('br', null),
    React.createElement('a', {
      href: '/register'
    }, 'Go to Register')
  );
}

createRoot(document.getElementById("root")).render(
  React.createElement(App, null)
);
