'use strict';

//
// Compiles into /dist as vanilla Javascript (es2015)
//

async function getPostsFromReddit() {
  try {
    var response = await fetch('https://www.reddit.com/new.json');
    var responseJson = await response.json();
    return responseJson.data.children;
  } catch (error) {
    console.error(error);
  }
}

getPostsFromReddit().then(function (posts) {
  // Trim out everything except the juicy data
  posts = posts.map(function (post) {
    return post.data;
  });

  console.log(posts);

  posts.map(function (post) {
    // Create/update tasty react objects here later.

    // Template literals! With if statements, srsly!
    document.body.innerHTML += '\n        ' + post.title + ' <br>\n        ' + post.author + ' <br>\n        /r/' + post.keto + ' <br>\n        ' + post.url + ' <br>\n\n        ' + (post.selftext ? '' + post.selftext : '') + '\n\n        score: ' + post.score + ' <br>\n\n        ' + (post.thumbnail.substr(0, 4) == 'http' ? '<img src="' + post.thumbnail + '" /> <br>' : 'ddwadwafwafwafwaf') + '\n\n        <hr>\n      ';
  });
});