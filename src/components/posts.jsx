class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'posts' : []
    };

    this.updatePostsFromReddit()
      .then(posts => {
        console.log('Posts received (most recent first):');
        console.log(posts);

        // Chuck all but the most recent paste, we'll accumulate them up later
        posts = posts.splice(0, 1);

        this.setState({
          posts: posts
        });

        /*
        posts.forEach(post => {
          // Create/update tasty react objects here later.
          this.state.posts

          // Test render:
          // Template literals! With if statements, srsly!
          document.body.innerHTML += `
            ${post.data.title} <br>
            ${post.data.author} <br>
            /r/${post.data.keto} <br>
            ${post.data.url} <br>

            ${post.data.selftext ?
              `${post.data.selftext}` : ''
            }

            score: ${post.data.score} <br>

            ${post.data.thumbnail.substr(0, 4) == 'http'  ?
              `<img src="${post.data.thumbnail}" /> <br>`
              :
              'ddwadwafwafwafwaf'
            }

            <hr>
          `;
        });
        */
      });
  }

  async updatePostsFromReddit() {
    try {
      let response = await fetch('https://www.reddit.com/new.json');
      let responseJson = await response.json();
      return responseJson.data.children;
    } catch(error) {
      console.error(error);
    }
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
