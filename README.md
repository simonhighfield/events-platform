# About events-platform (WhatsOn)
This is a full-stack repository for the [WhatsOn](https://whats-on.netlify.app/) web-app.

The app allows users to browse electronic music events in Manchester. These events are populated from events on Skiddle, and events created by admin users. If users create an account, they can save events for later, and add them to their Google calendars.
Admin users have the ability to create, manage, and delete events.

Watch a demo [here(]https://youtu.be/HnqgFrrq5fM)

# Tech Stack
* PSQL database stored on Supabase Database
* React app built with the Vite scaffold
* Hosted on [Netlify](https://docs.netlify.com/frameworks/vite/)
* Authorisation (sign ups + sign ins) via [Supabase Auth](https://supabase.com/docs/guides/auth)
* Fetches events using [Skiddle API](https://www.skiddle.com/api/)
* Connect account and save events to calendar using [Google Calendar API](https://developers.google.com/calendar/api/guides/overview)
* Components like nav bars, cards, buttons, and forms from [React Bootstrap](https://react-bootstrap.netlify.app/)
* URLs designed with [React Router](https://reactrouter.com/)

# Links
* GitHub: https://github.com/simonhighfield/events-platform
* Hosted: https://whats-on.netlify.app/
* Demo: https://youtu.be/HnqgFrrq5fM


# Folder Structure
The folder structure created by the Vite scaffold has been maintained

* src contains most of the code.
    * components contains React components
    * utils contains functions extracted to increase readability of React components
    * data contains JS objects used in development to test posting events etc

* public contains images used in the hosted code

# App Structure
The code structure crreated by the Vite scaffold has been maintained

* index.html, main.jsx, and app.jsx provided by Vite
    *index imports the bootstrap styles via the [bootstrap CDN](https://react-bootstrap.netlify.app/docs/getting-started/introduction/)
* App.jsx defines the apps structure
    * Imports the index.css stylesheet used for macro styles such as page resizing
    * Imports fixed header and footer components
    * Defines each path that renders each page of the signle-page app e.g.
        * HomePage.jsx at (/)
        * ProfilePage at (/profile)
* Page components available
    * HomePage
    * SignInPage
    * ProfilePage
    * AddEventPage
    * EventsPage
    * SavedEventsPage
* Navigation bars NavBar.jsx and Footer.jsx route using react router Links

# Some design features
* Currently the app fetches 10 upcoming dance music events in Manchester from Skiddle:

        const skiddleParamsForClubEventsInManchester = {
            latitude: 53.4839,
            longitude: -2.446,
            radius: 10,
            limit: 10,
            eventcode: 'CLUB'
        }

* When events are fetched from skiddle, or the admin events in Supabase, they are used to create objects. Functions exist to create these objects for storage in the database, or to read them (or convert properties) to populate the front end. The objects following this format:

        const event = {
            admin_event_id: (string, uuid, optional)
            skiddle_event_id: (string, optional)
            event_source: (string, 'admin' or 'skiddle')
            admin_id: (string, id of creator),
            event_name: 'new test admin event',
            event_date: new Date('2024-12-20'),
            event_end_date: new Date('2024-12-21'),
            location: 'This nightclub',
            contributors: ['DJ 1', 'DJ 2'],
            event_photo_url: 'url',
            description: 'The coolest party',
            additional_data: null
        }

* There are database tables for profiles (signed up accounts, their profile information, and whether they are admin users), events created by admin users, and saves (when any user saves an event for later) 

* The event saves table stores the skiddle or amin ids, and event source. These are used to fetch the event information, so that a user can view their saves. Storing the id from skiddle negates teh need to duplicate all of the data to the WhatsOn database

# Getting Started on WhatsOn
Clone the GitHub repository:
    
    git clone https://github.com/simonhighfield/events-platform.git
<br>

Install the dependencies:
    
    npm i
<br>

Create .env a file in root directory to store environmental variables:
    
    VITE_SUPABASE_URL =
    VITE_SUPABASE_ANON_KEY = 
    VITE_SKIDDLE_KEY = 
    VITE_GOOGLE_CAL_API_KEY =
    VITE_GOOGLE_CAL_CLIENT_ID =
    VITE_GOOGLE_CAL_SECRET = 
<br>

Run the app on local host:
    
    npm run dev
<br>

View the hsoted Netlify proejct:
    
    netlify open
<br>


# Getting Started on a new site
Fork the project on GitHub, then clone your GitHub repository:
    
    git clone your-url
<br>

Install the dependencies:
    
    npm i
<br>

Create .env a file in root directory to store environmental variables.


Create a supabase project on the Supabase dashboard. A good tutorial on this process is available [here](https://supabase.com/docs/guides/getting-started/tutorials/with-react). Run the supabase scripts in order to create tables, policies, and triggers. Add the following tokens into .env for local testing (with npm run dev):
    
    VITE_SUPABASE_URL =
    VITE_SUPABASE_ANON_KEY = 
<br>

Best practise is to disable auth confirmation emails during development, otherwise the email limit can be exceeded, halting development Find this setting in:
    
    Superbase dashboard > providers > disable email confirmation
<br>



Apply for a skiddle API token, and add into .env:
    
    VITE_SKIDDLE_KEY = 
<br>


You will require a google account. A guide on setting up the Google environment is available [here](https://developers.google.com/calendar/api/quickstart/js). Enable the API, configure the OAuth consent screen, and authorise credentials for a web application. The URL's you should authorise are http://localhost:5173/ (for local testing) and your production URL when available. Add the following tokens into .env:
    
    VITE_GOOGLE_CAL_API_KEY =
    VITE_GOOGLE_CAL_CLIENT_ID =
    VITE_GOOGLE_CAL_SECRET = 
<br>


Run the app on local host:
    
    npm run dev
<br>

To eventually host on Netlify, the Netlify CLI will be used. It should have been installed by npm i, but if not:

    npm install netlify-cli -g
<br>

In the directory for your project, run the following command to create a new Netlify site:

    netlify init
<br>

Instructions from the [Netlify guide](https://docs.netlify.com/frameworks/vite/)

    Follow the prompts to create your site, select a team if necessary, and optionally create a site name. If you already initialized a Git repository, you can authorize your Git provider and set your build command and directory.

    If you used continuous deployment, your site is now published! To learn how to manually deploy a site, check out the manual deploy docs.


# Future Work
There's a whole Kanban board of ideas waiting to be done ... but a few key ideas:
* Lots of refactoring!
* Admins can invite others to become admins.
* Table creation and seeding from the command line
* OAuth Social login
* Display and edit profile information
* A search interface allowing to change search paramters?
* A possible rediesn of the app's purpose. Perhaps instead of fetching a search from Skiddle, it could fetch only skiddle events curated by admins. This might require a table called curated_events that saves the skiddle ids. This makes the app's purposse to only show a choice events to cut rhough the nosie.
