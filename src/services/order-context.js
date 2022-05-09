import React from 'react';
import PropTypes from 'prop-types';
export const OrderContext = React.createContext([]);

OrderContext.Provider.propTypes = {
    value: PropTypes.shape({
        orderDetails: PropTypes.shape({
            success: PropTypes.bool.isRequired,
            name: PropTypes.string,
            message: PropTypes.string,
            order: PropTypes.shape({
                number: PropTypes.number.isRequired,
            })
        }),
        setOrderDetails: PropTypes.func
    })

};