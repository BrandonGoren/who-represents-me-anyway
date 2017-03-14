from django.shortcuts import render
import requests
import json


def index(request):
	return render(request, 'index.html', {'title': 'Who Represents Me, Anyway?'})


# Show representatives associated with the inputted latitude and longitude
def show_reps(request):

	try:
		lat = request.GET['lat']
		lng = request.GET['lng']
	except KeyError as dict_exc:
		print(dict_exc)
		context = {
			'title': 'Error encountered',
			'error_message': 'Invalid latitude and longitude'
		}
		return render(request, 'index.html', context)

	try:
		r = requests.get(
			"https://congress.api.sunlightfoundation.com/legislators/locate?order=title__asc,last_name__asc",
			{'latitude': lat, 'longitude': lng})
	except requests.exceptions.RequestException as req_exc:
		print(req_exc)
		context = {
			'title': 'Error encountered',
			'error_message': req_exc
		}
		return render(request, 'index.html', context)

	congresspeople = json.loads(r.content)['results']
	if len(congresspeople) == 0:
		context = {
			'title': 'No Representatives Found',
			'error_message': 'No representatives were found'
		}
		return render(request, 'index.html', context)
	else:
		context = {
			'title': 'Your Representative' if len(congresspeople) == 1 else 'Your Representatives',
			'congresspeople': congresspeople
		}
		return render(request, 'representatives.html', context)
