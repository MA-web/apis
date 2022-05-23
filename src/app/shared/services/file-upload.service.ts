import { Injectable } from '@angular/core';

import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UploadFileService {


  FOLDER = '/';

  imageUrl = "";

  resData: BehaviorSubject<any> = new BehaviorSubject(null);

  data = { message: "", data: "" };

  constructor() { }
  validateandUploadFile(file, Iheight, Iwidth) {

    let fileToUpload = file;
    if (fileToUpload.type == "image/jpeg" || fileToUpload.type == "image/png" || fileToUpload.type == "image/jpeg") {
      //Show image preview
      let reader = new FileReader();
      reader.onload = (event: any) => {
        var img = new Image();
        img.onload = () => {
          let width = img.width;

          let height = img.height;
          if (width <= Iwidth && height <= Iheight) {
            this.imageUrl = event.target.result;

            this.uploadfile(file);
          } else {

            this.data.message = "You can maximum upload " + Iheight + " * " + Iwidth + " File";
            this.data.data = "";
            this.resData.next(this.data);
            return this.resData;
          }
        };

        img.src = event.target.result;
      }
      reader.readAsDataURL(fileToUpload);
    } else {
      this.data.message = "You can't be able to upload file except JPG and PNG format";
      this.data.data = "";
      this.resData.next(this.data);
      return this.resData;
    }
  }


  uploadfile(file) {

    if (file != null) {
      const bucket = new S3(
        {
          endpoint: "https://fra1.digitaloceanspaces.com",
          accessKeyId: 'BA6EM5E6W3S2W3HBZSAY',
          secretAccessKey: 'GifnJOJ+jpc1u+6bBLEmk2jNZdgSkH3jKB6LVsS56aM',
          region: 'fra1-01'
        }
      );
      const params = {
        Bucket: 'devspace-marksphinx',
        Key: file.name,
        Body: file,
        ACL: 'public-read'

      };
      var that = this;

      bucket.upload(params, function (err, data) {

        if (err) {
          console.log('There was an error uploading your file: ', err);
          return false;
        }


        console.log('Successfully uploaded file.', data);
        that.data.message = "Successfully uploaded file.";
        that.data.data = data.Location;
        that.resData.next(that.data);
        return that.resData;
      });

    }

  }
  deleteFile(fileName) {

    const bucket = new S3(
      {
        accessKeyId: '*****************',
        secretAccessKey: '*********************',
        region: 'us-east-2'
      }
    );
    var params = {
      Bucket: '***************',
      Key: fileName
      /*
         where value for 'Key' equals 'pathName1/pathName2/.../pathNameN/fileName.ext'
         - full path name to your file without '/' at the beginning
      */
    };
    var that = this;
    bucket.deleteObject(params, function (err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else console.log(data)

    });
  }
  public getFile() {
    return this.resData.asObservable();
  }

}
