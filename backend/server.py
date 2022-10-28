from flask import Flask
from flask import request
from flask import Response
from flask_cors import CORS
import json
import uuid
import os

app = Flask(__name__)
CORS(app)

@app.route("/api/images", methods=['GET'])
def get_images():

    file = open('data.json')
    data = json.load(file)

    return data

@app.route('/api/images', methods=['POST'])
def upload_image():

    imgId = str(uuid.uuid4())
    data = {
        "id": imgId,
        "title": request.form['title'],
        "creator": request.form['creator'],
    }

    db = open('data.json')
    saved_data = json.load(db)

    file = request.files['image']
    fileExt = file.filename.rsplit(".", 1)[1]
    fileName = imgId + "." + fileExt
    file.save('./static/' + fileName)

    data["filename"] = fileName

    saved_data.append(data)
    with open('data.json', 'w') as file:
        json.dump(saved_data, file)

    return {
        "saved": True
    }

@app.route('/api/images/<string:image_id>', methods=['DELETE'])
def delete_image(image_id):

    db = open('data.json')
    saved_data = json.load(db)

    new_data = []
    for img_data in saved_data:
        if img_data["id"] == image_id:
            os.remove('./static/' + img_data["filename"])
        else:
            new_data.append(img_data)

    with open('data.json', 'w') as file:
        json.dump(new_data, file)
    
    return {
        "deleted": True
    }