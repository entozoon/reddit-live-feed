//
// Compiles into /dist as vanilla Javascript (es2015)
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
