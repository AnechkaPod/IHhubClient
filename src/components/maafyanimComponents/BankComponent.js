import React, { useState, useEffect } from 'react'

import TableComponent from '../common/TableComponent';
import FormComponent from '../common/FormComponent';
import FormTableComponents from '../common/FormTableComponents';
import Box from '@mui/material/Box';

const bankUrl = 'https://localhost:7140/api/Bank';
const MapUrl = 'https://localhost:7140/api/map?filter=Hgdr_Bank';

const BankComponent = () => {
    return (
        <div style={{ position: 'relative', width: "100%", height: "100%", backgroundSize: 'cover', padding: 0, margin: 0 }}>
            {
                 
                 <FormTableComponents  rowsUrl={bankUrl} columnsUrl={MapUrl} style={{ position: 'relative', backgroundSize: 'cover', height: "100%", width: "100%", minWidth: "100%", minHight: "100%", backgroundSize: 'cover', padding: 0, margin: 0 }} /> 
            }
        </div>
    )
}

export default BankComponent