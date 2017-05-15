'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Post = function (_React$Component) {
  _inherits(Post, _React$Component);

  function Post(props) {
    _classCallCheck(this, Post);

    var _this = _possibleConstructorReturn(this, (Post.__proto__ || Object.getPrototypeOf(Post)).call(this, props));

    _this.state = props.post;
    return _this;
  }

  /**
   * now
   * @return {Date} Current timestamp in JST (which reddit appears to use)
   */


  _createClass(Post, [{
    key: 'now',
    value: function now() {
      var now = new Date();
      var timestampNow = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours() + 8, // JST
      now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());
      timestampNow = new Date(timestampNow);
      return timestampNow;
    }
  }, {
    key: 'timeSinceCreation',
    value: function timeSinceCreation(created) {
      var timestampCreated = new Date(created * 1000);
      var timeSinceCreation = this.now() - timestampCreated; // milliseconds
      timeSinceCreation = Math.round(timeSinceCreation / 1000); // seconds, rounded
      return timeSinceCreation;
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { 'data-delay': this.state.delay },
        this.state.data.title,
        ' ',
        React.createElement('br', null),
        this.state.data.author,
        ' ',
        React.createElement('br', null),
        '/r/',
        this.state.data.keto,
        ' ',
        React.createElement('br', null),
        this.state.data.url,
        ' ',
        React.createElement('br', null),
        this.state.data.selftext,
        ' ',
        React.createElement('br', null),
        this.timeSinceCreation(this.state.data.created),
        ' seconds ago ',
        React.createElement('br', null),
        'score: ',
        this.state.data.score,
        ' ',
        React.createElement('br', null),
        this.state.data.thumbnail.substr(0, 4) == 'http' ? '<img src="' + this.state.data.thumbnail + '" />' : '',
        React.createElement('hr', null)
      );
    }
  }]);

  return Post;
}(React.Component);
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

    _this.updateDelay = 15000;

    _this.state = {
      posts: [],
      mostRecentTimestamp: 0
    };

    _this.updatePosts(true);
    return _this;
  }

  _createClass(Posts, [{
    key: 'downloadPosts',
    value: async function downloadPosts() {
      try {
        var response = await fetch('https://www.reddit.com/new.json');
        var responseJson = await response.json();
        return responseJson.data.children;
      } catch (error) {
        console.error(error);
      }
    }
  }, {
    key: 'addDelaysToPosts',
    value: function addDelaysToPosts(posts, updateDelay) {
      var delayIncrement = updateDelay / posts.length;
      // Round to nearest .1s (e.g. 300ms)
      delayIncrement = Math.round(delayIncrement / 100) * 100;
      return posts.map(function (post, i) {
        if (posts.length > 1) {
          post.delay = delayIncrement * i;
        }
        return post;
      });
    }
  }, {
    key: 'updatePosts',
    value: function updatePosts(firstRun) {
      var _this2 = this;

      this.downloadPosts().then(function (posts) {
        //console.log('Posts received (most recent first)');
        //console.log(posts);

        // Chuck all but the most recent post if that's what we want, will accumulate later
        if (typeof firstRun != 'undefined') {
          posts = posts.splice(0, 1);
        }

        // Filter out posts older than the most recent one previously seen
        posts = posts.filter(function (post) {
          return parseInt(post.data.created) > parseInt(_this2.state.mostRecentTimestamp);
        });

        // Store the most recent timestamp
        _this2.setState({
          mostRecentTimestamp: posts[0].data.created
        });

        // Reverse posts, as we want most recent LAST
        posts.reverse();

        posts = _this2.addDelaysToPosts(posts, _this2.updateDelay);

        _this2.setState({
          posts: _this2.state.posts.concat(posts)
        });
      }).then(function () {
        setTimeout(function () {
          _this2.updatePosts();
        }, _this2.updateDelay);
      });
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

// Time format
var timeFormat = function timeFormat(timestamp) {
  // http://stackoverflow.com/a/8888498
  var hours = timestamp.getHours();
  var minutes = timestamp.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ampm;
  return strTime;
};
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
