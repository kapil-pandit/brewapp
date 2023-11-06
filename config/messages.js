module.exports = {
    error: {
        REQ_BODY_EMPTY: `Request body is missing!`,
        INVALID_COLLECTION: 'Invalid collection name!',
        BadRequest: {
            status: 400,
            code: "BadRequest",
            message: "The request body contains bad syntax or is incomplete."
        },
        ValidationError: {
            status: 400,
            code: "ValidationError",
            message: "Validation error(s) present. See embedded errors list for more details. (See below)"
        },
        InvalidApplicationStatus: {
            status: 401,
            code: "InvalidApplicationStatus",
            message: "Invalid application status"
        },
        InvalidScopes: {
            status: 401,
            code: "InvalidScopes",
            message: "Missing or invalid scopes for requested endpoint."
        },
        ServerError: {
            status: 500,
            code: "ServerError",
            message: "The request timed out"
        }
    },
    info: {

    }
}