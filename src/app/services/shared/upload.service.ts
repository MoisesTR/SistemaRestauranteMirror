import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Global} from './global';
import {HttpClient} from '@angular/common/http';
import {isNull, isUndefined} from 'util';

@Injectable()

export class UploadService {
  public url: String;

  constructor(private _http: HttpClient) {
    this.url = Global.url;
  }

  makeFileRequest(url: string, tipo: string, nombreImagen: string, removioImagen: boolean = false, params: Array<string>, files: Array<File>, token: String, name: string ) {

    return new Promise(function(resolve, reject) {
        const formData: any = new FormData();
        const xhr = new XMLHttpRequest();

        if (!isUndefined(files) && !isNull(files)) {
            for (let i = 0; i < files.length; i++) {
                formData.append(name, files[i], files[i].name);
            }
        }

        formData.append('tipo', tipo);
        formData.append('imagenAntigua', nombreImagen);
        formData.append('removioImagen', removioImagen);

        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              resolve(JSON.parse(xhr.response));
            } else {
              reject(xhr.response);
            }
          }
        };

        xhr.open('POST', url, true);
        xhr.setRequestHeader('Authorization', 'token');
        xhr.send(formData);
    });

  }
}
