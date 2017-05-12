'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Posts = function (_React$Component) {
  _inherits(Posts, _React$Component);

  function Posts(props) {
    _classCallCheck(this, Posts);

    var _this = _possibleConstructorReturn(this, (Posts.__proto__ || Object.getPrototypeOf(Posts)).call(this, props));

    _this.state = {
      'posts': []
    };

    _this.updatePostsFromReddit().then(function (posts) {
      console.log('Posts received:');
      console.log(posts);

      _this.setState({
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
    return _this;
  }

  _createClass(Posts, [{
    key: 'updatePostsFromReddit',
    value: async function updatePostsFromReddit() {
      try {
        var response = await fetch('https://www.reddit.com/new.json');
        var responseJson = await response.json();
        return responseJson.data.children;
      } catch (error) {
        console.error(error);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var posts = [];
      this.state.posts.map(function (post, i) {
        posts.push(React.createElement(Post, { key: i, post: post }));
      });

      return React.createElement(
        'div',
        null,
        posts
      );
    }
  }]);

  return Posts;
}(React.Component);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//
// Concatenates all /src files into /dist.app.js as compiles to vanilla Javascript (es2015)
//

var Main = function (_React$Component) {
  _inherits(Main, _React$Component);

  function Main(props) {
    _classCallCheck(this, Main);

    return _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).call(this, props));
  }

  _createClass(Main, [{
    key: 'render',
    value: function render() {
      return React.createElement(Posts, null);
    }
  }]);

  return Main;
}(React.Component);

ReactDOM.render(React.createElement(Main, null), document.getElementById('root'));
