var friendsData = require("../data/friends");

module.exports = function (app) {

  app.get("/api/friends", function (req, res) {
    res.json(friendsData);
  });

  app.post("/api/friends", function (req, res) {
    var newFriend = req.body;

    console.log(newFriend);

    friendsData.push(newFriend)

    res.json(matchMaker());
  });


  function matchMaker() {
    currentFriend = friendsData[friendsData.length - 1].scores;
    var friendSums = [];
    for (let j = 0; j < friendsData.length - 1; j++) {
      friend0 = friendsData[j].scores;

      var resultArray = [];

      for (let i = 0; i < currentFriend.length; i++) {
        var result = Math.abs(currentFriend[i] - friend0[i]);
        resultArray.push(result);
      }

      var sum = resultArray.reduce(add, 0);

      function add(a, b) {
        return a + b;
      }

      friendSums.push(sum);
    }

    var match = Math.min(...friendSums);
    var matchIndex = friendSums.indexOf(match)
    return friendsData[matchIndex];
  }
}