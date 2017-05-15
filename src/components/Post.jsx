class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.post;
  }

  /**
   * now
   * @return {Date} Current timestamp in JST (which reddit appears to use)
   */
  now() {
      let now = new Date;
      let timestampNow = Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        now.getUTCHours() + 8, // JST
        now.getUTCMinutes(),
        now.getUTCSeconds(),
        now.getUTCMilliseconds()
      );
      timestampNow = new Date(timestampNow);
      return timestampNow;
  }

  timeSinceCreation(created) {
    let timestampCreated = new Date(created * 1000);
    let timeSinceCreation = this.now() - timestampCreated; // milliseconds
    timeSinceCreation = Math.round(timeSinceCreation / 1000); // seconds, rounded
    return timeSinceCreation;
  }

  render() {
    return (
      <div>
        {this.state.data.title} <br />
        {this.state.data.author} <br />
        /r/{this.state.data.keto} <br />
        {this.state.data.url} <br />
        {this.state.data.selftext} <br />
        {this.timeSinceCreation(this.state.data.created)} seconds <br />
        score: {this.state.data.score} <br />

        {this.state.data.thumbnail.substr(0, 4) == 'http' ?
          `<img src="${this.state.data.thumbnail}" />` : ''
        }
        <hr />
      </div>
    );
  }
}
