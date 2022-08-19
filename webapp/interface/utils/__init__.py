from math import floor
from time import localtime, strftime

def minutes_to_chunk(minutes, interval=15):
	return floor(minutes * 60 / interval)

def get_time(epoch):
	return strftime('%I:%M %p', localtime(epoch))

def get_date(epoch):
	return strftime('%d/%m/%Y', localtime(epoch))