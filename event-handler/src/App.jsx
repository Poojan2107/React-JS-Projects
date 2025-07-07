import React, { useState } from 'react';

const App = () => {
  const [username, setUsername] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [usernameErrors, setUsernameErrors] = useState('');
  const [contactErrors, setContactErrors] = useState('');
  const [emailErrors, setEmailErrors] = useState('');
  const [passwordErrors, setPasswordErrors] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    setUsernameErrors('');
    setContactErrors('');
    setEmailErrors('');
    setPasswordErrors('');

    let isValidate = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    const contactRegex = /^[0-9]{10}$/;

    if (username.trim() === '') {
      setUsernameErrors("Username is Required!");
      isValidate = false;
    }

    if (contact.trim() === '') {
      setContactErrors("Contact No is Required!");
      isValidate = false;
    } else if (!contactRegex.test(contact)) {
      setContactErrors("Enter a valid 10-digit Contact No!");
      isValidate = false;
    }

    if (email.trim() === '') {
      setEmailErrors("Email is Required!");
      isValidate = false;
    } else if (!emailRegex.test(email)) {
      setEmailErrors("Enter a valid Email!");
      isValidate = false;
    }

    if (password.trim() === '') {
      setPasswordErrors("Password is Required!");
      isValidate = false;
    } else if (!passwordRegex.test(password)) {
      setPasswordErrors("Password must be at least 6 characters with letters and numbers!");
      isValidate = false;
    }

    if (isValidate) {
      console.log("Username:", username);
      console.log("Contact:", contact);
      console.log("Email:", email);
      console.log("Password:", password);

      setUsername('');
      setContact('');
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div style={{ maxWidth: "500px", padding: "20px" }}>
      <form method="post" onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={username}
            placeholder="Enter Username..."
            onChange={(e) => setUsername(e.target.value)}
          />
          {usernameErrors && <p style={{ color: "red" }}>{usernameErrors}</p>}
        </div>

        <div>
          <input
            type="tel"
            value={contact}
            placeholder="Enter Contact No..."
            onChange={(e) => setContact(e.target.value)}
          />
          {contactErrors && <p style={{ color: "red" }}>{contactErrors}</p>}
        </div>

        <div>
          <input
            type="email"
            value={email}
            placeholder="Enter Email..."
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailErrors && <p style={{ color: "red" }}>{emailErrors}</p>}
        </div>

        <div>
          <input
            type="password"
            value={password}
            placeholder="Enter Password..."
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordErrors && <p style={{ color: "red" }}>{passwordErrors}</p>}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;



