# React Piano Task by Jason Simms

[![DeepScan grade](https://deepscan.io/api/teams/2472/projects/3588/branches/31874/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=2472&pid=3588&bid=31874)

## To Use:

TL:DR [Visit the Deployed Version](https://myreact-piano.herokuapp.com/)

1.  Clone this repository
2.  $ cd myreact-piano-task
3.  $ npm install
4.  $ npm start

Optional Piano Only:

1.  $ npm run app


## Instruction:
- Piano offers range of Octaves that can be toggled on and Off.
- Click the keys to play the piano.
- Record button will automatically create a song file for you with the title provided when user selects "Stop Recording"
- Users have the option to hear their song played back again or upload it to the Apollo Server.

------
### About this Project:
1. Create-React-App Template:
- Build was ejected and modified for SASS support and heroku deployment. Sass is used to store variables and offers great organization flexibility.

2. The Piano is constructed of HTML button's stylized and positioned in Octaves.  
- The black keys irregular pattern is achieved with a hidden Button of equal size marked X and X2.

3. Song's are composed of two matching length arrays. 1 of notes and the other of time stamps when to play those notes.  
- SetTimeOut is used to achieve proper timing and recalculated after every note.

4. ReactBootstrap is used for some quick styling solutions and basic collapse functions.

5. React-Apollo provided some plugin solutions for quering data and provide refreshed access to the Database.

------
#### Challenges:
1. Props Communications and state control:
- I attempted to segregate components in a logical fashion while keeping the Piano rendered directly in src/App.js since that is the point of the most input from the user.

2. Dealing with Audio:
- Most instances where audio is played needed to have boolean interlocks which either allowed playing in rapid succession or not playing because something else was going on.

3. Playing a recording:
- I approached playback of notes needing to played at a certain time, originally I worked with an object, where the key is a time stamp and the note played at that time is the value.  For integration purposes with the example Apollo server I changed the function to work with two arrays of equal length. Since they are constructed during storage from the original Object it is unlikely there should be a discrepency of notes vs times.

4. Drawing the Piano:
- Key configurations were daunting, an SVG file with embedded functions might offer more controls.  But the mapped Buttons allowed me to draw the Piano programmatically and allowed quick flexibility of drawing any number of octaves I wanted.

5. Apollo:
- Given the opportunity I will finish more tutorials and look for added value.  The best feature I found was in Apollo-React offering a "polling" feature allowing for regular refreshing without hassle.

------
#### For the Future:
- I hope to explore more uses of Apollo and GraphQl and include them in the Heroku Deployment so users can share songs.

- Key Press animations can be embelished

- During Music Playback the keys could animate along with the song.

- Tutorials could show users where to play a key for a certain song.



