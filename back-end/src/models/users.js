import mongoose from "mongoose";


const usersSchema = new mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId},
    name: {
        type: String, 
        validate: {
            validator: (name) => name.length >= 3,
            message: 'Insira um nome válido (pelo menos 3 caracteres).'
        }
    },
    cpf: {
        type: String,
        validate: {
            validator: (value) => validateCpfPattern(value),
            message: 'Informe um CPF válido.'
        }
    },
    email: {
        type: String,
        validate: {
            validator: (value) => {
                const emailPattern = new RegExp(/^[^@\s]+@[^@\s]+\.[^@\s]+$/);
                return emailPattern.test(value);
            },
            message: 'Informe um email válido.'
        }
    },
    password: {
        type: String
    },
    birthdate: {
        type: Date,
        required: [true, 'Data de nascimento é obrigatória.']
    },
    permission: {
        type: String,
        default: 'user'
    },
    cart: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "products"
        },
        quantity: { type: Number }
    }]
    ,
    street: {
        type: String,
        default: "----"
    },
    district: {
        type: String,
        default: "----"
    },
    number: {
        type: String,
        default: "----",
    },
    cellphone: {
        type: String,
        validate: {
            validator: (value) => {
                const numberPattern = new RegExp(/^\(?\d{2}\)?\d{4,5}-?\d{4}$|^\(XX\)XXXXX-XXXX$/);
                return numberPattern.test(value)
            },
            message: 'Informe um número de celular válido.'
        },
        default: "(XX)XXXXX-XXXX"
    }
}, { versionKey: false });

export const users = mongoose.model('users', usersSchema);

function validateCpfPattern(value) {
    const cpfPattern = new RegExp(/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/);
    if(cpfPattern.test(value)) {
        const cpf = value.replace(/\.|-/g, "");
        return (validateRepeatedNumbers(cpf) && validateFirstDigitCpf(cpf) && validateSecondtDigitCpf(cpf))
    }
    return cpfPattern.test(value);
}

function validateRepeatedNumbers(cpf) {
    const repeatedNumbers = [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999'
    ];

    return !repeatedNumbers.includes(cpf);
}

function validateFirstDigitCpf(cpf) {
    let sum = 0;
    let multiplier = 10;
    
    for(let index = 0; index < 9; index++) {
        sum += cpf[index]*multiplier;
        multiplier--;
    }

    sum = (sum * 10) % 11;

    if(sum == 10) {
        sum = 0;
    }

    return sum == cpf[9];
}

function validateSecondtDigitCpf(cpf) {
    let multiplier = 11;
    let sum = 0;

    for(let index = 0; index < 10; index++) {
        sum += cpf[index] * multiplier;
        multiplier--;
    }

    sum = (sum * 10) % 11;

    if(sum == 10) {
        sum = 0;
    }

    return sum == cpf[10];
}
