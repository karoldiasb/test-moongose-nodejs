const mongoose = require('mongoose');
const Slug = require('slug');
const { Schema } = mongoose;

const controleSchema = new Schema({
    Titulo: {
        type: String,
        required: true,
        unique: true
    },
    Entrada: {
        type: Number,
    },
    Saida: {
        type: Number,
    },
    Caixa: {
        type: Number,
    },
    Descricao: {
        type: String,
        required: true
    },
    Createdate: {
        type: Date,
        default: Date.now()
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        default: function () { return Slug(this.Titulo) }
    }

});

module.exports = mongoose.model('controle', controleSchema);