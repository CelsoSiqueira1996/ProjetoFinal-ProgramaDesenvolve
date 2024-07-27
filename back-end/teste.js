import dayjs from "dayjs";

const date = new Date(dayjs(new Date()).subtract(1, 'day'))
console.log(new Date() <= date );