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
  console.log(posts);

  posts.forEach(function (post) {
    var data = post.data;
    // Create/update tasty react objects here later.

    // Template literals! With if statements, srsly!
    document.body.innerHTML += '\n        ' + data.title + ' <br>\n        ' + data.author + ' <br>\n        /r/' + data.keto + ' <br>\n        ' + data.url + ' <br>\n\n        ' + (data.selftext ? '' + data.selftext : '') + '\n\n        score: ' + data.score + ' <br>\n\n        ' + (data.thumbnail.substr(0, 4) == 'http' ? '<img src="' + data.thumbnail + '" /> <br>' : 'ddwadwafwafwafwaf') + '\n\n        <hr>\n      ';
  });
});