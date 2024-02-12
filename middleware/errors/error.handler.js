import ErrorResponse from "./error.response.js";

const errorHandler = (err, req, res, next) => {
    console.error(err);

    if (err instanceof ErrorResponse) {
        return res.status(err.status).json({
            success: false,
            status: err.status,
            message: err.message,
        });
    }
    return res.status(500).json({ success: false, status: 500, message: "Something went wrong" });
};

export default errorHandler;