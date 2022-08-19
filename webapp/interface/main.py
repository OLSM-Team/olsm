import logging, string, random
from math import floor, ceil
from time import time
import bcrypt, os, re, json
from flask_cors import CORS
from datetime import datetime
from bson.json_util import ObjectId
from utils.db import *
from utils import *
from Dashboard import init_dashboard
from flask import Flask, request, jsonify, render_template, url_for, redirect, session
from flask_apscheduler import APScheduler
from flask_session import Session
  

class AppEncoder(json.JSONEncoder):
	def default(self, obj):
		if isinstance(obj, ObjectId) or isinstance(obj, bytes):
			return str(obj);
		return json.JSONEncoder.default(self, obj)

app = Flask(__name__)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)
app.config['SECRET_KEY'] = os.getrandom(24)

CORS(app)
app.json_encoder = AppEncoder
scheduler = APScheduler()
scheduler.init_app(app)
app = init_dashboard(app)

logging.basicConfig(filename = 'Interface.log', level=logging.DEBUG)

@app.route("/", methods=['GET'])
def index():
	return render_template("index.html")

@app.route("/register", methods=['GET', 'POST'])
def register():
	if "email" in session:
		return redirect(url_for("index"))
		
	if request.method == "POST":
		errors = {}
		r = request.json

		db = connect_db()
		records = db.users

		fname = r["fname"]
		lname = r["lname"]
		email = r["email"].lower()
		password1 = r["password"]
		password2 = r["password2"]
		gender = r["gender"]
		role = r["role"]

		email_found = records.find_one({"email": email})

		if not re.fullmatch(r"[A-Za-z_'-]+", fname):
			errors['fname'] = 'English letters, -, or \' only!'

		if not re.fullmatch(r"[A-Za-z_'-]+", lname):
			errors['lname'] = 'English letters, -, or \' only!'

		if email_found:
			errors['email'] = 'Email already exists!'

		if not re.fullmatch(r"[A-Za-z0-9!@£$%^&*()_+={}?:~\[\].]{8,}", password1):
			errors['password'] = 'Password must be at least 8 characters long!'

		if password1 != password2:
			errors['password2'] = 'Passwords must match!'
			
		data = {}
		if len(errors) > 0:
			data['success'] = False
			data['errors'] = errors
		else:
			data['success'] = True

			hashed = bcrypt.hashpw(password2.encode('utf-8'), bcrypt.gensalt())
			id_ =  records.find()
			id = len([doc for doc in id_])
			user_input = dict(
				id = id + 1,
				fname = fname,
				lname = lname,
				email = email,
				gender = int(gender),
				password = hashed,
				role = int(role)
			)
			records.insert_one(user_input)
		return jsonify(data)
			
	return render_template('register.html')

@app.route("/login", methods=["POST", "GET"])
def login():
	if "email" in session:
		return redirect(url_for("index"))

	if request.method == "POST":
		errors = {}
		r = request.json

		db = connect_db()
		records = db.users

		email = r["email"].lower()
		password = r["password"]
	
		user_record = records.find_one({"email": email})
		if user_record:
			passwordcheck = user_record['password']
			
			if not bcrypt.checkpw(password.encode('utf-8'), passwordcheck):
				errors['password'] = 'Invalid email and or password!'
		else:
			errors['email'] = 'No account is associated with this email!'
		
		data = {}
		if len(errors) > 0:
			data["success"] = False
			data["errors"] = errors
		else:
			data["success"] = True
			if "next_url" in session:
				data["next_url"] = session["next_url"]
				session.pop("next_url", None)
			session["email"] = email
			session["id"] = user_record["id"]
			session["role"] = user_record["role"]
			session["fname"] = user_record["fname"]
			
		return jsonify(data)

	return render_template('login.html')

@app.route("/logout")
def logout():
	if "email" in session:
		session.pop("email", None)
		session.pop("id", None)
		session.pop("role", None)
		session.pop("fname", None)
		session.pop("dash", None)
	return redirect(url_for("index"))

