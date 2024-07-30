import RequestError from "../errors/requestError.js";

async function pagination(req, res, next) {
    let { limit=12, page=1, ordernation='_id:-1' } = req.query;
    try {
        limit = parseInt(limit);
        page = parseInt(page);
        const pagesNumber = Math.ceil(req.elementsCount / limit);

        page = (page < pagesNumber)? page : (pagesNumber > 0)? pagesNumber : 1;
        let [orderBy, order] = ordernation.split(':');
        order = parseInt(order);

        const list = req.result;
        if(limit > 0 && page > 0 && (order === 1 || order === -1)) {
            const processList = await list
            .collation({ locale: "pt" })
            .sort({ [orderBy]: order })
            .skip(limit*(page - 1))
            .limit(limit);

            const result = [pagesNumber, processList];
            res.status(200).send(result);
        } else {
            throw new RequestError();
        }
    } catch(error) {
        console.log(error)
        next(error)
    }
}

export default pagination;