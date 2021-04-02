# Mapper

Mapper is a Single Page Full-Stack Application that allows users to create and store personalized maps.


Tech Stack: ReactJS, Ruby/Rails, Postgres, Leaflet, Material-UI, Sass, Axios

## Final Product

Login/Register:
![Login](https://raw.githubusercontent.com/josepwil/mapper/main/screenshots/login_page.png)

View any of your saved maps:
![home](https://raw.githubusercontent.com/josepwil/mapper/main/screenshots/mapper_desktop_home.png)

Create a new map or edit an existing one:
![edit](https://raw.githubusercontent.com/josepwil/mapper/main/screenshots/mapper_desktop_edit.png)

Responsive Design:
![responsive](https://raw.githubusercontent.com/josepwil/mapper/main/screenshots/responsive_design.png)


## Getting started
1. Run ``bundle install`` to install dependencies
2. Run ``bin/rails db:reset``, to create and load the db
3. In a new terminal window, ``cd client`` and run ``npm install``
4. In the original terminal window run ``bin/rails s``
5. In the client window run ``npm start``
6. Visit http://localhost:3000/ to start using the app


## Dependencies
- Rails ^6.0.0
- React ^17.0.1
- Sass ^5.0.0
- Material-UI ^4.11.3
- Axios 0.21.1
- Leaflet ^1.7.1