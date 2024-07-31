class BaseError extends Error {
    constructor(status=500, message="Erro interno do servidor.") {
        super();
        this.status = status;
        this.message = message;
    }

    sendAnswer(res) {
        res.status(this.status).send({message: this.message});
    }
}

export default BaseError;