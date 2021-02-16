import {Injectable} from '@angular/core';
import {CategoryInterface} from './category.interface';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    private cache: CategoryInterface[] = [
        {
            id: 1,
            name: 'Aktuelles',
        },
        {
            id: 2,
            name: 'Sulgen',
        },
        {
            id: 3,
            name: 'Verein',
        },
        {
            id: 10,
            name: 'Kradolf-Schönenberg',
        },
        {
            id: 11,
            name: 'Erlen',
        },
        {
            id: 12,
            name: 'Hohentannen',
        },
        {
            id: 13,
            name: 'Buttons',
        },
    ];

    public async get(id: number): Promise<CategoryInterface> {
        return this.cache.find((c: CategoryInterface) => +c.id === +id);
    }
}
