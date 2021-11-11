import React from 'react';
import { Table, Button } from 'reactstrap';

const WatchlistTable  = ()=>{
    return (
        <Table  bordered responsive>
        <thead>
            <tr>
                <th>Watchlist</th>
            
            </tr>
        </thead>

        <thead>
        <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Change</th>
            <th>Market Cap</th>
        </tr>
        </thead>

        <tbody>
        <tr>
            <th scope="row">RandNote</th>
            <td>ZAR 3,320</td>
            <td style={{color: "red"}}>-1.55%</td>
            <td>ZAR 1.1M</td>
            <td><Button color="success">Buy</Button></td>
        </tr>
        
        </tbody>
    </Table>
    );
  }

  export default WatchlistTable;
