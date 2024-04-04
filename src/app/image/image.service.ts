import {Injectable} from '@angular/core';
import {Image} from "../model/image";
import {StateManagerService} from "../state/state-manager.service";
import {HttpService} from "../http/http.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(
    private stateManagerService: StateManagerService,
    private httpService: HttpService,
  ) {
  }

  getImages(): Observable<boolean> {
    const endpoint = "yard/" + this.stateManagerService.yardItem?.id + "/images";
    // callers should be notified of completion
    return new Observable(subscriber => {
      // getting all the yards image info
      this.httpService.getAll(endpoint).subscribe({
        next: value => {
          value.forEach(object => {
            const image: Image = object as Image;
            // we don't want to add duplicates to imageList
            if (!this.stateManagerService.imageList.find(existingImage => existingImage.id === image.id)) {
              this.stateManagerService.imageList.push(image);
            }
          })
          // downloading each image
          this.stateManagerService.imageList.forEach(image => {
            this.httpService.getFile("image/" + image.id).subscribe({
                next: blob => {
                  const urlCreator = window.URL;
                  // @ts-ignore
                  image.file = urlCreator.createObjectURL(blob);
                }
              }
            )
          })
        }
      })
      subscriber.next(true);
      subscriber.complete();
    })
  }
}
