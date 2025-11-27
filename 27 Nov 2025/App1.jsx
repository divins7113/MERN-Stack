import { createRoot } from 'react-dom/client'
import { useState } from 'react'

function MyForm() {
  const [mytxt, setMytxt] = useState("");

  function handleChange(e) {
    setMytxt(e.target.value);
  }

  return (
    <form>
      <label>Write here:
        <textarea
          value={mytxt}
          onChange={handleChange}
        />
      </label>
      <p>Current value: {mytxt}</p>
    </form>
  )
}

createRoot(document.getElementById('root')).render(
  <MyForm />
);