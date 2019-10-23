"use strict";

const { ServiceProvider } = require("@adonisjs/fold");
const PhoneNumber = require("awesome-phonenumber");
const isValidCpf = require("../../../function/validators");
const validarCNH = require("../../../function/validarCNH");
const validarFloat = require("../../../function/validatorFloat")

class CustomCustomersValidator extends ServiceProvider {

  // Nome Completo
  async fullname(data, field, message, args, get) {
    const fieldValue = get(data, field);

    if (fieldValue === null) return;

    if (!/\s/g.test(fieldValue)) throw message;
  }

  // CEP
  async zipCode(data, field, message, args, get) {
    const fieldValue = get(data, field);

    if (fieldValue === null) return;

    if (!/^\d{5}-?\d{3}$/g.test(fieldValue)) throw message;
  }

  // cpf
  async cpf(data, field, message, args, get) {
    const fieldValue = get(data, field);

    if (fieldValue === null) return;

    if (!isValidCpf(fieldValue)) throw message;

    return;
  }

  // Telefone
  async phone(data, field, message, args, get) {
    const fieldValue = get(data, field);

    if (fieldValue === null) return;

    const pn = new PhoneNumber(fieldValue);
    if (!pn.isValid()) throw message;
  }

  // Telefone
  async cnhValidator(data, field, message, args, get) {
    const fieldValue = get(data, field);

    if (fieldValue === null) return;

    if (!validarCNH(fieldValue)) throw message;
  }

  async floatValidator(data, field, message, args, get) {
    const fieldValue = get(data, field);

    if (fieldValue === null) return;

    if (!validarFloat(fieldValue)) throw message;
  }



  async nationality(data, field, message, args, get) {
    const nationalityTypes = ["BRAZILIAN_PERSON", "FOREIGN_PERSON"];
    const fieldValue = get(data, field);

    if (fieldValue && !nationalityTypes.includes(fieldValue)) throw message;
  }

  async documents(data, field, message, args, get) {
    const fieldValue = get(data, field);
    const nationality = args[0];

    if (!fieldValue) return;

    if (nationality === "BRAZILIAN_PERSON") {
      if (!fieldValue.hasOwnProperty("rg")) throw message;
      if (!fieldValue.hasOwnProperty("cpf")) throw message;
    }
    if (nationality === "FOREIGN_PERSON") {
      if (!fieldValue.hasOwnProperty("rne")) throw message;
    }
  }

  async documentsExists(data, field, message, args, get) {
    const Profile = use("App/Models/Profile");
    const fieldValue = get(data, field);
    const nationality = args[0];
    const userId = args[1];

    if (!fieldValue) return;

    if (nationality === "BRAZILIAN_PERSON") {
      const existsRg = await Profile.query()
        .where({ "documents.rg": fieldValue.rg })
        .where("_id", "<>", userId)
        .first();

      const existsCpf = await Profile.query()
        .where({ "cpf": fieldValue.cpf })
        .where("_id", "<>", userId)
        .first();

      if (existsCpf || existsRg) throw message;
    }
    if (nationality === "FOREIGN_PERSON") {
      const existsRne = await Profile.query()
        .where({ "documents.rne": fieldValue.rne })
        .where("_id", "<>", userId)
        .first();
      if (existsRne) throw message;
    }
  }



  async gender(data, field, message, args, get) {
    const fieldValue = get(data, field);
    if (!fieldValue) return;
    const normalized = fieldValue.toLowerCase();
    if (normalized !== "m" && normalized !== "f") throw message;
  }

  async civilStatus(data, field, message, args, get) {
    const fieldValue = get(data, field);
    if (!fieldValue) return;
    const normalized = fieldValue.toLowerCase();
    const status = ["single", "married", "apart", "divorced", "widower"];
    if (!status.includes(normalized)) throw message;
  }

  async boot() {
    const Validator = use("Adonis/Addons/Validator");

    Validator.extend("cnh", this.cnhValidator);
    Validator.extend("fullname", this.fullname);
    Validator.extend("zipCode", this.zipCode);
    Validator.extend("cpf", this.cpf);
    Validator.extend("phone", this.phone);
    Validator.extend("nationality", this.nationality);
    Validator.extend("documents", this.documents);
    Validator.extend("documentsExists", this.documentsExists);
    Validator.extend("gender", this.gender);
    Validator.extend("civilStatus", this.civilStatus);
    Validator.extend("float", this.floatValidator)
  }
}
module.exports = CustomCustomersValidator;
