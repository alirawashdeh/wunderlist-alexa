<!-- ![CallyJS logo](/logo.png) -->

# Wunderlist skill for Alexa

This is a skill for Amazon Alexa which allows users to:
- Add items to a Wunderlist list
- Ask what lists they have on Wunderlist
- Ask what a list on Wunderlist contains

This repo makes use of [Alexia](https://github.com/accenture/alexia), a package that takes the pain out of creating Alexa skills.

Note: This skill uses the Alexa Skills Kit - intended for basic custom skills. It doesn't use the [Alexa List Skill API](https://developer.amazon.com/alexa-skills-kit/shopping-and-to-do-lists) which, at the time of writing, isn't publicly available.

## Generating speech assets

Alexia automatically generates an intent schema and utterances file. To create these assets, carry out the following:

```
npm install
npm start
```

This creates a ```speechAssets``` folder, which contains an ```intentSchema.json``` and ```utterances.txt``` file, along with a ```customSlots``` folder for any custom slot data. You can upload all of this data to the Alexa Developer portal when creating your skill.

## Deploying to Heroku, and running locally

Sign up for API keys at [Wunderlist Developer](https://developer.wunderlist.com).

To deploy your application to Heroku, ensure that you have the heroku toolbelt installed then carry out the following:

```
heroku apps:create [APPNAME]
heroku config:set client_id=[CLIENT ID]
```

Where ```[APPNAME]``` is any name you choose to give to your application on Heroku. This will appear in the URL. ```[CLIENT ID]``` should be populated with the Client ID that was generated by the Wunderlist Developer portal.

To run the application locally, run the following command:

```
heroku local
```

You can use Postman or another tool to send requests to your local server, which will run at http://localhost:5000 by default

## Usage

Once you have the skill deployed and created on the Alexa Developer portal, make sure you link your account to Wunderlist using the Alexa app.

After you have linked your account, you can start using the skill, with commands such as:
- "Alexa, tell Wunderlist to add nappies to my Shopping list"
- "Alexa, ask Wunderlist what lists I have"
- "Alexa, ask Wunderlist what I have on my To-do list"

Note: This assumes that you have set an invocation name of "Wunderlist" - you find that Alexa offers better accuracy with different names.
