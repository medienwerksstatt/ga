import {Component, OnInit} from '@angular/core';
import {MemberService} from '../../services/member/member.service';
import {LogService} from '../../services/log/log.service';
import {MemberGroupInterface} from '../../services/member/member.group.interface';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Offlineable} from '../../traits/offlineable';
import {ConnectionService} from '../../services/connection/connection.service';

@Component({
    selector: 'app-member',
    templateUrl: 'member.page.html',
    styleUrls: ['member.page.scss']
})
export class MemberPage extends Offlineable implements OnInit {
    public teach: number;
    public search: string;
    public memberGroups: MemberGroupInterface[];
    public loadingMembers: Array<any> = new Array(15);

    constructor(private memberService: MemberService,
                private logService: LogService,
                private route: ActivatedRoute,
                connection: ConnectionService) {
        super(connection);
    }

    public doRefresh(event: any): void {
        this.loadMembers(event, true);
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

    private async loadMembers(event?: any, force: boolean = false): Promise<void> {
        this.memberGroups = undefined;

        try {
            if (this.teach) {
                this.memberGroups = await this.memberService.teachGrouped(force) || [];
            } else {
                this.memberGroups = await this.memberService.grouped(force) || [];
            }
        } catch (e) {
            this.logService.error('MemberPage.loadMembers()', e);
            this.memberGroups = [];
        }

        if (event) {
            event.target.complete();
        }
    }
}
