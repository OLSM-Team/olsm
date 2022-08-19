import io
import json
import time
import base64
import logging
import numpy as np
from PIL import Image
# import concurrent.futures
from flask_cors import CORS
from pymongo import MongoClient
from bson.json_util import ObjectId
from flask import Flask, jsonify, request
from utils.focus_detector import FocusDetector


class MyEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, ObjectId):
            return str(obj)
        return super(MyEncoder, self).default(obj)


app = Flask(__name__)
CORS(app)
app.json_encoder = MyEncoder

logging.basicConfig(filename='Interface.log', level=logging.DEBUG)


def connect_db():
    client = MongoClient(host='db',
                         port=27017,
                         username='root',
                         password='pass',
                         authSource="admin")
    db = client["olsm_db"]
    return db


def update_db(document):
    db = ""
    try:
        db = connect_db()
        db.mindstates.insert_one(document)
    except Exception as e:
        print(f'DB Insert Error: {e}')
    finally:
        if type(db) == MongoClient:
            db.close()


# def get_emotions(image):
#     global m
#     return m.predict_single(np.array(Image.open(io.BytesIO(base64.b64decode(
#         image.split(',')[1]))).convert("RGB")))['proba_list']


@app.route('/predict', methods=['POST'])
def predict():
    global m
    r = request.json
    lec_id = int(r['lecture'])
    std_id = int(r['student'])
    chunk = r['chunk']
    start = time.perf_counter()
    images = [np.array(Image.open(io.BytesIO(base64.b64decode(
        image.split(',')[1]))).convert("RGB")) for image in r['images']]
    # with concurrent.futures.ProcessPoolExecutor(6) as executer:
    #     results = executer.map(get_emotions, r['images'])
    #     response = m.predict_mindstate([result for result in results])
    response = m.predict_many(images)

    app.logger.info(
        f'Prediction of {len(r["images"])} took {time.perf_counter()-start} second(s).')
        
    document = dict(lecture=lec_id, student=std_id,
                    state=response, chunk=chunk)
    update_db(document)
    return jsonify(document), 200, {"Access-Control-Allow-Origin": "*"}


@app.route('/predict-single', methods=['POST'])
def predict_single():
    global m
    r = request.json
    image = np.array(Image.open(io.BytesIO(
        base64.b64decode(r['image'].split(',')[1]))).convert("RGB"))
    response = m.predict_single(image)
    return jsonify(response), 200, {"Access-Control-Allow-Origin": "*"}


@app.route('/version', methods=['GET', 'POST'])
def version():
    return jsonify({'version': m.version_}), 200, {"Access-Control-Allow-Origin": "*"}


if __name__ == '__main__':
    m = FocusDetector()
    context = ('olsm_ddns_net.pem', 'myserver.key')
    app.run(host='0.0.0.0', debug=True, threaded=True,
            port=8000, ssl_context=context)
else:
    m = FocusDetector()
