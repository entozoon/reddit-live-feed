class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.post;
  }

  render() {
    console.log(this.state.data);
    let timestamp = new Date(Number(this.state.data.created) * 1000);
    return (
      <div>
        {this.state.data.title} <br />
        {this.state.data.author} <br />
        /r/{this.state.data.keto} <br />
        {this.state.data.url} <br />
        {this.state.data.selftext} <br />
        {timeFormat(timestamp)} <br />
        score: {this.state.data.score} <br />

        {this.state.data.thumbnail.substr(0, 4) == 'http' ?
          `<img src="${this.state.data.thumbnail}" />` : ''
        }
        <hr />
      </div>
    );
  }
}
