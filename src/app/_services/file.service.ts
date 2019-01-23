import { Injectable } from '@angular/core';
import { HttpClient   } from '@angular/common/http';

@Injectable()
export class FileService {
    
    constructor(private http: HttpClient) { }

    uploadIcon(file: FileList) {        
       
        let input = new FormData();        
        input.append('filesData', file.item(0));
        
        return this.http.post(`${config.apiUrl}/upload/upload`, input);
        
    }
}