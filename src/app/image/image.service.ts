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

  getThumbnail(yardId: number | null | undefined) {

    const possibleYard = this.stateManagerService.yardsList.find(yard => yard.id === yardId);
    console.log("getting thumbnail... found a yard match, ID: " + possibleYard?.id);
    if (possibleYard != undefined) {
      if (possibleYard.localThumbnailImageId != undefined) {
        const possibleImage = this.stateManagerService.imageList.find(image => image.id === possibleYard.localThumbnailImageId);
        console.log("getting thumbnail... found an image match, ID: " + possibleImage?.id)
        if (possibleImage != undefined) {
          console.log("The thumbnail image ID for yard: " + possibleYard.id + " is " + possibleYard.localThumbnailImageId)
          return possibleImage.localFile
        }
      }
    }
    console.log("The thumbnail image ID for yard: " + this.stateManagerService.yardItem?.id + " is undefined. Using default")
    return "/assets/image/yard.png"
  }

  getImages(): Observable<boolean> {
    // callers should be notified of completion
    return new Observable(subscriber => {
      // start fresh
      this.stateManagerService.imageList = [];
      console.log(this.stateManagerService.imageList)
      // getting all the yards image info
      console.log("GET YardId: " + this.stateManagerService.yardItem?.id);
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
          console.log(this.stateManagerService.imageList)
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
