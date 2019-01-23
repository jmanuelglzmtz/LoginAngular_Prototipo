import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { module } from '../_models';

@Injectable()
export class ModuleService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<module[]>(`${config.apiUrl}/modules`);
    }

    update(module: module) {
        return this.http.put(`${config.apiUrl}/modules/` + module.id, module);
    }

    register(module: module) {
        return this.http.post(`${config.apiUrl}/modules/register`, module);
    }

    delete(id: string) {
        return this.http.delete(`${config.apiUrl}/modules/` + id);
    }
}