class AppError extends Error {
    public readonly statusCode? :number;

    constructor (message: string, statusCode?: number) {
        super(message);
        this.name = "App error";
        this.statusCode = statusCode
    }
}

export {
    AppError
}
