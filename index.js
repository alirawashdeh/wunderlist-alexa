// Import alexia and create new app
const alexia = require('alexia');
const app = alexia.createApp();
var wunderlist = require('./wunderlist.js')

var client_id = process.env.client_id || '03ffe0cac0a0401aa6673c3cf6d02ced';// Your client id
var returnStr;

var AddItemIntents = [
  'add {Item:SHOPPING_LIST_ITEMS}',
  'add {Item:SHOPPING_LIST_ITEMS} to my {List:LISTS} list',
  'add {Item:SHOPPING_LIST_ITEMS} on my {List:LISTS} list',
  'add {Item:SHOPPING_LIST_ITEMS} on the {List:LISTS} list',
  'add {Item:SHOPPING_LIST_ITEMS} onto the {List:LISTS} list',
  'add {Item:SHOPPING_LIST_ITEMS} onto my {List:LISTS} list',
  'add {Item:SHOPPING_LIST_ITEMS} in my {List:LISTS} list',
  'add {Item:SHOPPING_LIST_ITEMS} on the {List:LISTS} list',
  'add {Item:SHOPPING_LIST_ITEMS} in the {List:LISTS} list',
  'add {Item:SHOPPING_LIST_ITEMS} onto the {List:LISTS} list',
  'put {Item:SHOPPING_LIST_ITEMS} on my {List:LISTS} list',
  'put {Item:SHOPPING_LIST_ITEMS} on the {List:LISTS} list',
  'put {Item:SHOPPING_LIST_ITEMS} onto the {List:LISTS} list',
  'put {Item:SHOPPING_LIST_ITEMS} onto my {List:LISTS} list',
  'put {Item:SHOPPING_LIST_ITEMS} in my {List:LISTS} list',
  'put {Item:SHOPPING_LIST_ITEMS} on the {List:LISTS} list',
  'put {Item:SHOPPING_LIST_ITEMS} in the {List:LISTS} list',
  'put {Item:SHOPPING_LIST_ITEMS} onto the {List:LISTS} list'
];

var GetListsIntents = [
  'tell me what lists I have',
  'to tell me what lists I have',
  'what lists I have',
  'what lists there are',
  'what lists are there',
  'what are my lists',
  'what lists are available'
];

var ListContentsIntents = [
  'whats on my {List:LISTS} list',
  'whats in my {List:LISTS} list',
  'whats in the {List:LISTS} list',
  'read out my {List:LISTS} list',
  'read out the contents of my {List:LISTS} list',
  'tell me whats on my {List:LISTS} list',
  'tell me the list of things on my {List:LISTS} list'
];

app.customSlot('SHOPPING_LIST_ITEMS', ['Eggs', 'Bread', 'Milk', 'Bacon', 'Packets of mixed biscuits', 'Chicken stock cubes']);
app.customSlot('LISTS', ['To-do', 'Shopping', 'Groceries']);

app.intent('AddItem', AddItemIntents, (slots, attrs, data) => {
  try {
      if(!data.session.user.accessToken)
      {
        return "You need to link Alexa to a Wunderlist account.";
      }

      if(!slots.Item)
      {
        return "You need to specify an item to add.";
      }

      if(slots.List)
      {
        var lists = wunderlist.getLists(data.session.user.accessToken,client_id);
        var listId = findListFromName(lists,slots.List);
        if(!listId)
        {return "List " + slots.List + " not found.";}
        var response = wunderlist.addItem(data.session.user.accessToken,client_id,listId, slots.Item);
        return 'I\'ve added ' + slots.Item + ' to your ' + slots.List + ' list on Wunderlist.' ;
      }
      else {
        var lists = wunderlist.getLists(data.session.user.accessToken,client_id);
        var listId = findListFromName(lists,'Inbox');
        var response = wunderlist.addItem(data.session.user.accessToken,client_id,listId, slots.Item);
        return 'I\'ve added ' + slots.Item + ' to your Inbox on Wunderlist.';
      }

    }
      catch(err) {
      console.log(err);
      return "Something went wrong. Please try again."
    }

});


app.intent('ListContents', ListContentsIntents, (slots, attrs, data) => {
  try {
      if(!data.session.user.accessToken)
      {
        return "You need to link Alexa to a Wunderlist account.";
      }

      if(!slots.List)
      {
        return "You need to specify a List to check.";
      }

        var lists = wunderlist.getLists(data.session.user.accessToken,client_id);
        var listId = findListFromName(lists,slots.List);
        if(!listId)
        {return "List " + slots.List + " not found.";}
        var response = wunderlist.getList(data.session.user.accessToken,client_id,listId, listId);

        returnStr = '';
        for(i in response)
        {
          returnStr += ', ' + response[i].title;
        }
        return 'You have the following items on your ' + slots.List + ' list' + returnStr;

    }
      catch(err) {
      console.log(err);
      return "Something went wrong. Please try again."
    }

});

app.intent('GetLists', GetListsIntents, (slots, attrs, data) => {

    if(!data.session.user.accessToken)
    {
     return  "You need to link Alexa to a Wunderlist account.";
    }

    returnStr = '';
    var json = wunderlist.getLists(data.session.user.accessToken,client_id);
    for(i in json)
    {
      returnStr += ', ' + json[i].title;
    }
    return 'You have the following lists' + returnStr;
});

// Create http server and start it
app.createServer().start(() => {
    // Once started, save speechAssets into directory
    app.saveSpeechAssets();
    console.log('Server started');
});

function findListFromName(json, listName) {
  for(i in json)
  {
      if((json[i].title.toLowerCase() == listName.toLowerCase()) ||
        (json[i].title.toLowerCase() == listName.toLowerCase() + ' list') ||
        (json[i].title.toLowerCase().replace(/[^\w]/gi, '')  == listName.toLowerCase().replace(/[^\w]/gi, '')))
      {
        return json[i].id;
      }
  }
  return null;
};
