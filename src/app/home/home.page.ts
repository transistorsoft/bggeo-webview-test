import { Component, NgZone } from '@angular/core';
import { Platform } from '@ionic/angular';

import BackgroundGeolocation from "cordova-background-geolocation-lt";
import BackgroundFetch from "cordova-plugin-background-fetch";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
	enabled: boolean;
	debug: boolean;
	location: String;

  constructor(private platform: Platform, private zone: NgZone) {
  	this.platform.ready().then(this.onReady.bind(this));
  }

  onReady() {
  	// Configure BackgroundFetch
  	BackgroundFetch.configure(() => {
  		console.log('[BackgroundFetch] received fetch event');
  		BackgroundFetch.finish();
  	}, (status) => {
  		console.log('[BackgroundFetch] FAILED: ', status);
  	}, {
  		minimumFetchInterval: 15
  	});

  	// Listen to location events.
  	BackgroundGeolocation.onLocation((location) => {
  		console.log('[location]', location);
  		// Update UI state
      this.zone.run(() => {
        this.location = JSON.stringify(location, null, 2);
      });
  	});

  	// Listen to motionchange events.
  	BackgroundGeolocation.onMotionChange((event) => {
  		BackgroundGeolocation.addGeofence({
  			identifier: "My Test Geofence",
  			radius: 500,
  			latitude: event.location.coords.latitude,
  			longitude: event.location.coords.longitude,
  			notifyOnExit: true
  		});
  	});

  	// Configure BackgroundGeolocation
  	BackgroundGeolocation.ready({
  		reset: false,
  		debug: true,
  		distanceFilter: 50,
  		logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
  		stopOnTerminate: false
  	}).then((state) => {
  		this.enabled = state.enabled;
  		this.debug = state.debug;
  	});
  }

  // #start / #stop tracking.
  onToggleEnabled() {
  	if (this.enabled) {
  		BackgroundGeolocation.start();
  	} else {
  		BackgroundGeolocation.stop();
  	}
  }

  // Toggle debug sounds / notifications.
  onToggleDebug() {
  	BackgroundGeolocation.setConfig({
  		debug: this.debug
  	});
  }
}
