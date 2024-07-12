import { Injectable } from '@angular/core';
import { Cloudinary } from '@cloudinary/angular-5.x';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {

  constructor(private cloudinary: Cloudinary, private http:HttpClient) { }

  uploadFile() {

  }
}
