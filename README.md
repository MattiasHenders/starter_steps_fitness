## Starter Steps Fitness
* [General info](#general-info)
* [Technologies](#technologies)
* [Contents](#content)

## General Info
This browser based web application lets users sign up, set fitness goals, and workout with guided instructions and weights given!
This small project demonstrates:
* read and write to firestore, a non-sql database
* use of firebase authentication and creation of a users collection in firestore
* customized user experience after login/signup
* tracking of a workouts completed by the user
* display of a user's history of completed workouts
* use of navbar in boostrap stickied to the bottom

	
## Technologies
Technologies that were used for this project:
* Glowhost Hosting
* Firebase Firestore Database
* HTML, CSS
* JavaScript
* Bootstrap 
	
## Content
Content of the project folder:

```
 Top level of project folder: 
├── .gitignore          	    # Git ignore file
├── index.html             	    # landing HTML file, user must login or sign up to use app
├── login.html               	# login HTML file, contains logic for user authentication
├── main.html                	# after logged in, you can start your workout, check your schedule, or edit profile
├── main2.html               	# after logged in, you can do most normal function but also get an encouraging message
├── profile_change.html      	# page to edit your own profile preferences: age, weight, height, sex, fitness, and goals
├── profile_review.html	 	 	# page to review your own profile preferences: age, weight, height, sex, fitness, and goals
├── profile_schedule.html	 	# page to review your workout schedule
├── result.html	 			 	# page to review your completed workout for the day
├── result_activities.html	 	# page to review your completed workout for the day
├── result_check.html	 	 	# page to enter a day to see the workout for that specific day
├── result_checkactivities.html # page to review your completed workout for the specific entered day
├── result_checkstats.html 		# page to review your progress graph for the specific entered week
├── result_stats.html 			# page to view the graph for the week
├── workout.html	 			# page to complete the workout
├── .DS_Store				 	# for Mac users
└── README.md

It has the following subfolders:
├── .git                     			# Folder for git repo
├── .vscode                  			# Folder for Virtual Studio Code
├── images                   			# Folder for images
├── scripts                  			# Folder for scripts
	/firebase-starter-steps-fitness.js	# Firebase script for the apps database
	/iconbar.js                  		# The script for the sticky icon bar at the bottom of each page
	/main.js                  			# The script for the two main pages
	/profile.js                  		# The script for the profile page
	/profile_change.js                  # The script for the page to change your profile
	/result.js                  		# The script for the results page
	/result_check.js                  	# The script to enter a day for checking results
	/result_checkactivities.js          # The script for checking weeks activities
	/result_checkstats.js               # The script for checking a certain weeks graph
	/result_stats.js                  	# The script for checking the weeks graph
	/schedule.js                  		# The script for the workout schedule page
	/workout.js                  		# The script for the workout page
	
├── styles                   # Folder for styles, css
	/login.css				 # Styles for login page
	/main.css				 # Styles for main pages
	/master.css				 # Styles for all pages
	/profile.css			 # Styles for user profile page
	/result.css				 # Styles for results page
	/workout.css			 # Styles for the workout page


```

