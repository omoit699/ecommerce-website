class User {
    id: number;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(id: number, username: string, email: string, password: string) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}

export default User;