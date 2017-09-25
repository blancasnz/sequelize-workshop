var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', {
  // logging: false // if you want to see the table logged or not
});

function generateUrlTitle(title) {
  if (title) {
    // Removes all non-alphanumeric characters from title
    // And make whitespace underscore
    return title.replace(/\s+/g, '_').replace(/\W/g, '');
  } else {
    // Generates random 5 letter string
    return Math.random().toString(36).substring(2, 7);
  }
}


var Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  }, // string for shorter input
  urlTitle: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  }, // for longer input
  status: {
    type: Sequelize.ENUM('open', 'closed')
  },
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
},
  {
    getterMethods: { route() { return '/wiki/' + this.urlTitle } }
  });

var User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
});

// before validating it will go here and create a url Title
Page.hook('beforeValidate', (page, options) => {
  page.urlTitle = generateUrlTitle(page.title);
});

module.exports = {
  Page: Page,
  User: User,
  db: db
};

