//
// Compiles into /dist as vanilla Javascript (es2015)
//

async function getPostsFromReddit() {
  try {
    let response = await fetch('https://www.reddit.com/new.json');
    let responseJson = await response.json();
    return responseJson.data.children;
  } catch(error) {
    console.error(error);
  }
}

getPostsFromReddit()
  .then(posts => {
    // Trim out everything except the juicy data
    posts = posts.map(post => {
      return post.data;
    });

    console.log(posts);

    posts.map(post => {
      // Create/update tasty react objects here later.

      // Template literals! With if statements, srsly!
      document.body.innerHTML += `
        ${post.title} <br>
        ${post.author} <br>
        /r/${post.keto} <br>
        ${post.url} <br>

        ${post.selftext ?
          `${post.selftext}` : ''
        }

        score: ${post.score} <br>

        ${post.thumbnail.substr(0, 4) == 'http'  ?
          `<img src="${post.thumbnail}" /> <br>`
          :
          'ddwadwafwafwafwaf'
        }

        <hr>
      `;
    });
  });
