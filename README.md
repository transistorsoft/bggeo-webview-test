# Cordova Background Geolocation with Ionic WebView White screen demo.

## Installation

```bash
git clone https://github.com/transistorsoft/bggeo-webview-test.git
cd bggeo-webview-test

ionic cordova prepare ios
```
- Install on physical iOS device
- Enable the plugin with *Toggle Button* on top-left toolbar.
- *Toggle button* on top-right manages debug sounds / notifications.  Toggle this as desired.  Leaving it enabled will let you know the plugin is alive.

## Testing

The background-geolocation should engage each time the device travels about 200 meters from its last known position, tracking the device for as long as the device remains in motion.  When the device stops in the same position for 5 minutes, the plugin will turn off location-updates and iOS will suspend the app in the background.

After launching the app the first time, and enabling the *Enabled Toggle*, you can terminate the app.

You should periodically open the app to ensure the app boots without freezing on a whitescreen.
 

