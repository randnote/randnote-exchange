import type { NextPage } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Button , Popover, PopoverBody, PopoverHeader} from "reactstrap";

import {Container} from "reactstrap";

const AddedCardsSection = () =>{
	return(
		<Container >
			<Table style={stylesTable}  responsive>
			<thead>
				<tr>
					<th style={tableHeaderNameStyle}>DEPOSIT METHODS</th>
				</tr>
			</thead>

			

			<tbody>
				<tr>
					<th scope="row">Mastercard ending in ...</th>
					<td>Expires in 2025</td>
					<td> 
					<Button
					onClick={this.toggle}
					    id="Popover1"
					    type="button"
					  >
					    Launch Popover
					  </Button>
					  </td>
					
				</tr>
			</tbody>
		</Table>

		 <Popover
		    placement="bottom"
		    target="Popover1"
		    toggle={function noRefCheck(){}}
		  >
		    <PopoverHeader>
		      Popover Title
		    </PopoverHeader>
		    <PopoverBody>
		      Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.
		    </PopoverBody>
		  </Popover>
		</Container>
	)
}

const stylesTable = {
	margin: '10px',
	
}

const tableHeaderNameStyle = {
	color: "#2cb978",
}

export default AddedCardsSection;