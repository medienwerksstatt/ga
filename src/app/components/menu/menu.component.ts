import {Component, Input} from '@angular/core';
import {environment} from '../../../environments/environment';
import {MenuPageInterface} from './menu.page.interface';
import {EnvironmentInterface} from '../../../environments/environment.interface';
import {MenuSubpageInterface} from './menu.subpage.interface';
import {BrowserService} from '../../services/browser/browser.service';
import {Offlineable} from '../../traits/offlineable';
import {ConnectionService} from '../../services/connection/connection.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
})
export class MenuComponent extends Offlineable {
    @Input()
    public contentId: string;
    public environment: EnvironmentInterface = environment;

    public activeSubmenu: string;
    public appPages: MenuPageInterface[] = [
        {
            title: 'Aktuelles',
            url: ['/category', 1],
            icon: 'newspaper'
        },
        {
            title: 'Mitglieder',
            url: ['/member', 0],
            icon: 'user-circle'
        },
        {
            title: 'Lehrlinge',
            url: ['/member', 1],
            icon: 'user-graduate'
        },
        {
            title: 'Verein',
            url: ['/category', 3],
            icon: 'users'
        },
        {
            title: 'Gemeindemitteilungen',
            url: '/member',
            icon: 'bullhorn',
            submenu: 'community'
        },
        {
            title: 'Fotos',
            url: '/gallery',
            icon: 'photo-video'
        },
        {
            title: 'Rückmeldung',
            url: environment.formUrl,
            external: true,
            icon: 'share-alt'
        },
    ];

    public subPages: MenuSubpageInterface[] = [
        {
            id: 'community',
            pages: [
                {
                    title: 'Sulgen',
                    url: ['/category', 2],
                    icon: 'newspaper',
                },
                {
                    title: 'Kradolf-Schönenberg',
                    url: ['/category', 10],
                    icon: 'newspaper',
                },
                {
                    title: 'Erlen',
                    url: ['/category', 11],
                    icon: 'newspaper',
                },
                {
                    title: 'Hohentannen',
                    url: ['/category', 12],
                    icon: 'newspaper',
                },
            ]
        }
    ];

    constructor(private browser: BrowserService,
                connection: ConnectionService) {
        super(connection);
    }

    public activate(id: string): void {
        this.activeSubmenu = id;
    }

    public reset(): void {
        this.activeSubmenu = undefined;
    }

    public www(url: string): void {
        this.browser.open(url);
    }
}
