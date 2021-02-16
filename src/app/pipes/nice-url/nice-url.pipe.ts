import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'niceUrl',
    pure: true,
})
export class NiceUrlPipe implements PipeTransform {

    public transform(value: any): string {
        return value.replace(/https?:\/\//i, '');
    }
}
