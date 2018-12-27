/*export class User {
    id: number;
    userName: string;
    password: string;
    firstName: string;
    lastName: string;
}*/

export class user {
    userName: string;
    firstName: string;
    imageProfile: string;
    roles:    Role[];
}

export class Role {
    rolName: string;
    modules: Module[];
}

export class Module {
    moduleName: string;
    iconName: string;
    types:      Types;
}

export class Types {
    typeName: string[];
}
