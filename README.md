# Important

Use the commands provided in package.json e.g. `npm run ios`

# Installation (not complete)
`npm install -g ionic cordova ios-sim ios-deploy native-run`

`brew install gradle`

`npm install`

Sometimes these have to be (re)installed

```
brew uninstall --ignore-dependencies libimobiledevice
brew uninstall --ignore-dependencies usbmuxd
brew install --HEAD usbmuxd
brew unlink usbmuxd
brew link usbmuxd
brew install --HEAD libimobiledevice
brew install ideviceinstaller
```

# Release

## iOS (4UozoYmWyhTD)

`npm run ios:prod`

## Android generate keystore

`cd ./meta/android/`

`keytool -genkey -v -keystore android.keystore -alias ch.gewerbe_aachthurland.app -keyalg RSA -keysize 2048 -validity 10000`

## Android Release (4UozoYmWyhTD)

`npm run android:prod`

`jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ./meta/android/android.keystore ./platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk ch.gewerbe_aachthurland.app -storepass 4UozoYmWyhTD`

`zipalign -v 4 ./platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk ./platforms/android/app/build/outputs/apk/release/app-release.apk`

`apksigner verify ./platforms/android/app/build/outputs/apk/release/app-release.apk`

# Helpful commands
`cordova emulate --list`

`npm run android`

`npm run ios`

`ionic g`

# Urls

## Posts
https://aachthurland.medienwerkstatt-ag.ch/wp-json/wp/v2/posts

## Member
https://aachthurland.medienwerkstatt-ag.ch/wp-json/mitglieder/details

## Filter
https://aachthurland.medienwerkstatt-ag.ch/wp-json/wp/v2/posts?categories=3

## Gallery
https://aachthurland.medienwerkstatt-ag.ch/wp-json/wp/v2/fotos/gallerien

- contains path etc.
- "previewpic" relation to gallery-images "pid"

## Gallery-Images
https://aachthurland.medienwerkstatt-ag.ch/wp-json/wp/v2/fotos/gallerien/bilder

- contains filename etc.
- "galleryid" relation to gallery "gid"

# Notes

JDK error message, comment lines around 370 in `/platforms/android/cordova/lib/check_reqs.js`

```
        // if (!String(values[0]).startsWith('1.8.')) {
        //     throw new CordovaError(
        //         'Requirements check failed for JDK 8 (\'1.8.*\')! Detected version: ' + values[0] + '\n' +
        //         'Check your ANDROID_SDK_ROOT / JAVA_HOME / PATH environment variables.'
        //     );
        // }
```
