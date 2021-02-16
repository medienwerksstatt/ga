import {Injector, LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import {OneSignal} from '@ionic-native/onesignal/ngx';
import {Network} from '@ionic-native/network/ngx';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {ComponentsModule} from './components/components.module';
import {IonicConfig} from '@ionic/core';
import {AgmCoreModule} from '@agm/core';
import {environment} from '../environments/environment';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TimeoutInterceptor} from './interceptors/timeout.interceptor';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {fab} from '@fortawesome/free-brands-svg-icons';
import {IonicStorageModule} from '@ionic/storage';

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        ComponentsModule,
        BrowserModule,
        HttpClientModule,
        FontAwesomeModule,
        AgmCoreModule.forRoot({
            language: 'de',
            region: 'CH',
            apiKey: environment.googleMapKey
        }),
        IonicModule.forRoot({
            mode: 'ios',
            backButtonText: '', // no "back" text,
            // navAnimation: fadeTransition,
        } as IonicConfig),
        IonicStorageModule.forRoot(),
        AppRoutingModule
    ],
    providers: [
        StatusBar,
        SplashScreen,
        OneSignal,
        InAppBrowser,
        Network,
        {provide: LOCALE_ID, useValue: 'de'},
        {provide: HTTP_INTERCEPTORS, useClass: TimeoutInterceptor, multi: true},
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    public static injector: Injector;

    constructor(injector: Injector,
                faLibrary: FaIconLibrary) {
        AppModule.injector = injector;

        faLibrary.addIconPacks(fas, fab);
    }
}
