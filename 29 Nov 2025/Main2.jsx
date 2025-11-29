import { useState } from 'react';
import { createRoot } from 'react-dom/client';

function Component1() {
  const [user, setUser] = useState("Linus");

  return (
    <>
      <h1>{`Hello ${user}!`}</h1>
      <Component2 user={user} />
    </>
  );
}

function Component2({ user }) {
  return (
    <>
      <h1>Component 2</h1>
      <Component3 user={user} />
    </>
  );
}

function Component3({ user }) {
  return (
    <>
      <h1>Component 3</h1>
      <h2>{`Hello ${user} again!`}</h2>
    </>
  );
}

// Render the app
createRoot(document.getElementById('root')).render(<Component1 />);