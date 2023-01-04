import Button from '@mui/material/Button';
import * as React from 'react';
import Stack from '@mui/material/Stack';

const BoutonCo = (event) =>   {
    return (
        <div>
            <Stack spacing={2} direction="row">
                <Button variant="text" href="/inscription">S'inscrire</Button>
                <Button variant="outlined" href="/connexion"> S'identifier </Button>
            </Stack>
        </div>
    )
}
export default BoutonCo;