import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { get, set } from '@ember/object';

export default Controller.extend({
  likes: 0,
  photographer: null,
  photoUrl: 'http://placehold.it/200x200',

  unsplash: service(),

  init() {
    this._super(...arguments);
    this.send('getPhoto');
  },

  actions: {
    async getPhoto() {
      let json = await get(this, 'unsplash').getRandomPhoto();
      let photoUrl = json.urls.regular;
      let { likes, user } = json;
      set(this, 'likes', likes);
      set(this, 'photoUrl', photoUrl);
      set(this, 'photographer', user);
    }
  }
});
