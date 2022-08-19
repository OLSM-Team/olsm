import cv2
import dlib
import numpy as np
from fer import FER
from math import hypot
from .state_prediction import predict_state


class FocusDetector():
    def __init__(self):
        self.__m = FER(mtcnn=True)
        self.__detector = dlib.get_frontal_face_detector()
        self.__predictor = dlib.shape_predictor("/usr/src/files/shape_predictor_68_face_landmarks.dat")
        self.__version = 'v0.0.1'

    def __midpoint(self, p1, p2):
        return int((p1.x + p2.x)/2), int((p1.y + p2.y)/2)

    def __get_blinking_ratio(self, eye_points, facial_landmarks):
        left_point = (facial_landmarks.part(
            eye_points[0]).x, facial_landmarks.part(eye_points[0]).y)
        right_point = (facial_landmarks.part(
            eye_points[3]).x, facial_landmarks.part(eye_points[3]).y)
        center_top = self.__midpoint(facial_landmarks.part(
            eye_points[1]), facial_landmarks.part(eye_points[2]))
        center_bottom = self.__midpoint(facial_landmarks.part(
            eye_points[5]), facial_landmarks.part(eye_points[4]))

        hor_line_lenght = hypot(
            (left_point[0] - right_point[0]), (left_point[1] - right_point[1]))
        ver_line_lenght = hypot(
            (center_top[0] - center_bottom[0]), (center_top[1] - center_bottom[1]))
        ratio = ver_line_lenght / hor_line_lenght
        return ratio

    def __get_gaze_ratio(self, eye_points, facial_landmarks, gray):
        # Gaze detection
        left_eye_region = np.array([(facial_landmarks.part(eye_points[0]).x, facial_landmarks.part(eye_points[0]).y),
                                    (facial_landmarks.part(
                                        eye_points[1]).x, facial_landmarks.part(eye_points[1]).y),
                                    (facial_landmarks.part(
                                        eye_points[2]).x, facial_landmarks.part(eye_points[2]).y),
                                    (facial_landmarks.part(eye_points[3]).x,
                                    facial_landmarks.part(eye_points[3]).y),
                                    (facial_landmarks.part(eye_points[4]).x,
                                    facial_landmarks.part(eye_points[4]).y),
                                    (facial_landmarks.part(eye_points[5]).x, facial_landmarks.part(eye_points[5]).y)], np.int32)

        height, width = gray.shape
        mask = np.zeros((height, width), np.uint8)
        cv2.polylines(mask, [left_eye_region], True, 255, 2)
        cv2.fillPoly(mask, [left_eye_region], 255)
        eye = cv2.bitwise_and(gray, gray, mask=mask)

        min_x = np.min(left_eye_region[:, 0])
        max_x = np.max(left_eye_region[:, 0])
        min_y = np.min(left_eye_region[:, 1])
        max_y = np.max(left_eye_region[:, 1])
        gray_eye = eye[min_y: max_y, min_x: max_x]
        _, threshold_eye = cv2.threshold(gray_eye, 70, 255, cv2.THRESH_BINARY)

        height, width = threshold_eye.shape
        left_side_threshold = threshold_eye[0: height, 0: int(width / 2)]
        left_side_white = cv2.countNonZero(left_side_threshold)
        right_side_threshold = threshold_eye[0: height, int(width / 2): width]
        right_side_white = cv2.countNonZero(right_side_threshold)

        up_side_threshold = threshold_eye[0: int(height/2), 0: int(width / 2)]
        up_side_white = cv2.countNonZero(up_side_threshold)
        down_side_threshold = threshold_eye[int(height/2): height, 0: width]
        down_side_white = cv2.countNonZero(down_side_threshold)
        lr_gaze_ratio = (left_side_white+10) / (right_side_white+10)
        ud_gaze_ratio = (up_side_white+10) / (down_side_white+10)
        return lr_gaze_ratio, ud_gaze_ratio

    def predict_single(self, frame):
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = self.__detector(gray)

        face_response = {
            'proba_list': None,
            'focus_status': None
        }

        for face in faces[:1]:
            landmarks = self.__predictor(gray, face)
            left_point = (landmarks.part(36).x, landmarks.part(36).y)
            right_point = (landmarks.part(39).x, landmarks.part(39).y)
            center_top = self.__midpoint(
                landmarks.part(37), landmarks.part(38))
            center_bottom = self.__midpoint(
                landmarks.part(41), landmarks.part(40))
            hor_line = cv2.line(frame, left_point, right_point, (0, 255, 0), 2)
            ver_line = cv2.line(frame, center_top,
                                center_bottom, (0, 255, 0), 2)
            landmarks = self.__predictor(gray, face)
            left_eye_ratio = self.__get_blinking_ratio(
                [36, 37, 38, 39, 40, 41], landmarks)

            gaze_ratio_lr, gaze_ratio_ud = self.__get_gaze_ratio(
                [36, 37, 38, 39, 40, 41], landmarks, gray)

            gaze_weights = 0

            if left_eye_ratio < 0.2:
                gaze_weights = 0
            elif left_eye_ratio > 0.2 and left_eye_ratio < 0.3:
                gaze_weights = 1.5
            else:
                if gaze_ratio_lr < 2 and gaze_ratio_lr > 1:
                    gaze_weights = 5
                else:
                    gaze_weights = 2

            status = 'Fully Focused' if gaze_weights > 2 else 'Nominally Focused' if gaze_weights > 0 else 'Distracted'

            if gaze_weights > 0:
                results = self.__m.detect_emotions(frame)
                proba_list = results[0]['emotions']
            else:
                proba_list = None

            face_response = {
                'proba_list': proba_list,
                'focus_status': status
            }

        return face_response

    def predict_many(self, frames):
        proba_lists = []
        for frame in frames:
            single_result = self.predict_single(frame)
            proba_lists.append(single_result['proba_list'])
        state = predict_state(proba_lists)
        return state

    def predict_mindstate(self, proba_lists):
        state = predict_state(proba_lists)
        return state

    @property
    def version_(self):
        return self.__version
