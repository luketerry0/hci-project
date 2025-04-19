# HCI-Project

A **Plinko-based typing game** that challenges your speed and accuracy!

## Try It Out Here!

[Play the Game](https://luketerry0.github.io/hci-project/)

No installation is required, as it is hosted online. Fortawesome was used for icons, freesound.org and pixabay.com used for sounds. The app itself is simply built using Angular CLI 17.3.11. Building the app locally requires npm and node.js, as these are used to create a development server for the Angular app. All other requirements can be found under hci-project/node_modules.

The key parts of the code to note are our usage of Angular components. These components help to keep code organized and are separated into services and non-services. The services work to centralize key functions of the application, such as the Text Service which helps to monitor the user's typing speed and words per minute count. There is also the GameStateService which helps to keep the various upgrades running smoothly and interacting with the plinko board and autotyper workzone correctly. The other non-services are components that are used in the app.component.html file to actually display the various parts of the page. Keeping the various parts of the application separate allows us to easily swap in and out the different parts of the game to our liking.

To start up a local server, simply clone the repo, navigate into hci-project/hci-project and then run ng serve.
