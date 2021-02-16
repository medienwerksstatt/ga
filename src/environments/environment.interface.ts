import {MapTypeStyle} from '@agm/core';

export interface EnvironmentInterface {
    baseUrl: string;
    apiUrl: string;
    production: boolean;
    googleMapKey: string;
    googleMapStyles: MapTypeStyle[];
    oneSignalAppId: string;
    googleProjectNumber: string;
    disclaimerUrl: string;
    privacyUrl: string;
    formUrl: string;
    whatsAppUrl: string;
    phoneNumber: string;
    email: string;
    primaryColor: string;
    secondaryColor: string;
}
