'use strict';
const Promise = require('bluebird');

module.exports = function(app, cb) {
  /*
   * The `app` object provides access to a variety of LoopBack resources such as
   * models (e.g. `app.models.YourModelName`) or data sources (e.g.
   * `app.datasources.YourDataSource`). See
   * http://docs.strongloop.com/display/public/LB/Working+with+LoopBack+objects
   * for more info.
   */
  const AccessToken = app.models.AccessToken;
  const User = app.models.User;

  const email = 'admin@admin.com';
  const password = 'password';
  const accessToken = 's3cr3t';

  return Promise.resolve()
    .then(() => User.findOne({where: {email}}))
    .then(res => (res ? res : User.create({email, password})))
    .then(user => AccessToken.upsert({id: accessToken, userId: user.id}))
    .then(token => console.log('Access Token: ', token.id))
    .asCallback(cb);
};
