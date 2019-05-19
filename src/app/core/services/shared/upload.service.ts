import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";
import { Global } from "./global";
import { NGXLogger } from "ngx-logger";

@Injectable()
export class UploadService {
    public url: String;

    constructor(private logger: NGXLogger) {
        this.url = Global.url;
    }

    makeFileRequest(carpeta: string, id: number, files: Array<File>) {
        return new Promise((resolve, reject) => {
            const formData: any = new FormData();
            const xhr = new XMLHttpRequest();

            if (files) {
                for (let i = 0; i < files.length; i++) {
                    formData.append("image", files[i], files[i].name);
                }
            }

            xhr.onreadystatechange = () => {
                // CUANDO TERMINE EL PROCESO
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.response));
                        this.logger.info("La imagen se ha subido correctamente");
                    } else {
                        this.logger.error("La subida de la imagen fallo");
                        reject(xhr.response);
                    }
                }
            };

            xhr.open("PUT", this.url + "uploadImage/" + carpeta + "/" + id, true);
            xhr.setRequestHeader("Authorization", "token");
            xhr.send(formData);
        });
    }
}