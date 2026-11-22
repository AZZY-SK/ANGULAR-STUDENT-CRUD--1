import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UuidService {

  constructor() { }

    uniqueId():string{
        return crypto.randomUUID();
    }
}
