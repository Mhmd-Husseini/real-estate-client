<img src="./readme/title1.svg"/>

<br><br>

<!-- project philosophy -->
<img src="./readme/title2.svg"/>

> A website app that serves as a real estate market, making it easier for sellers, buyers and anyone interested in real estate investement to buy, sell and get insights to the Lebanese market.
>
> In additon to a desktop app designed to give administrators full control over the website and provide in-depth analytics. 
>
> Lebanon RealEstate Insights is your gateway to the Lebanese real estate market. Whether you're looking to buy your dream property, sell your current one, or gain valuable insights into the market trends, we've got you covered. 

### User Stories
- As a user, I want to browse property listings with the ability to customize my property search criteria, such as location, price, and property type, so I can narrow down my options to the most suitable properties.
- As a user, I want to post my property on the website and customize the listing details, including property features and photos, to attract potential buyers and showcase my property effectively.
- As a user, I want access to comprehensive market data, including historical price trends, articles, so I get insights to investment in Lebanon.
- As a user, I want the to schedule meetings with sellers or buyers, allowing them to schedule meetings with me.
- As an admin, I want to browse website data and also access comprehensive analytics, so I can manage the website efficiently.

<br><br>

<!-- Prototyping -->
<img src="./readme/title3.svg"/>

> We designed Lebanon RealEstate Insights using wireframes and mockups, iterating on the design until we reached the ideal layout for easy navigation and a seamless user experience.

### Wireframes
| Landing Page  | Landing Page |  Properties Page |
| ---| ---| ---|
| ![Landing](./readme/demo/Landing1.png) | ![Landing](./readme/demo/Landing2.png) | ![Properties](./readme/demo/Properties.png) |

### Mockups
| Trends  | Property Details | Dashboard |
| ---| ---| ---|
| ![Trends](./readme/demo/Trends.png) | ![Details](./readme/demo/PropertyDetails.png) | ![Dashboad](./readme/demo/Dashboard.png) |

<br><br>

<!-- Implementation -->
<img src="./readme/title4.svg"/>

> Using the wireframes and mockups as a guide, we implemented the Lebanon RealEstate Insights website with the following features:

### User Screens (Web)
| Register screen  | Landing screen |  Trends screen |
| ---| ---| ---|
| ![Register](./readme/demo/web-pages/register.png) | ![Landing](./readme/demo/web-pages/landing.png) | ![fsdaf](./readme/demo/web-pages/properties.png) |
| Properties screen  | Property Screen | Add Screen |
| ![Properties](./readme/demo/web-pages/properties.png) | ![fsdaf](./readme/demo/web-pages/property.png) | ![fsdaf](./readme/demo/web-pages/add.png) |

### Admin Screens (Desktop App)
| Login screen  | Register screen |  Landing screen |
| ---| ---| ---|
| ![Landing](./readme/demo/1440x1024.png) | ![fsdaf](./readme/demo/1440x1024.png) | ![fsdaf](./readme/demo/1440x1024.png) |
| Home screen  | Menu Screen | Order Screen |
| ![Landing](./readme/demo/1440x1024.png) | ![fsdaf](./readme/demo/1440x1024.png) | ![fsdaf](./readme/demo/1440x1024.png) |

<br><br>

<!-- Tech stack -->
<img src="./readme/title5.svg"/>

###  Lebanon RealEstate Insights is built using the following technologies:

- This project uses the [React Javascript Library](https://react.dev/). 
React is a free and open-source front-end JavaScript library for building user interfaces based on components. It is used to design frontend for apps on mobile, desktop, and the web.
- For persistent data storage (database), the website and admin desktop application use [MySQL](https://www.mysql.com/) to create a structured database schema for efficiently storing and retrieving information related to properties, users, and other data.
- This project uses [Laravel](https://laravel.com), a robust PHP web application framework, as a central component of its architecture. Laravel plays a pivotal role in the project, primarily focusing on the development of robust and secure APIs (Application Programming Interfaces). 
- This project also uses the [Node.js](https://nodejs.org/en) for building the backend of the admin desktop application. Node.js is an open-source, server-side JavaScript runtime environment that allows for efficient server-side scripting and the development of network applications.
- For the desktop application's frontend, [Electron](https://www.electronjs.org/) is utilized to create a structured database schema for efficiently storing and retrieving information related to properties, users, and other data.

<br><br>

<!-- How to run -->
<img src="./readme/title6.svg"/>

> To set up Lebanon RealEstate Insights locally, follow these steps:

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Get a free API Key at [https://example.com](https://example.com)
2. Clone the repo
   ```sh
   git clone https://github.com/your_username_/Project-Name.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Enter your API in `config.js`
   ```js
   const API_KEY = 'ENTER YOUR API';
   ```

Now, you should be able to run Coffee Express locally and explore its features.
