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
    // callers should be notified of completion
    return new Observable(subscriber => {
      // start fresh
      this.stateManagerService.imageList = [];
      // getting all the yards image info
      const endpoint = "yard/" + this.stateManagerService.yardItem?.id + "/images";
      this.httpService.getAll(endpoint).subscribe({
        next: value => {
          value.forEach(image => {
            this.stateManagerService.imageList.push(image as Image);
          })
          // downloading each image
          this.stateManagerService.imageList.forEach(image => {
            this.httpService.getFile("image/" + image.id).subscribe({
                next: blob => {
                  // convert to BASE64 for local storage and easy referencing in HTML
                  this.blobToBase64(blob as Blob).then(string => {
                    if (image.fileName?.split(".")[-1] === "png") {
                      image.localFile = "data:image/png;base64," + string;
                    } else image.localFile = "data:image/jpg;base64," + string;
                  })
                }
              }
            )
          })
        }
      })
      subscriber.next();
    })
  }

  private blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        if (reader.result) {
          const base64String = reader.result as string;
          resolve(base64String.split(',')[1]); // Remove data:URL header
        } else {
          reject(new Error("Error reading blob"));
        }
      };
    });
  }
}
