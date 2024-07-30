import mongoose from "mongoose";


mongoose.Schema.Types.String.set('validate', {
    validator: (value) => value.trim() !== "",
    message: ({ path }) => `O campo ${path} foi fornecido em branco.`
});

mongoose.Schema.Types.String.set('required', [
    true, 
    `O campo {PATH} é obrigatório.`
])