@app.route("/create", methods=['GET', 'POST'])
def create():
	if request.method == "POST":
		errors = {}
		r = request.json

		db = connect_db()
		records = db.lectures

		title = r["title"]
		course = r["course"]
		duration = int(r["duration"])
		link = r["link"]
		subtopics = r["subtopics"]

		temp_to = -1
		errors['subtopics'] = {}
		chunky_subtopics = []
		for i, subtopic in enumerate(subtopics):
			if subtopic['title'] == '' and subtopic['to'] == ''  and subtopic['from'] == '':
				continue
			elif subtopic['title'] == '' and (subtopic['to'] != ''  or subtopic['from'] != ''):
				errors['subtopics'][f'{i}'] = ['0', 'Subtopic must have a title!']
			elif subtopic['to'] == '' and subtopic['title'] != '':
				errors['subtopics'][f'{i}'] = ['2', 'Must determine end time!']
			elif subtopic['from'] == '' and subtopic['title'] != '':
				errors['subtopics'][f'{i}'] = ['1', 'Must determine start time!']
			elif int(subtopic['to']) < int(subtopic['from']):
				errors['subtopics'][f'{i}'] = ['2', '\'to\' field must be greater than \'from\'!']
			elif int(subtopic['from']) <= temp_to:
				errors['subtopics'][f'{i}'] = ['1', 'Overlapping with the previous one!']
			elif int(subtopic['to']) > duration:
				errors['subtopics'][f'{i}'] = ['2', 'Cannot exceed expected duration defined!']
			else:
				chunky_subtopics.append({"title": subtopic['title'], "from": minutes_to_chunk(int(subtopic['from'])), "to": minutes_to_chunk(int(subtopic['to']))})
			if subtopic['to'] != "":
				temp_to = int(subtopic['to'])

		if len(chunky_subtopics) == 0:
			for i in range(ceil(duration/30)):
				chunky_subtopics.append({"title": f"Part {i+1}", "from": f"{minutes_to_chunk((i*30) + (1 if i != 0 else 0))}", "to": f"{minutes_to_chunk(((i+1)*30) if ((i+1)*30) <= duration else duration)}"})

		data = {}
		if len(errors['subtopics']) > 0:
			data['success'] = False
			data['errors'] = errors
		else:
			data['success'] = True
			
			rand = ''.join(random.choices(string.ascii_uppercase + string.digits, k = 8)) 
			id_ =  records.find()
			id = len([doc for doc in id_]) + 1000
			start = floor(time())
			user_input = dict(
				id = id,
				title = title,
				instructor = session["id"],
				status = 0,
				course = course,
				link = link,
				records = 0,
				end = "",
				invite = f'{start}&{id}%{session["id"]}',
				dash = f'{rand}%3&{id}',
				duration = duration,
				start = start,
				subtopics = chunky_subtopics
			)
			
			records.insert_one(user_input)
		return jsonify(data)

	if "email" in session and session["role"]:
		return render_template('create.html')
	elif "email" in session:
		return redirect(url_for("index"))
	else:
		session["next_url"] = request.url
		return redirect(url_for("login"))
		

@app.route('/invitation/<invId>')
def invite(invId):
	if "email" in session:
		stdId = session["id"]
		lecId = int(invId.split('&')[1].split('%')[0])
		seconds = get_timestamp(lecId)
		return render_template('meeting_invite.html', meeting=True, lec_id=lecId, std_id=stdId, startstamp=seconds)
	else:
		session["next_url"] = request.url
		return redirect(url_for("login"))

