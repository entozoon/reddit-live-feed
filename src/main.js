//
// Concatenates all /src files into /dist.app.js as compiles to vanilla Javascript (es2015)
//

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Posts />
    );
  }
}

ReactDOM.render(
  <Main />,
  document.getElementById('root')
);
