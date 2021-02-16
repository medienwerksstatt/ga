// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { EnvironmentInterface } from "./environment.interface";

export const environment: EnvironmentInterface = {
  baseUrl: "https://aachthurland.medienwerkstatt-ag.ch",
  apiUrl: "https://aachthurland.medienwerkstatt-ag.ch/wp-json/wp/v2",
  production: false,
  googleMapKey: "AIzaSyADYLuyS0khRP5AJX-9HAuO7AOYKq5fO2Y",
  googleMapStyles: [
    { featureType: "all", stylers: [{ saturation: 0 }, { hue: "#e7ecf0" }] },
    {
      featureType: "road",
      stylers: [{ saturation: -70 }],
    },
    { featureType: "transit", stylers: [{ visibility: "off" }] },
    {
      featureType: "poi",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "water",
      stylers: [{ visibility: "simplified" }, { saturation: -60 }],
    },
  ],
  oneSignalAppId: "56e3d439-b756-4004-9f2c-5902bf97c6cb",
  googleProjectNumber: "224979517197",
  disclaimerUrl: "https://aachthurland.medienwerkstatt-ag.ch/impressum/",
  privacyUrl: "https://aachthurland.medienwerkstatt-ag.ch/datenschutz/",
  formUrl: "https://aachthurland.medienwerkstatt-ag.ch/rueckmeldungen/",
  whatsAppUrl: "https://wa.me/41794216547",
  phoneNumber: "0041794216547",
  email: "info@gewerbe-aachthurland.ch",
  primaryColor: "#e30045",
  secondaryColor: "#085799",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import "zone.js/dist/zone-error"; // Included with Angular CLI.
