import { NumericFormat } from 'react-number-format';
import { TextField } from '@mui/material';
import React from 'react';

export const MoneyInput = (props:any) => {

    return <NumericFormat 
        name={props.name}
        value={props.onPriceChange}
        onValueChange={props.onPriceChange}
        thousandSeparator="." 
        decimalSeparator="," 
        decimalScale={2} 
        valueIsNumericString 
        prefix={'R$'} 
        label="Preço" 
        customInput={TextField}/>;
}