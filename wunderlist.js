
var request = require('sync-request');

module.exports = {

  getLists: function(accessToken, clientId) {
    var res = request('GET', 'https://a.wunderlist.com/api/v1/lists', {
      'headers': {
        'X-Access-Token': accessToken,
        'X-Client-ID': clientId
      }
    });
    var json = JSON.parse(res.getBody().toString());
    return json;
  },

  addItem: function(accessToken, clientId, listId, itemText) {

    var postJSON = {
           'list_id': parseInt(listId),
           'title':itemText
         };
    var res = request('POST', 'https://a.wunderlist.com/api/v1/tasks', {
      'headers': {
        'Content-Type': 'application/json',
        'X-Access-Token': accessToken,
        'X-Client-ID': clientId
      },
       json: postJSON
    });

    var json = JSON.parse(res.getBody().toString());
    return json;
  },

  getList: function(accessToken, clientId, listID) {
    var res = request('GET', 'https://a.wunderlist.com/api/v1/tasks?list_id=' + listID, {
      'headers': {
        'X-Access-Token': accessToken,
        'X-Client-ID': clientId
      }
    });
    var json = JSON.parse(res.getBody().toString());
    return json;
  }
};
