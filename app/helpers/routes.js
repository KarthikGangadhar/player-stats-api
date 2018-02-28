'use strict';

const Joi = require('joi');
const crickerHandlers = require('../lib/cricker_handlers.js');

const battingSchema = Joi.object({
    "50": Joi.string(),
    "100": Joi.string(),
    "St": Joi.string(),
    "Ct": Joi.string(),
    "6s": Joi.string(),
    "4s": Joi.string(),
    "SR": Joi.string(),
    "BF": Joi.string(),
    "Ave": Joi.string(),
    "HS": Joi.string(),
    "Runs": Joi.string(),
    "NO": Joi.string(),
    "Inns": Joi.string(),
    "Mat": Joi.string()
});

const bowlingSchema = Joi.object({
    "10": Joi.string(),
    "5w": Joi.string(),
    "4w": Joi.string(),
    "SR": Joi.string(),
    "Econ": Joi.string(),
    "Ave": Joi.string(),
    "BBM": Joi.string(),
    "BBI": Joi.string(),
    "Wkts": Joi.string(),
    "Runs": Joi.string(),
    "Balls": Joi.string(),
    "Inns": Joi.string(),
    "Mat": Joi.string()
})

const playerSchema = {
    "pid": Joi.string().required(),
    "profile": Joi.string(),
    "imageURL": Joi.string(),
    "battingStyle": Joi.string(),
    "bowlingStyle": Joi.string(),
    "majorTeams": Joi.string(),
    "currentAge": Joi.string(),
    "born": Joi.string(),
    "fullName": Joi.string(),
    "name": Joi.string().required(),
    "country": Joi.string().required(),
    "playingRole": Joi.string(),
    "data": Joi.object({
        "bowling": Joi.object({
            "listA": bowlingSchema,
            "firstClass": bowlingSchema,
            "T20Is": bowlingSchema,
            "ODIs": bowlingSchema,
            "tests": bowlingSchema
        }),
        "batting": Joi.object({
            "listA": battingSchema,
            "firstClass": battingSchema,
            "T20Is": battingSchema,
            "ODIs": battingSchema,
            "tests": battingSchema
        })
    })
}

const resultHTTPStatus = {
    '200': {
        'description': 'Success'
    },
    '400': {
        'description': 'Bad Request'
    },
    '404': {
        'description': 'Profile not found'
    },
    '500': {
        'description': 'Internal Server Error'
    }
};

module.exports = [{
        method: 'GET',
        path: '/crickers',
        config: {
            handler: crickerHandlers.getAllPlayers,
            description: 'Get All Crickers',
            tags: ['api', 'reduced'],
            notes: ['Fetches all the existing crickers data from mongodb'],
            plugins: {
                'hapi-swagger': {
                    responses: resultHTTPStatus
                }
            }
        }
    },
    {
        method: 'POST',
        path: '/crickers',
        config: {
            handler: crickerHandlers.createPlayer,
            description: 'Create New crickers',
            tags: ['api', 'reduced'],
            notes: ['Create a new crickers and updates data'],
            plugins: {
                'hapi-swagger': {
                    responses: resultHTTPStatus
                }
            },
            validate: {
                payload: playerSchema
            }
        }
    },
    {
        method: 'GET',
        path: '/crickers/{crickerId}',
        config: {
            handler: crickerHandlers.getByIdPlayer,
            description: 'Get crickers By ID',
            tags: ['api', 'reduced'],
            notes: ['Fetches the existing crickers data by Id'],
            plugins: {
                'hapi-swagger': {
                    responses: resultHTTPStatus
                }
            },
            validate: {
                query: {
                    id: Joi.string().required().description('Id: cricker Id')
                }
            }
        }
    },
    {
        method: 'PUT',
        path: '/crickers/{crickerId}',
        config: {
            handler: crickerHandlers.updatePlayer,
            description: 'Update existing cricker Data',
            tags: ['api', 'reduced'],
            notes: ['Update a crickers data by Id'],
            plugins: {
                'hapi-swagger': {
                    responses: resultHTTPStatus
                }
            },
            validate: {
                payload: playerSchema,
                query: {
                    id: Joi.string().required().description('Id: cricker Id')
                }
            }
        }
    },
    {
        method: 'DELETE',
        path: '/crickers/{crickerId}',
        config: {
            handler: crickerHandlers.deletePlayer,
            description: 'Delete a cricker Data',
            tags: ['api', 'reduced'],
            notes: ['Update a crickers data by Id'],
            plugins: {
                'hapi-swagger': {
                    responses: resultHTTPStatus
                }
            },
            validate: {
                payload: {
                    _id: Joi.string().required(),
                    pid: Joi.string().required(),
                    name: Joi.string().required(),
                }
            }
        }
    }
];