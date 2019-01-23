import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { permission } from '../_models';

@Injectable()
export class PermissionService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<permission[]>(`${config.apiUrl}/permissions`);
    }

    update(permission: permission) {
        return this.http.put(`${config.apiUrl}/permissions/` + permission.id, permission);
    }

    register(permission: permission) {
        return this.http.post(`${config.apiUrl}/permissions/register`, permission);
    }

    delete(id: string) {
        return this.http.delete(`${config.apiUrl}/permissions/` + id);
    }
    
}