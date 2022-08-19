db = db.getSiblingDB("olsm_db");
db.user.drop();
db.lectures.drop();
db.mindstates.drop();

db.users.insertMany([
    {
        "id": 1,
        "name": "John Doe",
        "email": "j.doe@anydomain.com",
        "gender": 1, // 0: female & 1: male
        "password": "hashed_passwd",
        "role": 1    // 0: student & 1: instructor
    },
    {
        "id": 2,
        "name": "Jane Dowayn",
        "email": "j.dowayn@anydomain.com",
        "gender": 0,
        "password": "hashed_passwd",
        "role": 0
    },
    {
        "id": 3,
        "name": "Mark Goodfellow",
        "email": "m.goodfellow@anydomain.com",
        "gender": 1,
        "password": "hashed_passwd",
        "role": 0
    },
    {
        "id": 4,
        "name": "Christina Dom",
        "email": "c.dom@anydomain.com",
        "gender": 0,
        "password": "hashed_passwd",
        "role": 1
    },
    {
        "id": 5,
        "name": "Carol Gracefield",
        "email": "c.gracefield@anydomain.com",
        "gender": 0,
        "password": "hashed_passwd",
        "role": 0
    },
    {
        "id": 6,
        "name": "Brian Peterson",
        "email": "b.peterson@anydomain.com",
        "gender": 1,
        "password": "hashed_passwd",
        "role": 0
    }
]);

db.lectures.insertMany([
    {
        "id": 1000,
        "title": "Linear Algebra - Session 01",
        "instructor": 4,    // instructor id
        "status": 0,        // 0: progressing & 1: finished
        "duration": 180,    // expected duration in minutes
        "start": 1659810385, // epoch in seconds, i.e. marks the beginning of the lecture
        "subtopics": [
            {
                "from": 1,  // in chunk id
                "to": 282,   // in chunk id
                "title": "Intro"
            },
            {
                "from": 283,
                "to": 400,
                "title": "LA Definition"
            },
            {
                "from": 401,
                "to": 500,
                "title": "Conclusion"
            },
        ]
    }
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
            "chunk": 322,
            "lecture": 1000,
            "state": null,
            "student": 800
        },
        {
            "chunk": 318,
            "lecture": 1000,
            "state": null,
            "student": 800
        },
        {
            "chunk": 321,
            "lecture": 1000,
            "state": "Satisfied",
            "student": 800
        },
        {
            "chunk": 315,
            "lecture": 1000,
            "state": null,
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

//  ----------------------------------------------------------------------------------------------------------------------


// Get the students most frequent category (mode) in a certain subtopic, let's say the subtopic is from chunk 0 till 7
db.mindstates.aggregate([
    {   // Search for documents where lecture id = 1000 and chunk id between 0 and 7
        "$match": {lecture: 1000, chunk: {$gte: 0, $lte: 7}}
    },
    {   // Group by both "student and "state" fields, and aggregate using sum as "count"
        "$group": {_id: {"student": "$student", "state": "$state"}, count: {$sum: 1}}
    },
    {   // Sort the documents descendingly
        "$sort": {"count": -1}
    },
    {   // Group by "student field again, get the "student" field, get the "state" field, and get the "count" field of
        // the first document, i.e. the one wih the most frequent state of mind per student.
        "$group": {_id: "$_id.student", student: {$first: "$_id.student"}, state: {$first: "$_id.state"}, frequency: {$first: "$count"}}
    },
    {   // Don't return the "_id" field in the result
        "$unset": ["_id"]
    }
]);

// Returns
[
    {
      "frequency": 2,
      "state": "Satisfied",
      "student": 5003
    },
    {
      "frequency": 2,
      "state": "Satisfied",
      "student": 5002
    }
  ]


//  ----------------------------------------------------------------------------------------------------------------------


// Get the count of each category in a range of chunks, i.e. subtopic.
db.mindstates.aggregate([
    {   // Search for documents where lecture id = 1000 and chunk id between 401 and 500
        "$match": {lecture: 1000, chunk: {$gte: 401, $lte: 500}}
    },
    {   // Group by "state" field, get the "state" field, and aggregate using sum as "count"
        "$group": {_id: "$state", state: {$first: "$state"}, count: {$sum: 1}}
    },
    {   // Don't return the "_id" field in the result
        "$unset": ["_id"]
    }
]);

// Returns
[
    {
      "count": 1,
      "state": "Confused"
    },
    {
      "count": 1,
      "state": "Dissatisfied"
    },
    {
      "count": 2,
      "state": "Satisfied"
    }
  ]


//  ----------------------------------------------------------------------------------------------------------------------


// Get the start timestamp of the lecture (if it's still progressing)
db.lectures.aggregate([
    {
      "$match": {id: 1000, status: 0}
    },
    {
      "$project": {_id: 0, start: 1}
    }
  ]);

// Returns
[
    {
      "start": 1.659810385e+09
    }
]


//  ----------------------------------------------------------------------------------------------------------------------


