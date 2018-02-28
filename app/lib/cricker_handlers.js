const mongoose = require('mongoose');
const config = require('../../config');
const Player = require('../models/cricketers');

mongoose.connect(config.playerstat);

const CreatePlayer = (request, reply) => {
    var user = new Player(request.payload);

    user.save((err) => {
        if (err) {
            reply({
                "err": err
            })
        } else {
            reply(user);
        }
    });
};

const UpdatePlayer = (request, reply) => {
    Player.findByIdAndUpdate(request.query.id, request.payload, {
        new: true
    }, (err, user) => {
        if (err) {
            reply({
                err: err
            });
        } else {
            reply(user);
        }
    });
};

const DeletePlayer = (request, reply) => {
    Player.remove(request.payload, (err, data) => {
        if (err) {
            reply({
                err: err
            });
        } else {
            reply({
                message: "success"
            });
        }
    });
};

const GetAllPlayers = (request, reply) => {
    Player.find((err, users) => {
        if (err) {
            reply({
                'err': err
            });
        } else {
            reply(users);
        }
    });
};

const GetOnePlayer = (request, reply) => {
    reply(request.user);
};

const GetByIdPlayer = (request, reply) => {
    let id = request.query.id;
    Player.findOne({
        _id: id
    }, (err, user) => {
        if (err) {
            reply({
                err: err
            });
        } else {
            reply(user);
        }
    });
};

module.exports = {
    getAllPlayers: GetAllPlayers,
    createPlayer: CreatePlayer,
    updatePlayer: UpdatePlayer,
    deletePlayer: DeletePlayer,
    getOnePlayer: GetOnePlayer,
    getByIdPlayer: GetByIdPlayer,
}