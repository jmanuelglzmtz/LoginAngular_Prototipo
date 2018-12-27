import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { rol } from '../_models';

@Injectable()
export class RolService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<rol[]>(`${config.apiUrl}/roles`);
    }
}