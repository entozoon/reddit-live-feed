class Posts extends React.Component {
  constructor(props) {
    super(props);

    this.updateDelay = 2500;

    this.state = {
      posts : [],
      mostRecentTimestamp: 0
    };

    this.updatePosts(true);
  }

  async downloadPosts() {
    try {
      let response = await fetch('https://www.reddit.com/new.json');
      let responseJson = await response.json();
      return responseJson.data.children;
    } catch(error) {
      console.error(error);
    }
  }

  addDelaysToPosts(posts, updateDelay) {
    let delayIncrement = updateDelay / posts.length;
    // Round to nearest .1s (e.g. 300ms)
    delayIncrement = Math.round(delayIncrement / 100) * 100;
    return posts.map((post, i) => {
      if (posts.length > 1) {
        post.delay = delayIncrement * i;
      }
      return post;
    });
  }

  updatePosts(firstRun) {
    this.downloadPosts()
      .then(posts => {
        //console.log('Posts received (most recent first)');
        //console.log(posts);

        // Chuck all but the most recent post if that's what we want, will accumulate later
        if (typeof firstRun != 'undefined') {
          posts = posts.splice(0, 1);
        }

        // Filter out posts older than the most recent one previously seen
        posts = posts.filter(post => {
          return (parseInt(post.data.created) > parseInt(this.state.mostRecentTimestamp));
        });

        // Must refresh fast enough for this to be less than 25 or it'll miss some
        //console.log('New posts: ' + posts.length);

        // Store the most recent timestamp
        this.setState({
          mostRecentTimestamp: posts[0].data.created
        });

        // Reverse posts, as we want most recent LAST
        posts.reverse();

        posts = this.addDelaysToPosts(posts, this.updateDelay);

        this.setState({
          posts: this.state.posts.concat(posts)
        });
      })

      .then(() => {
        setTimeout(() => {
          this.updatePosts();
        }, this.updateDelay);
      });
  }

  render() {
    const posts = [];
    this.state.posts.map((post, i) => {
      posts.push(<Post key={i} post={post} />);
    });

    return (
      <div>
        {posts}
      </div>
    );
  }
}
