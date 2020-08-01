import React from 'react';
import { Link } from 'react-router-dom';
import {Header} from 'semantic-ui-react'

export default function Zaglavlje() {

    return (
       <Header className="hoverable">
         <Link  className="veza" to="/banka">Banka</Link>
         <Link className="veza" to="/upit">Upit</Link>
       </Header>    

    );
}
