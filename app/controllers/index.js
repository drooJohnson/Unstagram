import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { get, set } from '@ember/object';

export default Controller.extend({
  photos: null,
  photoBatchSize: 1,
  isLoading: true,
  errorMessage: null,
  unsplash: service(),

  init() {
    this._super(...arguments);
    this.send('getPhotos');
  },

  actions: {
    async getPhotos() {
      set(this, 'isLoading', true);
      let fetchedPhotos = [];

      let count = this.photoBatchSize;
      let photoCount = count.toString(); // unsplash requires the photo count as a string.

      let json = await get(this, 'unsplash').getRandomPhoto({count:photoCount});
      if ((typeof json !== "object" && !Array.isArray(json)) && json !== null) {
        set(this, 'errorMessage', json);
        return;
      }
      for (var i = 0; i < count; i++) {
        // Grab each photo from the array
        let photoJson = json[i];
        // Scale image size so that timeline cards don't resize as image loads from URL.
        let photoSize = { x: photoJson.width, y: photoJson.height };
        const widthLimit = 400;
        let photoScale = widthLimit / photoSize.x;
        let scaledPhotoSize = { x: photoSize.x * photoScale, y: photoSize.y * photoScale };
        // Trim data to only what is necessary...
        // if (scaledPhotoSize.x != widthLimit) { console.log("The scaled photo width should be 400, it isn't. What have you done?!"); }
        let photo = {
          width: scaledPhotoSize.x,
          height: scaledPhotoSize.y,
          likes: photoJson.likes,
          photographer: photoJson.user,
          photoUrl: photoJson.urls.regular,
        };

        // Throw it into the array, to be concatenated onto `this.photos` later.
        fetchedPhotos.push(photo);
      }

      if (this.photos == null) { // If this is the first request, no need to concat, just replace.
        set(this, 'photos', fetchedPhotos);
        set(this, 'isLoading', false);
      } else {
        let newPhotosArray = this.photos.concat(fetchedPhotos); // Add new photos to already-loaded photos.
        set(this, 'photos', newPhotosArray);
        set(this, 'isLoading', false);
      }
    }
  }
});
