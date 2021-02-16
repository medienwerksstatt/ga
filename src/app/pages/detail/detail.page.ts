import {Component, OnInit} from '@angular/core';
import {MemberInterface} from '../../services/member/member.interface';
import {MemberService} from '../../services/member/member.service';
import {LogService} from '../../services/log/log.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {MapTypeStyle} from '@agm/core';
import {BrowserService} from '../../services/browser/browser.service';
import {Offlineable} from '../../traits/offlineable';
import {ConnectionService} from '../../services/connection/connection.service';

@Component({
    selector: 'app-detail',
    templateUrl: 'detail.page.html',
    styleUrls: ['detail.page.scss']
})
export class DetailPage extends Offlineable implements OnInit {
    public member: MemberInterface;
    public mapStyles: MapTypeStyle[] = environment.googleMapStyles;

    constructor(private memberService: MemberService,
                private logService: LogService,
                private browser: BrowserService,
                private route: ActivatedRoute,
                connection: ConnectionService) {
        super(connection);
    }

    public ngOnInit(): void {
        this.route.paramMap
            .pipe(switchMap((params: ParamMap) => this.loadMember(+params.get('id'))))
            .subscribe();
    }

    public www(member: MemberInterface): void {
        if (!member.website) {
            return;
        }

        this.browser.open(member.website);
    }

    private async loadMember(id: number): Promise<void> {
        try {
            this.member = await this.memberService.one(id);
        } catch (e) {
            this.logService.error('DetailPage.loadMember()', e);
        }
    }
}
