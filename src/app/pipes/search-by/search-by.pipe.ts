import {NgIterable, Pipe, PipeTransform, QueryList} from '@angular/core';

@Pipe({
    name: 'searchBy',
    pure: true
})
export class SearchByPipe<T> implements PipeTransform {
    public transform(list: T[], term: string): T[] {
        if (!term) {
            return list;
        }

        return list.filter((item: T) => this.filter(item, term));
    }

    private filter(item: T, term: string): boolean {
        return Object.keys(item).some(
            (objectKey: string) => {
                if (Array.isArray(item[objectKey])) {
                    return item[objectKey].filter(i => this.filter(i, term)).length;
                }

                return item[objectKey] !== null &&
                    item[objectKey]
                        .toString()
                        .toLowerCase()
                        .includes(term.toLowerCase());
            }
        );
    }
}
