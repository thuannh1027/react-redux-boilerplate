import React from "react"

const ErrorWrapper = (props) => {
    const { error } = props

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-12" style={{ textAlign: "center", verticalAlign: "middle" }}>
                    <h1 className="mt-5">Internal Error</h1>
                </div>
                <div className="col-lg-12">
                    <h3 className="mt-5">{`Error: ${error.message}`}</h3>
                    <p>{error.stack}</p>
                </div>
            </div>
        </div>
    )
}

export default ErrorWrapper