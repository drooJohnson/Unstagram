import Service from '@ember/service';
import { get, set } from '@ember/object';
import Unsplash from 'unsplash-js';
import config from 'unstagram/config/environment';

export default Service.extend({
  unsplash: null,

  init() {
    this._super(...arguments);
    let { access, secret, callbackUrl } = config.APP.unsplash
    let unsplash = new Unsplash({
      access,
      secret,
      callbackUrl
    });
    set(this, 'unsplash', unsplash);
  },

  async getRandomPhoto(data) {
    let res = await get(this, 'unsplash').photos.getRandomPhoto(data);
    switch(res.status){
      case 200: {
        let json = await res.json();
        return json;
      }
      case 403:
        return ("Request failed likely due to authentication failure. The application may have gone over the Unsplash API's request-per-hour limit. You can sign up for a new developer account at https://unsplash.com/join, then go to https://unsplash.com/oauth/applications and add a new application. Once you've set up the new application, grab the Application ID, Access Key, and Secret Key from the 'Keys' section of that application's page — The URL should be something like https://unsplash.com/oauth/applications/ followed by the five numbers which also happen to be the Application ID — and add those to the 'unstagram/config/environment.js' file beneath the original entries, and comment out the original entries. Don't remove them, because you can switch between the two sets of IDs when you've reached the limit on one.");
      default:
        return ("Something went wrong with the unsplash API request" + res.status);
    }
  }
});
