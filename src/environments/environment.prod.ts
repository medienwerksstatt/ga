import { EnvironmentInterface } from "./environment.interface";

export const environment: EnvironmentInterface = {
  baseUrl: "https://gewerbe-aachthurland.ch",
  apiUrl: "https://gewerbe-aachthurland.ch/wp-json/wp/v2",
  production: true,
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
  oneSignalAppId: "5b292465-6d86-414d-a431-ebcec98a6992",
  googleProjectNumber: "764363884407",
  disclaimerUrl: "https://gewerbe-aachthurland.ch/impressum/",
  privacyUrl: "https://gewerbe-aachthurland.ch/datenschutz/",
  formUrl: "https://gewerbe-aachthurland.ch/rueckmeldungen/",
  whatsAppUrl: "https://wa.me/41794216547",
  phoneNumber: "0041794216547",
  email: "info@gewerbe-aachthurland.ch",
  primaryColor: "#e30045",
  secondaryColor: "#085799",
};
