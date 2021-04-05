import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SesionService {
  public logueado: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor() { }
}
