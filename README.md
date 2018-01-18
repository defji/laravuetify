

![styleci](https://styleci.io/repos/117820317/shield?branch=master)

# Laravuetify

Sample project with Laravel 5.5 and Vuetifyjs 1.0


![screenshot](https://image.prntscr.com/image/84NGUGtGSXqHf0BrDY8xtw.png)


## Install 
```shell
git clone git@github.com:defji/laravuetify.git
cd laravuetify
cp .env.example .env 
# edit your environment variables in your .env file 
composer install
yarn install
php artisan migrate
```

## Features
* SPA (except login)
* authentication
* multi language (using vuex-i18n) 
* custom error pages

## js helpers 
```javascript
    flash('Welcome!','success')
    // displays notifycation snackbar at bottom right.
    
    question('Are you sure?','Yes','No', () => {
       alert('Question anwered.') 
    });
    // fancy confirmation using vuetify dialog
```


### TODO
- refactoring
- writing tests 

