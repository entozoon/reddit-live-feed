class Posts extends React.Component {
  constructor(props) {
    super(props);
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

  updatePosts(firstRun) {
    this.downloadPosts()
      .then(posts => {
        //console.log('Posts received (most recent first)');
        //console.log(posts);

        // Chuck all but the most recent post if that's what we want, will accumulate later
        if (typeof firstRun != 'undefined') {
          posts = posts.splice(0, 1);
        }

        posts.filter(post => {
          if (parseInt(post.data.created) > parseInt(this.state.mostRecentTimestamp)) {
            // This post is more recent that ones previously shown..
            console.log(post.data.title);
          }
        });

        // Store the most recent timestamp
        this.setState({
          mostRecentTimestamp: posts[0].data.created
        });

        this.setState({
          posts: posts
        });
      })
      .then(() => {
        setTimeout(() => {
          this.updatePosts();
        }, 5000);
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
