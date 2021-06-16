import React, { Component } from 'react';
import NumberFormat from 'react-number-format';

class Porcentaje extends Component {

    render() {

        const {
            input: { value, onChange }
        } = this.props;

        return (
            <>
                <NumberFormat
                    className='form-control'
                    allowNegative={false}
                    inputMode="numeric"
                    thousandSeparator={false}
                    placeholder={'0%'}
                    fixedDecimalScale={false}
                    isNumericString={true}
                    onValueChange={e => onChange(e.floatValue)}
                    suffix={'%'}
                    value={value}
                    format="###"
                    isAllowed={values => {
                        const { formattedValue, floatValue } = values
                        if (floatValue == null) {
                            return formattedValue === ''
                        } else {
                            
                            return (floatValue <= 200 && floatValue >= 0)
                        }
                    }}
                />
            </>
        )
    }
}

export default Porcentaje;
