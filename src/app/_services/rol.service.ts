import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { rol } from '../_models';

@Injectable()
export class RolService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<rol[]>(`${config.apiUrl}/roles`);
    }

    update(rol: rol) {
        return this.http.put(`${config.apiUrl}/roles/` + rol.id, rol);
    }

    register(rol: rol) {
        return this.http.post(`${config.apiUrl}/roles/register`, rol);
    }

    delete(id: string) {
        return this.http.delete(`${config.apiUrl}/roles/` + id);
    }
}