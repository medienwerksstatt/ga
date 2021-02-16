import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {MemberService} from '../../services/member/member.service';
import {LogService} from '../../services/log/log.service';
import {MemberInterface} from '../../services/member/member.interface';
import {environment} from '../../../environments/environment';
import {MapTypeStyle} from '@agm/core';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute, ParamMap} from '@angular/router';

declare let google: any;

@Component({
    selector: 'app-detail',
    templateUrl: 'map.page.html',
    styleUrls: ['map.page.scss']
})
export class MapPage implements OnInit {
    public teach: number;
    public members: MemberInterface[];
    public mapStyles: MapTypeStyle[] = environment.googleMapStyles;

    constructor(private memberService: MemberService,
                private logService: LogService,
                private route: ActivatedRoute,
                private navCtrl: NavController) {

    }

    public ngOnInit(): void {
        this.route.paramMap
            .pipe(switchMap((params: ParamMap) => this.init(+params.get('teach'))))
            .subscribe();
    }

    private async init(teach: number): Promise<void> {
        this.teach = teach;
        this.loadMembers();
    }

    public navigate(member: MemberInterface): void {
        this.navCtrl.navigateForward(['/detail', member.id]);
    }

    private async loadMembers(): Promise<void> {
        this.members = undefined;

        try {
            if (this.teach) {
                this.members = await this.memberService.teachAll();
            } else {
                this.members = await this.memberService.all();
            }
        } catch (e) {
            this.logService.error('MapPage.loadMembers()', e);
        }
    }
}
