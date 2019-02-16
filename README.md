# Analyzing Current Twitter Topics with Watson NLU Demo

This project makes use of the Twitter API and IBM Watson NLU to uncover meaningful information hidden in the massive amount of tweets on Twitter. This is done by obtaining the most recent 1000 tweets relevant to the user-entered phrase and running an NLU query on that text to obtain concepts, keywords, and sentiment on those tweets.



## Getting Started

1. Clone the repository from terminal

2. Go into the project folder
```
$ cd nlu_twitter
```
3. Install NPM modules
```
$ npm install
```

* Use npm version 5.6.0 or greater & node version 8.12.0 or greater



### Prerequisites

To use this project, you should make a [IBM Cloud](https://www.ibm.com/cloud/) account and create a [Watson NLU Instance](https://www.ibm.com/cloud/watson-natural-language-understanding).

You can use the first few steps of the [Watson NLU tutorial](https://console.bluemix.net/docs/services/natural-language-understanding/getting-started.html#getting-started-tutorial) to get started.

Once this is done, copy and paste your service credentials into the `config/nlu_creds.json` file.



## Deployment

In your command line, type

```
$ npm start
```

to boot up the application.

In your browser, navigate to

```
http://0.0.0.0:3000
```

This should open up the project main page.

Enter a keyword or very short phrase and click on the `Update Tweets` button.

This will fetch the 1000 most recent tweets related to the phrase you entered and provide concepts, keywords, and sentiment about the phrase using the Watson NLU service.

It will also update the `nlu_twitter/tweets.txt` file to the 1000 tweets used in the current query so they can be referred to.

The results are displayed in a bubble graph format, where the number and size of each bubble correlates to its relevance score obtained in the NLU query response.



## Contributors

* **Ryan Whitnah** - *Initial work* - [NLU Bubble](https://github.com/rwhitnah/nlu_bubble)
