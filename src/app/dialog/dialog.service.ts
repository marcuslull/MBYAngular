import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  title: string = "";
  content: string | null = null;
  image: string | null = null;
  closeButton: boolean = true;
  deleteButton: boolean = true;
}
