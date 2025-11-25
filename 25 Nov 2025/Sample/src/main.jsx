import { createRoot } from 'react-dom/client';
import { useState } from 'react';

function App() {
  const [form, setForm] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    age: '',
    gender: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" placeholder="Username" value={form.username} onChange={handleChange} /><br/><br/>
      <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} /><br/><br/>
      <input name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} /><br/><br/>
      <input name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} /><br/><br/>
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange}/><br/><br/>
      <input name="age" type="number" placeholder="Age" value={form.age} onChange={handleChange} min="1" /><br/><br/>

      <label>
        <input type="radio" name="gender" value="male" onChange={handleChange} />
        Male
      </label>
      <label>
        <input type="radio" name="gender" value="female" onChange={handleChange} />
        Female
      </label>
      <label>
        <input type="radio" name="gender" value="other" onChange={handleChange} />
        Other
      </label><br/><br/>

      <button type="submit">Submit</button>
    </form>
  );
}

createRoot(document.getElementById('root')).render(<App />);