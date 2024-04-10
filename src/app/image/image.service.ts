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

  getAllImagedFromBackend(): Observable<boolean> {
    return new Observable(subscriber => {
      const endpoint = "yard/" + this.stateManagerService.currentlySelectedYard?.id + "/images";
      this.httpService.getAll(endpoint).subscribe({
        next: value => {
          this.stateManagerService.imageListForCurrentYard = value as Image[];
          this.stateManagerService.imageListForCurrentYard.forEach(image => {
            this.httpService.getFile("image/" + image.id).subscribe({
                next: blob => {
                  // convert to BASE64 for local storage and easy referencing in HTML
                  this.convertBlobToBase64String(blob as Blob).then(string => {
                    if (image.fileName?.split(".")[-1] === "png") {
                      image.localFile = "data:image/png;base64," + string;
                    } else image.localFile = "data:image/jpg;base64," + string;
                  })
                }
              }
            )
          })
          // need to trigger the setter for state saving - Is this the best way???
          let tempImageList :Image[] = [];
          tempImageList = this.stateManagerService.imageListForCurrentYard;
          this.stateManagerService.imageListForCurrentYard = tempImageList;
        }
      })
      subscriber.next();
    })
  }

  private convertBlobToBase64String(blob: Blob): Promise<string> {
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