@app.route('/overview', methods=['GET', 'POST'])
def overview():
	if request.method == "POST":
		r = request.json

		db = connect_db()
		lectures_ = db.lectures
		states_ = db.mindstates
		target = int(r["id"].split('.')[0])
		if r["operation"] == "delete":
			lectures_.delete_one({"id": target})
			x = states_.delete_many({"lecture": target})
			count_deleted = x.deleted_count
			resp = {'success': True, 'count': count_deleted}
		else:
			endstamp = floor(time())
			lectures_.update_one({"id": target}, {"$set": {"status": 1, "end": endstamp, "link": ""}})
			resp = {'success': True, 'end': f'{get_date(endstamp)} {get_time(endstamp)}'}

		return jsonify(resp), 200

	if "email" in session and session["role"]:
		lectures = get_lectures(session['id'])
		return render_template('overview.html', get_time=get_time, get_date=get_date, lectures=lectures)
	elif "email" in session:
		return redirect(url_for("index"))
	else:
		session["next_url"] = request.url
		return redirect(url_for("login"))

@app.route('/chgpasswd', methods=['GET', 'POST'])
def chgpasswd():
	if request.method == "POST":
		errors = {}
		r = request.json

		db = connect_db()
		records = db.users

		old = r["old"]
		new = r["new"]
		new2 = r["new2"]
	
		user_record = records.find_one({"email": session['email']})
		if user_record:
			passwordcheck = user_record['password']
			
			if not bcrypt.checkpw(old.encode('utf-8'), passwordcheck):
				errors['old'] = 'Incorrect Password!'
		else:
			errors['old'] = 'Unknown Error. Please Try Again Later!'

		if not re.fullmatch(r"[A-Za-z0-9!@£$%^&*()_+={}?:~\[\].]{8,}", new):
			errors['new'] = 'Password must be at least 8 characters long!'

		if new != new2:
			errors['new2'] = 'Passwords must match!'
		
		data = {}
		if len(errors) > 0:
			data["success"] = False
			data["errors"] = errors
		else:
			data["success"] = True
			hashed = bcrypt.hashpw(new.encode('utf-8'), bcrypt.gensalt())
			records.update_one({"email": session['email']}, { "$set": { "password": hashed } })
			
		return jsonify(data)

	if "email" in session:
		return render_template('chgpasswd.html')
	else:
		session["next_url"] = request.url
		return redirect(url_for("login"))

@app.route("/d/<dashid>")
def dash(dashid):
	if "dash" in session and session["dash"] == dashid:
		return redirect("https://olsm.ddns.net/dash/")
	elif "email" in session and session["role"]:
		global app
		session["dash"] = dashid
		lec_id = int(dashid.split('%3&')[1])
		return redirect("https://olsm.ddns.net/dash/")
	elif "email" in session:
		return redirect(url_for("index"))
	else:
		session["next_url"] = request.url
		return redirect(url_for("login"))


@app.route('/states')
def get_states():
	return jsonify({'states': find_states()})

@app.route('/users')
def get_users():
	return jsonify({'users': find_users()})

@app.route('/user/<int:uid>')
def get_user(uid):
	return jsonify({'user': find_user(uid)})

@app.context_processor
def inject_now():
	return {'now': datetime.utcnow()}

@app.context_processor
def inject_login_state():
	return {'logged_in': "email" in session}

@app.context_processor
def inject_role():
	return {'role': session["role"] if ("role" in session) else None}

@app.context_processor
def inject_fname():
	return {'fname': session['fname'] if "fname" in session else None}

@scheduler.task('cron', id='check_records', minute='*/30')
def check_records_expiry():
	db = connect_db()
	lectures_ = db.lectures.find()
	count = 0
	for lecture in lectures_:
		if lecture['status'] and not lecture['records'] and lecture['end'] - floor(time()) > 3600:
			db.lectures.update_one({"id": lecture["id"]}, {"$set": {"records":1}})
			db.mindstates.delete_many({"lecture": lecture["id"]})
			count += 1
	app.logger.critical(f'Successfully deleted the state records of {count} lectures!')

scheduler.start()

if __name__ == '__main__':
	context = ('olsm_ddns_net.pem', 'myserver.key')
	app.run(host='0.0.0.0', debug=True, threaded=True, ssl_context=context)