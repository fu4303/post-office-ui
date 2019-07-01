 ## Post Office User Interface
This Project consists of following api's:

 ## Motivation
 The motivation behind this project to provide the software for newly constructed post offices in berlin due to its rapid growth .
 
 ## Architectural decisions
  - Followed Separation of Concerns Principle 
    1. PostOffices
    2. Shipments
   
  - Isolated the each component to achieve 100% reusablility
  - Followed best practices to scale the application
    1. raiseAction calls to redux store
    2. Proper flow of data from parent to chile components
    3. Clean routes across the applciation
  - Followed code quality best practices 
    1. Eslint
    2. prettierrc
 
   
 ## Tech/framework used
 Ex. -
 
 <b>Built with</b>
 - React JS
 - Redux
 - isomorphic-fetch
 - Material UI
 - Jest
 - Enzyme
 
 
 ## Installation
 - Clone the https://github.com/ramanjaneya-karnati/post-office-ui.git
 - Change to the project directory and make a "**npm install**"
 - Before starting the application. The following files must be updated with the with the **<API_URL>**

 - File names:
   1. src/views/PostOffices/constants/index.jsx
   2. src/views/Shipments/constants/index.jsx
   
 - All set to start the application
 
 ## Run the app in dev mode
    npm start
  
 ## License
 
 MIT © [Ramanjaneya]()