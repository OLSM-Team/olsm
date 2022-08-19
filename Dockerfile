# dlib image

FROM python:latest

WORKDIR /usr/src/app

RUN apt-get update -y && \
    apt-get install build-essential cmake pkg-config ffmpeg libsm6 libxext6 -y && \
    wget https://github.com/italojs/facial-landmarks-recognition/raw/master/shape_predictor_68_face_landmarks.dat -P /usr/src/files/

RUN pip install --no-cache-dir dlib