import { createRoot } from 'react-dom/client';
import { useState, useTransition } from 'react';

function SearchBarNormal() {
  const [text, setText] = useState('');
  const [results, setResults] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setText(value);

    let i = 0;
    while (i < 10_000_000) i++;
    
    setResults(value); 
  };

  return (
    <div>
      <h3>Normal </h3>
      <input value={text} onChange={handleChange} placeholder="Type fast..." />
      <p>Results: {results}</p>
    </div>
  );
}


function SearchBarTransition() {
  const [text, setText] = useState('');
  const [results, setResults] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    const value = e.target.value;
    setText(value); 

    startTransition(() => {
      let i = 0;
      while (i < 10_000_000) i++;
      setResults(value);
    });
  };

  return (
    <div>
      <h3>With use Transition </h3>
      <input value={text} onChange={handleChange} placeholder="Type fast here!" />
      {isPending ? <p style={{color: 'orange'}}>Updating results...</p> : <p>Results: {results}</p>}
    </div>
  );
}


function App() {
  return (
    <>
      <h1 style={{textAlign: 'center'}}>useTransition Demo</h1>
      <SearchBarNormal />
      <SearchBarTransition />
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);