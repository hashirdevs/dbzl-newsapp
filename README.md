A News APP with Django (DRF) as backend and React(TSX) as frontend. 

API: https://newsapi.org/docs/endpoints/everything
Material UI: https://mui.com/

**Setup Backend**
- cd backend
- python -m venv env
- pip install -r requirements.txt
- python manage.py runserver
- That's it

**Setup Frontend**
- cd frontend
- npm install
- npm install @mui/material @emotion/react @emotion/styled
- That's it


**Performance**
As this is a simple news app, I will keep structure very simple. Using Skeletons for loading and Fetch on change of Language, Topic or Theme.
For Theme, there are some complex libraries and styles scripts which change style of children elements etc. but I kept it pretty simple by changing "direction = ltr | rtl", which is also working in this case.
