from pymongo import MongoClient

def connect_db():
	client = MongoClient(host='db',
							port=27017, 
							username='root', 
							password='pass',
							authSource="admin")
	db = client["olsm_db"]
	return db

def get_timestamp(lec_id):
	db = ""
	try:
		db = connect_db()
		start_ = db.lectures.aggregate([
			{
			"$match": {'id': lec_id, 'status': 0}
			},
			{
			"$project": {'_id': 0, 'start': 1}
			}
		])
		return int([doc for doc in start_][0]['start'])
	except Exception as e:
		print(f"Error: {e}")
		return None
	finally:
		if type(db)==MongoClient:
			db.close()

def get_lectures(uid):
	db = ""
	try:
		db = connect_db()
		lectures_ = db.lectures.find({'instructor': uid})
		return [doc for doc in lectures_]
	except Exception as e:
		print(f"Error: {e}")
		return None
	finally:
		if type(db)==MongoClient:
			db.close()

def find_states():
	db = ""
	try:
		db = connect_db()
		states_ = db.mindstates.aggregate([
			{
			"$project": {'_id': 0}
			}
		])
		return [doc for doc in states_]
	except Exception as e:
		print(f"Error: {e}")
		return None
	finally:
		if type(db)==MongoClient:
			db.close()

def find_users():
	db = ""
	try:
		db = connect_db()
		users_ = db.users.find()
		return [doc for doc in users_]
	except Exception as e:
		print(f"Error: {e}")
		return None
	finally:
		if type(db)==MongoClient:
			db.close()

def find_user(uid):
	db = ""
	try:
		db = connect_db()
		return db.users.find_one({"id": uid})
	except Exception as e:
		print(f"Error: {e}")
		return None
	finally:
		if type(db)==MongoClient:
			db.close()

def get_lecture(lec_id):
	db = ""
	try:
		db = connect_db()
		return db.lectures.find_one({'id': lec_id})
	except Exception as e:
		print(f"Error: {e}")
		return None
	finally:
		if type(db)==MongoClient:
			db.close()
	
def get_subtopic(lec_id, start, end):
	db = ""
	try:
		db = connect_db()
		states_ = db.mindstates.aggregate([
			{ 
				"$match": {"lecture": lec_id, "chunk": {"$gte": start, "$lte": end}}
			},
			{
				"$group": {"_id": {"student": "$student", "state": "$state"}, "count": {"$sum": 1}}
			},
			{
				"$sort": {"count": -1}
			},
			{
				"$group": {"_id": "$_id.student", "student": {"$first": "$_id.student"}, "state": {"$first": "$_id.state"}, "frequency": {"$first": "$count"}}
			},
			{
				"$group": {"_id": "$state", "state": {"$first": "$state"}, "count": {"$sum": 1}}
			},
			{
				"$unset": ["_id"]
			}
		])
		return [doc for doc in states_]
	except Exception as e:
		print(f"Error: {e}")
		return None
	finally:
		if type(db)==MongoClient:
			db.close()

def get_real_time(lec_id):
	db = ""
	try:
		db = connect_db()
		states_ = db.mindstates.aggregate([
			{ 
				"$match": {"lecture": lec_id}
			},
			{
				"$group": {"_id": {"chunk": "$chunk", "state": "$state"}, "chunk":{"$first": "$chunk"}, "state":{"$first": "$state"}, "count": {"$sum": 1}}
			},
			{
				"$sort": {"chunk": 1}
			},
			{
				"$unset": ["_id"]
			}
		])
		return [doc for doc in states_]
	except Exception as e:
		print(f"Error: {e}")
		return None
	finally:
		if type(db)==MongoClient:
			db.close()

def get_students_subtopic(lec_id, start, end):
	db = ""
	try:
		db = connect_db()
		users_ = db.mindstates.aggregate([
			{ 
				"$match": {"lecture": lec_id, "chunk": {"$gte": start, "$lte": end}}
			},
			{
				"$group": {"_id": {"student": "$student", "state": "$state"}, "count": {"$sum": 1}}
			},
			{
				"$sort": {"count": -1}
			},
			{
				"$group": {"_id": "$_id.student", "student": {"$first": "$_id.student"}, "state": {"$first": "$_id.state"}, "frequency": {"$first": "$count"}}
			},
			{
				"$unset": ["_id"]
			}
		]);
		return [doc for doc in users_]
	except Exception as e:
		print(f"Error: {e}")
		return None
	finally:
		if type(db)==MongoClient:
			db.close()

def get_current_states(lec_id):
	db = ""
	try:
		db = connect_db()
		current_ = db.mindstates.aggregate([
			{
				"$match": {
				"lecture": lec_id
				}
			},
			{
				"$sort": {"chunk": -1}
			},
			{
				"$limit": 1
			}
		])
		current_chunk = [doc for doc in current_][0]['chunk']
		states_ = db.mindstates.aggregate([
			{ 
				"$match": {"lecture": lec_id, "chunk": current_chunk}
			},
			{
				"$group": {"_id": "$state", "state": {"$first": "$state"}, "count": {"$sum": 1}}
			},
			{
				"$unset": ["_id"]
			}
		])
		return [doc for doc in states_]
	except Exception as e:
		print(f"Error: {e}")
		return None
	finally:
		if type(db)==MongoClient:
			db.close()


def get_current_chunk(lec_id):
	db = ""
	try:
		db = connect_db()
		current_ = db.mindstates.aggregate([
			{
				"$match": {
				"lecture": lec_id
				}
			},
			{
				"$sort": {"chunk": -1}
			},
			{
				"$limit": 1
			}
		])
		current_chunk = [doc for doc in current_][0]['chunk']
		return current_chunk
	except Exception as e:
		print(f"Error: {e}")
		return None
	finally:
		if type(db)==MongoClient:
			db.close()

def get_students_ids(lec_id):
	db = ""
	try:
		db = connect_db()
		return db.mindstates.distinct("student", {"lecture": lec_id})
	except Exception as e:
		print(f"Error: {e}")
		return None
	finally:
		if type(db)==MongoClient:
			db.close()