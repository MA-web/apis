import { Injectable } from '@angular/core';

import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { BehaviorSubject, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UploadFileService {


  FOLDER = '/';

  imageUrl = "";

  resData: Subject<any> = new Subject();
  sendEmptyAttach: Subject<any> = new Subject();

  data = { message: "", data: "" };

  constructor() { }
  // validateandUploadFile(file, Iheight, Iwidth) {

  //   let fileToUpload = file;
  //   if (fileToUpload.type == "image/jpeg" || fileToUpload.type == "image/png" || fileToUpload.type == "image/jpeg") {
  //     //Show image preview
  //     let reader = new FileReader();
  //     reader.onload = (event: any) => {
  //       var img = new Image();
  //       img.onload = () => {
  //         let width = img.width;

  //         let height = img.height;
  //         if (width <= Iwidth && height <= Iheight) {
  //           this.imageUrl = event.target.result;

  //           this.uploadfile(file);
  //         } else {

  //           this.data.message = "You can maximum upload " + Iheight + " * " + Iwidth + " File";
  //           this.data.data = "";
  //           this.resData.next(this.data);
  //           return this.resData;
  //         }
  //       };

  //       img.src = event.target.result;
  //     }
  //     reader.readAsDataURL(fileToUpload);
  //   } else {
  //     this.data.message = "You can't be able to upload file except JPG and PNG format";
  //     this.data.data = "";
  //     this.resData.next(this.data);
  //     return this.resData;
  //   }
  // }

  uploadMultiple(files,folderPath:string){
    files?.forEach(element => {
      this.uploadfile(element,folderPath)
    });
  }
  uploadfile(file,folderPath:string) {

    if (file != null) {
      const bucket = new S3(
        {
          endpoint: "fra1.digitaloceanspaces.com",
          accessKeyId: 'RWRJDBV2VDLAYBLT26SW',
          secretAccessKey: 'bKRoNQfnme598TZESu4/X5msVUxtXZaoW/XldXxifq4',
          region: 'fra1'
        }
      );
      const params = {
        Bucket: `devspace-marksphinx/${folderPath}`,
        Key: file.name,
        Body: file,
        ACL: 'public-read',
        ContentType: file.type,
        headers: { 'Access-Control-Allow-Origin': '*' },

      };
      var that = this;

      bucket.upload(params, function (err, data) {

        if (err) {

          return false;
        }

        //
        // that.data.message = "Successfully uploaded file.";
        // that.data.data = data.Location;
        that.resData.next(data.Location);
        return that.resData;
      });

    }

  }

  deleteFile(fileName) {
    var that = this;
    const bucket = new S3(
      {
        endpoint: "fra1.digitaloceanspaces.com",
        accessKeyId: 'RWRJDBV2VDLAYBLT26SW',
        secretAccessKey: 'bKRoNQfnme598TZESu4/X5msVUxtXZaoW/XldXxifq4',
        region: 'fra1'
      }
    );
    var params = {
      Bucket: 'devspace-marksphinx',
      Key: fileName?.replace('https://devspace-marksphinx.fra1.digitaloceanspaces.com/', '')
      /*
         where value for 'Key' equals 'pathName1/pathName2/.../pathNameN/fileName.ext'
         - full path name to your file without '/' at the beginning
      */
    };
    var that = this;
    bucket.deleteObject(params, function (err, data) {
      that.sendEmptyAttach.next(true)

    });

  }
  public getFile() {
    return this.resData.asObservable();
  }

}
