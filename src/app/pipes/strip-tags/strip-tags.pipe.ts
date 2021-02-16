import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'stripTags',
    pure: true,
})
export class StripTagsPipe implements PipeTransform {

    public transform(value: string): string {
        return value.replace(/<a.*?>.*?<\/a>/ig, ''); // replace anchor
    }

}
