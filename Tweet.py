import time
import tweepy
import json
from tweepy import Stream
from tweepy import OAuthHandler
from tweepy.streaming import StreamListener
import html.parser
'''
Printing Tweets for a set period of time
'''
num_of_tweets = int(input('Number of tweets:'))
consumer_key = 'nUHYBfuwwi0p9PQgUptedxOPZ'
consumer_secret = 'fjJmIgK91WT0QLYNoVfDr6FW5UffXDMXbH5El4IbhUiFvznHKZ'
access_token = '410233756-ZaTPzvMhjApH4KuWzJAjihqhey6ZH5Yqt7hBN3bz'
access_token_secret = 'lGelX2TFX7Z0MI6EP5SdiT6koa7OVhkTWxXvVGe7XcB2C'
auth = tweepy.OAuthHandler(consumer_key,consumer_secret)
auth.set_access_token(access_token, access_token_secret)

class listener(StreamListener):
  def __init__(self,num_of_tweets):
  	self.num_of_tweets = num_of_tweets
  def on_data(self,data):
    tweet = data.split(',"text":"')[1].split('","source')[0]  
    # coordinates= data.split('"coordinates":')[1].split(',"')[0]
    print(ascii(tweet))
    # print(ascii(coordinates))
    # for fn in ((data.split('type":"Point","coordinates":[')[1].split(']')[0]),(data.split('"Polygon","coordinates)')[1].split('},"attributes"')[0]))
    try:
      print(ascii(data.split('"coordinates":{"type":"Point","coordinates":[')[1].split(']')[0]))
    except:
      try:
        print(ascii((data.split('":"Polygon","coordinates":[[[')[1].split('],')[0])))
      except:
        print('Location Off')
    # if len(str(()))>0:
    # 	print(ascii(data.split('type":"Point","coordinates":[')[1].split(']')[0]))
    # elif len(data.split('"Polygon","coordinates)')[1].split('},"attributes"')[0])>0:
    # 	print(ascii((data.split('"Polygon","coordinates)')[1].split('},"attributes"')[0])))
    # else:
    # 	pass
    # City=data.split(',"text":"')[1].split('","source')[0]
    # Country=data.split(',"text":"')[1].split('","source')[0]
    # data2=json.loads(html.parser().unescape(data))
    # if data2['coordinates']:
    # 	print(data2['coordinates'])
    # if data2.get('place'):
    # 	print(data2['place']['full_name'])
    self.num_of_tweets-=1
    if self.num_of_tweets==0:
    	return False
    return True
  # def on_status(self,status):
  # 	print (status.text)
  # 	if status.coordinates:
  # 		print ('coords:', status.coordinates)
  # 	if status.place:
  # 		print ('place:', status.place.full_name)
  def on_error(self,status):
    print (status)
twitterStream = Stream(auth,listener(num_of_tweets))
twitterStream.filter(track = ["#nikitislame"])