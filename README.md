# Online Learning System Monitoring WebApp

OLSM aims to monitor students’ focus status through facial emotion recognition during
online classes and provide the instructor with live feedback and reports

## Environment
- Software
    - Amazon Linux 2
    - Python
- Hardware
    - Development: Amazon EC2 T3 Medium
    - Production: Amazon EC2 G3 4XLarge

## Requirements
- Docker
- Docker-Compose

## Project Structure
```
.
│   .gitignore
│   docker-compose.yml
│   Dockerfile
│   dummyDB.js
│   init-db.js
│   LICENSE
│   README.md
│   setup.sh
│
├───modelapp
│   │   Dockerfile
│   │   requirements.txt
│   │
│   └───model
│       │   app.py
│       │
│       └───utils
│               focus_detector.py
│               state_prediction.py
│               __init__.py
│
└───webapp
    │   Dockerfile
    │   requirements.txt
    │
    └───interface
        │   Dashboard.py
        │   main.py
        │
        ├───assets
        │       Confused_emoji.webp
        │       Dissatisfied_emoji.webp
        │       Distracted_Emoji.webp
        │       Frustrate_emoji.webp
        │       Satisfied_emoji.webp
        │       student-engagement.JPG
        │
        ├───static
        │       base.js
        │       chgpasswd.js
        │       clipboard.min.js
        │       create.js
        │       login.js
        │       main.js
        │       overview.js
        │       register.js
        │       style.css
        │       webcam.min.js
        │
        ├───templates
        │       base.html
        │       chgpasswd.html
        │       create.html
        │       index.html
        │       login.html
        │       meeting_invite.html
        │       overview.html
        │       register.html
        │
        └───utils
                db.py
                __init__.py
```

## Team Members
- [AbdElrahman Eid](https://github.com/AbdElrahman-A-Eid)
- [Ahmed Azzam](https://github.com/AhmedAzzam99)
- [Ahmed Zakaria](https://github.com/Ahmed-Zakaria96)
- [Hager Nasser](https://github.com/Mohamed-AN)
- [Sara Emara]()