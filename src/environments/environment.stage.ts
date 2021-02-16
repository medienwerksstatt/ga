import { EnvironmentInterface } from "./environment.interface";

export const environment: EnvironmentInterface = {
  baseUrl: "https://aachthurland.medienwerkstatt-ag.ch",
  apiUrl: "https://aachthurland.medienwerkstatt-ag.ch/wp-json/wp/v2",
  production: false,
  googleMapKey: "AIzaSyDGtFWMc_jIg2QOQhhYDM_g1rl5BRUDbjk",
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
  oneSignalAppId: "2ee2ad22-4d62-4087-ac63-ed7611e5ba99",
  googleProjectNumber: "230853126989",
  disclaimerUrl: "https://aachthurland.medienwerkstatt-ag.ch/impressum/",
  privacyUrl: "https://aachthurland.medienwerkstatt-ag.ch/datenschutz/",
  formUrl: "https://aachthurland.medienwerkstatt-ag.ch/rueckmeldungen/",
  whatsAppUrl: "https://wa.me/41794216547",
  phoneNumber: "0041794216547",
  email: "info@gewerbe-aachthurland.ch",
  primaryColor: "#e30045",
  secondaryColor: "#085799",
};
