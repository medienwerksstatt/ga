import {Injectable} from '@angular/core';
import {StateListenPluginInterface} from '../state-listen-plugin.interface';
import {StateDispatchEventInterface} from '../../state-dispatch/state-dispatch-event.interface';
import {StateDispatchTypesEnum} from '../../state-dispatch/state-dispatch-types.enum';
import {StateListenPluginAbstract} from '../state-listen-plugin-abstract';
import {AppState} from '../../state-dispatch/states/app-state.enum';
import {LogService} from '../../../services/log/log.service';
import {MemberService} from '../../../services/member/member.service';
import {GalleryService} from '../../../services/gallery/gallery.service';

@Injectable({
    providedIn: 'root'
})
export class CacheWarmupListen extends StateListenPluginAbstract implements StateListenPluginInterface {
    constructor(private log: LogService,
                private memberService: MemberService,
                private galleryService: GalleryService) {
        super();
    }

    public validate(event: StateDispatchEventInterface): boolean {
        return event.type === StateDispatchTypesEnum.APP && event.state === AppState.LAUNCHED;
    }

    public async execute(event: StateDispatchEventInterface): Promise<void> {
        this.log.log('CACHE.WARMUP');

        try {
            this.memberService.all();
            this.galleryService.all();
        } catch (e) {
            this.log.error('CacheWarmupListen.execute()', e);
        }
    }
}
