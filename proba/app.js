class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        name: '', 
      };
    }
  
    // Funkcja do ustawiania stanu
    setName = (newName) => {
      this.setState({ name: newName });
    };
  
    render() {
      return (
        <div>
          <InputKomponent setName={this.setName} />
          <MessageComponent name={this.state.name} />
        </div>
      );
    }
  }
  
  // Renderowanie głównego komponentu do #root
  ReactDOM.render(<App />, document.getElementById('root'));