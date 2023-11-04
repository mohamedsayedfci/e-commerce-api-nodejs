exports.getAllRecords = async (model) => {
    const Model = require("../Models/" + model);

    return await Model.find();
};

exports.createRecord = async (model,request) => {
    const Model = require("../Models/" + model);

    return await Model.create(model,request);
};

exports.getRecordById = async (model,id) => {
    const Model = require("../Models/" + model);

    return await Model.findById(id);
};

exports.updateRecord = async (model,id, request) => {
    const Model = require("../Models/" + model);

    return await Model.findByIdAndUpdate(id, request);
};

exports.deleteRecord = async (model,id) => {
    const Model = require("../Models/" + model);

    return await Model.findByIdAndDelete(id);
};
