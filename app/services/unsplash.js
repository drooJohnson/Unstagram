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

  async getRandomPhoto() {
    let res = await get(this, 'unsplash').photos.getRandomPhoto()
    let json = await res.json()

    return json;
  }
});
