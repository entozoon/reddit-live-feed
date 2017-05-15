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
      <div className='post' data-delay={this.state.delay}>
        {this.state.data.thumbnail.substr(0, 4) == 'http' ?
          <a href={this.state.data.url} target='_blank'>
            <img src={this.state.data.thumbnail} />
          </a> : ''
        }

        <div>
          <div>
            <a href={this.state.data.url} target='_blank'>{this.state.data.title}</a>
          </div>

          <div>
            /r/{this.state.data.subreddit} :: @{this.state.data.author}
          </div>

          <div>
            {this.timeSinceCreation(this.state.data.created)} seconds ago <br />
          </div>

          {this.state.data.selftext}
        </div>
      </div>
    );
  }
}
