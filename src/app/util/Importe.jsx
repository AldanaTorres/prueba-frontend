import React from 'react';
import NumberFormat from 'react-number-format';

const Importe = ({
    label,
    input,
    width,
    placeholder,
    meta: { touched, error },
    ...rest
  }) => {

        return (
            <>
                <NumberFormat
                    className='form-control'
                    allowNegative={false}
                    inputMode="numeric"
                    thousandSeparator={true}
                    placeholder={'$0.00'}
                    fixedDecimalScale={true}
                    decimalScale={2}
                    isNumericString={true}
                    onValueChange={e => input.onChange(e.floatValue)}
                    prefix={'$'}
                    value={input.value}
                />
                <div className="text-danger" style={{ marginBottom: "20px" }}>
                    {touched && error}
                </div>
            </>
        )
}


export default Importe;
