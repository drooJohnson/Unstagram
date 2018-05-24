import $ from 'jquery';
import Component from '@ember/component';
import { observer } from '@ember/object';
import { once, bind } from '@ember/runloop';

export default Component.extend({
  classNameBindings: ['loading'],
  classNames: ['infinite-scroll'],
  _scrollListener: null,
  init(){
    this._super(...arguments);
  },
  didInsertElement(){
    this._super(...arguments);
    this._scrollListener=bind(this,this.scrollHandler);
    $(window).on('scroll', this._scrollListener);
  },
  willDestroy(){
    this._super(...arguments);
    $(window).off('scroll', this._scrollListener);
  },
  loadingChanged: observer('loading', function() {
    if (!this.loading) {
      // stopped loading... So check if more photos are needed to push the infinite-scroll
      // element off the viewport
      once(this, 'requestPhotosIfNeeded');
    }
  }),
  scrollHandler(){
    this.requestPhotosIfNeeded();
  },
  requestPhotosIfNeeded() {
    if (this.isInViewport() && !this.loading) {
        // Execute the function passed into the component's 'onVisible' parameter.
        // In this case, it tells the controller to 'getPhotos()'. Could use promises
        // here so that the "loading" state didn't need to be handled by the controller
        // and passed down into the components like this.
        const promise = this.get('onVisible')();
        promise.then(()=>{
          // If this batch of photos didn't push the infinite-scroll element off
          // of the screen, trigger one more batch. This could loop until the
          // element is off-screen but that seems potentially problematic.
          if (this.isInViewport() && !this.loading) {
            this.get('onVisible')();
          }
        })
    }
  },
  isInViewport() {
    let docViewTop = $(window).scrollTop();
    let docViewBottom = docViewTop + $(window).height();

    let rect = this.element.getBoundingClientRect();

    let elemTop = rect.top + window.pageYOffset;

    // Is the top of the element above or flush with the bottom of the viewport?
    return (elemTop <= docViewBottom);
  },
});
