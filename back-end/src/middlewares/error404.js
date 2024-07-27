import NotFoundError from "../errors/notFoundError.js";

function error404(req, res, next) {
    const error404 = new NotFoundError();
    next(error404);
}

export default error404;