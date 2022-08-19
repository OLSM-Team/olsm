db = db.getSiblingDB("olsm_db");
db.user.drop();
db.lectures.drop();
db.mindstates.drop();

db.lectures.createIndex(
    {"id": 1}
);

db.users.createIndex(
    {"id": 1}
);

db.mindstates.createIndex(
    {"lecture": 1}
);

db.mindstates.createIndex(
    {"student": 1, "chunk": 1, "state": 1}
);

db.lectures.insertMany([
    {"id":1000,"title":"Vectors and Vector Space","course":"Linear Algebra","instructor":1,"status":0,"duration":180,"link":"","start":1660998000,"end":"","invite":"1660998000&1000%2","dash":"nr47yudw%3&1000","subtopics":[{"from":0,"to":282,"title":"Intro"},{"from":283,"to":400,"title":"LA Definition"},{"from":401,"to":500,"title":"Conclusion"}]}
]);

db.mindstates.insertMany([
    {
        "lecture": 1000,    // Lecture id
        "student": 5002,    // Student id
        "chunk": 283,         // Chunk id -starts at 0- and represent the nth set of frames passed since the lecture started.
        "state": "Confused" // Student state of mind
    },
    {
        "chunk": 284,
        "lecture": 1000,
        "state": "Satisfied",
        "student": 5002
    },
    {
        "chunk": 283,
        "lecture": 1000,
        "state": "Dissatisfied",
        "student": 5003
    },
    {
        "chunk": 284,
        "lecture": 1000,
        "state": "Satisfied",
        "student": 5003
    },
    {
        "chunk": 285,
        "lecture": 1000,
        "state": "Satisfied",
        "student": 5002
    },
    {
        "chunk": 286,
        "lecture": 1000,
        "state": "Frustrated",
        "student": 5002
    },
    {
        "chunk": 287,
        "lecture": 1000,
        "state": "Satisfied",
        "student": 5003
    },
    {
        "chunk": 288,
        "lecture": 1000,
        "state": "Distracted",
        "student": 5003
    },
    {
        "chunk": 289,
        "lecture": 1000,
        "state": "Distracted",
        "student": 500
    },
    {
        "chunk": 290,
        "lecture": 1000,
        "state": "Distracted",
        "student": 500
    },
    {
        "chunk": 291,
        "lecture": 1000,
        "state": "Distracted",
        "student": 500
    },
    {
        "chunk": 292,
        "lecture": 1000,
        "state": "Distracted",
        "student": 500
    },
    {
        "chunk": 292,
        "lecture": 1000,
        "state": "Distracted",
        "student": 700
    },
    {
        "chunk": 293,
        "lecture": 1000,
        "state": "Distracted",
        "student": 500
    },
    {
        "chunk": 293,
        "lecture": 1000,
        "state": "Distracted",
        "student": 700
    },
    {
        "chunk": 294,
        "lecture": 1000,
        "state": "Distracted",
        "student": 500
    },
    {
        "chunk": 295,
        "lecture": 1000,
        "state": "Distracted",
        "student": 500
    },
    {
        "chunk": 296,
        "lecture": 1000,
        "state": "Distracted",
        "student": 500
    },
    {
        "chunk": 304,
        "lecture": 1000,
        "state": "Distracted",
        "student": 21
    },
    {
        "chunk": 305,
        "lecture": 1000,
        "state": "Distracted",
        "student": 21
    },
    {
        "chunk": 306,
        "lecture": 1000,
        "state": "Distracted",
        "student": 600
    },
    {
        "chunk": 306,
        "lecture": 1000,
        "state": "Distracted",
        "student": 21
    },
    {
        "chunk": 307,
        "lecture": 1000,
        "state": "Distracted",
        "student": 600
    },
    {
        "chunk": 307,
        "lecture": 1000,
        "state": "Confused",
        "student": 21
    },
    {
        "chunk": 308,
        "lecture": 1000,
        "state": "Distracted",
        "student": 600
    },
    {
        "chunk": 308,
        "lecture": 1000,
        "state": "Distracted",
        "student": 21
    },
    {
        "chunk": 309,
        "lecture": 1000,
        "state": "Distracted",
        "student": 600
    },
    {
        "chunk": 309,
        "lecture": 1000,
        "state": "Distracted",
        "student": 21
    },
    {
        "chunk": 310,
        "lecture": 1000,
        "state": "Distracted",
        "student": 600
    },
    {
        "chunk": 310,
        "lecture": 1000,
        "state": "Distracted",
        "student": 21
    },
    {
        "chunk": 311,
        "lecture": 1000,
        "state": "Distracted",
        "student": 21
    },
    {
        "chunk": 312,
        "lecture": 1000,
        "state": "Distracted",
        "student": 800
    },
    {
        "chunk": 312,
        "lecture": 1000,
        "state": "Distracted",
        "student": 21
    },
    {
        "chunk": 313,
        "lecture": 1000,
        "state": "Distracted",
        "student": 21
    },
    {
        "chunk": 319,
        "lecture": 1000,
        "state": "Satisfied",
        "student": 101
    },
    {
        "chunk": 321,
        "lecture": 1000,
        "state": "Satisfied",
        "student": 36
    },
    {
        "chunk": 322,
        "lecture": 1000,
        "state": "Frustrated",
        "student": 36
    },
    {
        "chunk": 323,
        "lecture": 1000,
        "state": "Frustrated",
        "student": 36
    },
    {
        "chunk": 321,
        "lecture": 1000,
        "state": "Satisfied",
        "student": 101
    },
    {
        "chunk": 324,
        "lecture": 1000,
        "state": "Satisfied",
        "student": 36
    },
    {
        "chunk": 325,
        "lecture": 1000,
        "state": "Distracted",
        "student": 36
    },
    {
        "chunk": 326,
        "lecture": 1000,
        "state": "Frustrated",
        "student": 36
    },
    {
        "chunk": 327,
        "lecture": 1000,
        "state": "Satisfied",
        "student": 36
    },
    {
        "chunk": 326,
        "lecture": 1000,
        "state": "Frustrated",
        "student": 36
    },
    {
        "chunk": 330,
        "lecture": 1000,
        "state": "Distracted",
        "student": 36
    },
    {
        "chunk": 328,
        "lecture": 1000,
        "state": "Frustrated",
        "student": 36
    },
    {
        "chunk": 314,
        "lecture": 1000,
        "state": "Frustrated",
        "student": 800
    },
    {
        "chunk": 346,
        "lecture": 1000,
        "state": "Satisfied",
        "student": 36
    },
    {
        "chunk": 347,
        "lecture": 1000,
        "state": "Satisfied",
        "student": 36
    },
    {
        "chunk": 348,
        "lecture": 1000,
        "state": "Distracted",
        "student": 36
    },
    {
        "chunk": 319,
        "lecture": 1000,
        "state": "Dissatisfied",
        "student": 800
    },
    {
        "chunk": 349,
        "lecture": 1000,
        "state": "Satisfied",
        "student": 36
    },
    {
        "chunk": 350,
        "lecture": 1000,
        "state": "Satisfied",
        "student": 36
    },
    {
        "chunk": 351,
        "lecture": 1000,
        "state": "Distracted",
        "student": 36
    },
    {
        "chunk": 352,
        "lecture": 1000,
        "state": "Distracted",
        "student": 36
    },
    {
        "chunk": 353,
        "lecture": 1000,
        "state": "Distracted",
        "student": 36
    },
    {
        "chunk": 354,
        "lecture": 1000,
        "state": "Distracted",
        "student": 36
    },
    {
        "chunk": 316,
        "lecture": 1000,
        "state": "Distracted",
        "student": 800
    },
    {
        "chunk": 355,
        "lecture": 1000,
        "state": "Distracted",
        "student": 36
    },
    {
        "chunk": 353,
        "lecture": 1000,
        "state": "Distracted",
        "student": 36
    },
    {
        "chunk": 356,
        "lecture": 1000,
        "state": "Distracted",
        "student": 36
    },
    {
        "chunk": 357,
        "lecture": 1000,
        "state": "Satisfied",
        "student": 36
    },
    {
        "chunk": 358,
        "lecture": 1000,
        "state": "Satisfied",
        "student": 36
    },
    {
        "chunk": 359,
        "lecture": 1000,
        "state": "Satisfied",
        "student": 36
    },
    {
        "chunk": 360,
        "lecture": 1000,
        "state": "Satisfied",
        "student": 36
    },
    {
        "chunk": 361,
        "lecture": 1000,
        "state": "Satisfied",
        "student": 36
    },
    {
        "chunk": 362,
        "lecture": 1000,
        "state": "Distracted",
        "student": 36
    },
    {
        "chunk": 363,
        "lecture": 1000,
        "state": "Distracted",
        "student": 36
    },
    {
        "chunk": 364,
        "lecture": 1000,
        "state": "Satisfied",
        "student": 36
    },
    {
        "chunk": 365,
        "lecture": 1000,
        "state": "Satisfied",
        "student": 36
    },
    {
        "chunk": 320,
        "lecture": 1000,
        "state": "Satisfied",
        "student": 800
    },
    {
        "chunk": 317,
        "lecture": 1000,
        "state": "Distracted",
        "student": 800
    },
    {
        "chunk": 321,
        "lecture": 1000,
        "state": "Satisfied",
        "student": 800
    },
    {
        "chunk": 440,
        "lecture": 1000,
        "state": "Distracted",
        "student": 500
    },
    {
        "chunk": 441,
        "lecture": 1000,
        "state": "Distracted",
        "student": 500
    },
    {
        "chunk": 442,
        "lecture": 1000,
        "state": "Distracted",
        "student": 500
    },
    {
        "chunk": 472,
        "lecture": 1000,
        "state": "Satisfied",
        "student": 903
    },
    {
        "chunk": 473,
        "lecture": 1000,
        "state": "Satisfied",
        "student": 903
    },
    {
        "chunk": 474,
        "lecture": 1000,
        "state": "Satisfied",
        "student": 903
    },
    {
        "chunk": 475,
        "lecture": 1000,
        "state": "Satisfied",
        "student": 903
    },
    {
        "chunk": 476,
        "lecture": 1000,
        "state": "Frustrated",
        "student": 903
    },
    {
        "chunk": 477,
        "lecture": 1000,
        "state": "Frustrated",
        "student": 903
    },
    {
        "chunk": 478,
        "lecture": 1000,
        "state": "Frustrated",
        "student": 903
    },
    {
        "chunk": 479,
        "lecture": 1000,
        "state": "Satisfied",
        "student": 903
    },
    {
        "chunk": 486,
        "lecture": 1000,
        "state": "Distracted",
        "student": 600
    },
    {
        "chunk": 487,
        "lecture": 1000,
        "state": "Distracted",
        "student": 600
    },
    {
        "chunk": 489,
        "lecture": 1000,
        "state": "Dissatisfied",
        "student": 600
    },
    {
        "chunk": 498,
        "lecture": 1000,
        "state": "Distracted",
        "student": 60
    },
    {
        "chunk": 499,
        "lecture": 1000,
        "state": "Distracted",
        "student": 60
    },
    {
        "chunk": 249,
        "lecture": 1000,
        "state": "Distracted",
        "student": 80
      },
      {
        "chunk": 250,
        "lecture": 1000,
        "state": "Distracted",
        "student": 80
      },
      {
        "chunk": 251,
        "lecture": 1000,
        "state": "Confused",
        "student": 80
      },
      {
        "chunk": 255,
        "lecture": 1000,
        "state": "Satisfied",
        "student": 80
      },
      {
        "chunk": 256,
        "lecture": 1000,
        "state": "Satisfied",
        "student": 80
      },
      {
        "chunk": 257,
        "lecture": 1000,
        "state": "Confused",
        "student": 80
      },
      {
        "chunk": 258,
        "lecture": 1000,
        "state": "Satisfied",
        "student": 80
      },
      {
        "chunk": 259,
        "lecture": 1000,
        "state": "Satisfied",
        "student": 80
      },
      {
        "chunk": 260,
        "lecture": 1000,
        "state": "Satisfied",
        "student": 80
      },
      {
        "chunk": 261,
        "lecture": 1000,
        "state": "Satisfied",
        "student": 80
      }
]);