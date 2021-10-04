import React from 'react';

const ErrorScreen = (props) => {
    return (
        <div>
            Ошибка!
            <div>
                {props.errorMessage}
            </div>
        </div>
    )
}

export default ErrorScreen