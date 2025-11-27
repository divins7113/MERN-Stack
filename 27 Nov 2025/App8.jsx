import { createRoot } from 'react-dom/client';
import { useState } from 'react';
import { createPortal } from 'react-dom';

function PortalButton({ onClick, children }) {
  return createPortal(
    <button 
      onClick={onClick}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        padding: '10px',
        background: 'blue',
        color: 'white'
      }}>
      {children}
    </button>,
    document.body
  );
}

function App() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  return (
    <div
      style={{
        padding: '20px',
        border: '2px solid black',
        margin: '20px'
      }}
      onClick={() => {
        setCount1(c => c + 1);
      }}>
      <h2>Div Clicked: {count1}</h2>
      <h2>Button Clicked: {count2}</h2>      
      <p>The floating button is rendered outside this box using a portal,
          but its clicks still bubble up to this parent div!</p>
      <p>Try to click the div element as well, to see the count increase</p>
      
      <PortalButton
        onClick={(e) => {
          // This runs first
          setCount2(c => c + 1);
        }}>
        Floating Button
      </PortalButton>
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <App />
);