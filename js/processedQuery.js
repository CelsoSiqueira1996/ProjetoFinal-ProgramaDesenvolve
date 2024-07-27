const listLimits = document.querySelector(".options__limit");
const listOrderBy = document.querySelector(".options__orderBy");
const optionsLimit = document.querySelectorAll(".options__limit li");
const optionsOrderBy = document.querySelectorAll(".options__orderBy li");
const btnLimit = document.querySelector(".limit__text");
const btnOrderBy = document.querySelector(".orderBy__text");

try {
    btnLimit.addEventListener("click", () => {
        listLimits.style.display = (listLimits.style.display == "block")? "none" : "block";
    });
    
    btnOrderBy.addEventListener("click", () => {
        listOrderBy.style.display = (listOrderBy.style.display == "block")? "none" : "block";
    });
    
    window.addEventListener("click", (event) => {
        if(event.target != btnLimit) listLimits.style.display = "none";
        if(event.target != btnOrderBy) listOrderBy.style.display = "none";
    })
    
    optionsLimit.forEach((option) => {
        option.addEventListener("click", () => {
            const limitValue = option.textContent;
            processedQuery(limitValue);
        });
    });
    
    optionsOrderBy.forEach((option) => {
        option.addEventListener("click", () => {
            const orderByValue = option.textContent;
            processedQuery(undefined, orderByValue);
        })
    });
} catch {
    
}

export function processedQuery(limitValue, orderByValue, pageValue) {
    let ordernation = "";
    const path = location.href;
    switch (orderByValue) {
        case "Mais Recentes":
            ordernation = "_id:-1"
            break;
        case "Mais Antigos":
            ordernation = "_id:1"
            break;
        case "Maior Preço":
            ordernation = "price:-1"
            break;
        case "Menor Preço":
            ordernation = "price:1"
            break;
        case "Marca [a-z]":
            ordernation = "name:1"
            break;
        case "Marca [z-a]":
            ordernation = "name:-1"
            break;
        default:
            ordernation = "";
            break;
    }
    const query = queryFromPath(path);

    if(limitValue) query.limit = limitValue;
    if(orderByValue) query.ordernation = ordernation;
    if(pageValue) query.page = pageValue;

    const queryString = Object.keys(query).reduce((result, key) => {
        return result = result + `${key}=${query[key]}&`
    }, "?");
    const finalQuery = queryString.substring(0, queryString.length -1);

    window.location = location.protocol + "//" + location.host + location.pathname + finalQuery;
}

export function queryFromPath(path) {
    const queries = path.split("?")[1];
    let queryObject = {};
    if(queries) {
        const queryList = queries.split("&").map((pair) => pair.split("="));
        queryObject = queryList.reduce((result, [key, value]) => {
            result[key] = value;
            return result;
        }, {});
    }
    return queryObject;
}
