import { PipeTransform, Pipe } from '@angular/core';


//used in recipe item html
@Pipe({
    name: 'shorten'
})
export class ShortenPipe implements PipeTransform{
    transform(value:any, limit: number, end: string){
        if(value.length > limit){
            return value.substr(0,limit)+end;
        }else{
            return value
        }
    }
}