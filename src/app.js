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
    console.log(posts);

    posts.forEach(post => {
      const data = post.data;
      // Create/update tasty react objects here later.

      // Template literals! With if statements, srsly!
      document.body.innerHTML += `
        ${data.title} <br>
        ${data.author} <br>
        /r/${data.keto} <br>
        ${data.url} <br>

        ${data.selftext ?
          `${data.selftext}` : ''
        }

        score: ${data.score} <br>

        ${data.thumbnail.substr(0, 4) == 'http'  ?
          `<img src="${data.thumbnail}" /> <br>`
          :
          'ddwadwafwafwafwaf'
        }

        <hr>
      `;
    });
  });
