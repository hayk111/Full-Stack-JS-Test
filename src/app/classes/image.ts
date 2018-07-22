import { IImage } from '../interfaces/iimage'

export class Image implements IImage{
    url: string;
    title: string;
    location: string;
    date: Date;
    loading: boolean;

    constructor(u?: string, t?: string, l?: string, d?: Date) {
        this.url = u
        this.title = t
        this.location = l
        this.date = d

        this.loading = true
    }
}
