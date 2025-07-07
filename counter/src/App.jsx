import React, { useState, Component } from 'react';

// Functional Component
const FunctionalCounter = () => {
  const [count, setCount] = useState(0);

  return (
    <div style={styles.box}>
      <h2>Functional Counter</h2>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)} style={{ marginLeft: "10px" }}>Decrement</button>
      <button onClick={() => setCount(0)} style={{ marginLeft: "10px" }}>Reset</button>
    </div>
  );
};

// Class Component
class ClassCounter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  }

  decrement = () => {
    this.setState({ count: this.state.count - 1 });
  }

  reset = () => {
    this.setState({ count: 0 });
  }

  render() {
    return (
      <div style={styles.box}>
        <h2>Class Counter</h2>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>Increment</button>
        <button onClick={this.decrement} style={{ marginLeft: "10px" }}>Decrement</button>
        <button onClick={this.reset} style={{ marginLeft: "10px" }}>Reset</button>
      </div>
    );
  }
}

const App = () => {
  return (
    <div style={styles.container}>
      <FunctionalCounter />
      <ClassCounter />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    gap: '40px',
    padding: '40px',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  box: {
    padding: '20px',
    border: '2px solid #ddd',
    borderRadius: '8px',
    width: '250px',
    textAlign: 'center',
    backgroundColor: '#f9f9f9'
  }
};

export default App;
