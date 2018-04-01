const Twit = require('twit')

const config = {
  consumer_key: 'MXv9gzJIO1y54AfEvAO2JTT3j',
  consumer_secret: 'UnnhvdUQKZfCGlobKQQgoHhrvYnykHnIL55qZhp38XPoNbTIAG',
  access_token: '980011366122643456-pA2mTQbJTwyMJKBICkndWHaJUYEDs1R',
  access_token_secret: 'HnEJaUpcccspcMW4vvQ9lZJ4iU0CQDtLQBTx2voMukbuv',
}

const bot = new Twit(config)

const stream = bot.stream('statuses/filter', {
  track: '#terptimerbot, #tempsdownterpsup',
})

// Handle user events
stream.on('user-event', (eventMsg) => {
  console.log(JSON.stringify(eventMsg, undefined, 2))
})

// Handle incoming tweets
stream.on('tweet', (t) => {
  /* Tweet properties
  ** id_str (tweet), text, favorited */
  const { id_str, text, favorited, user } = t
  const { screen_name, name } = user
  const r = /\d+/
  const seconds = text.match(r)[0]
  const completion_response = `@${screen_name} Your timer is up. Thanks for dabbing with us!`

  console.log(`${name} submitted a timer for ${seconds} seconds.`)

  setTimeout(() => {
    // Like it
    likePostWithId(id_str)

    // Reply to it
    postReplyWithText(completion_response, id_str)
  }, seconds * 1000)
})

// Utilities
const likePostWithId = (id_str) => {
  bot.post(
    'favorites/create',
    {
      id: id_str,
    },
    (err, data, response) => {
      if (err) {
        console.log(err)
      } else {
        console.log(`Liked post ID ${id_str}`)
      }
    },
  )
}

const postReplyWithText = (replyText, id_str) => {
  bot.post(
    'statuses/update',
    {
      status: replyText,
      in_reply_to_status_id: id_str,
    },
    (err, data, response) => {
      if (err) {
        console.log(err)
      } else {
        //console.log(data)
        console.log(`Posted response: ${replyText}`)
      }
    },
  )
}

// Posting an status update
// bot.post(
//   'statuses/update',
//   {
//     status: 'My owner is tinkering with me for a moment, pardon this outburst.',
//   },
//   (err, data, response) => {
//     if (err) {
//       console.log(err)
//     } else {
//       console.log(`"${data.text}" tweeted!`)
//     }
//   },
// )

// Get follower list
// bot.get(
//   'followers/ids',
//   {
//     screen_name: 'DroidScott',
//     count: 200,
//   },
//   (err, data, response) => {
//     if (err) {
//       console.log(err)
//     } else {
//       console.log(data)
//     }
//   },
// )

// Follow a user back
// bot.post(
//   'friendships/create',
//   {
//     screen_name: 'MartinDoesStuff',
//   },
//   (err, data, response) => {
//     if (err) {
//       console.log(err)
//     } else {
//       console.log(data)
//     }
//   },
//)

// Reply example
// bot.post(
//   'statuses/update',
//   {
//     status: '@MartinDoesStuff Ha. Ha. Ha.',
//     in_reply_to_status_id: '980008404256047105',
//   },
//   (err, data, response) => {
//     if (err) {
//       console.log(err)
//     } else {
//       console.log(data)
//     }
//   },
// )
