import React from 'react';
import { Alert } from 'reactstrap';

const WrongUsernamePasswordAlert = (props: any) => {
  return (
    <div>
		<Alert color="primary">
		This is a primary alert — check it out!
		</Alert>
		<Alert color="secondary">
		This is a secondary alert — check it out!
		</Alert>
	</div>
  )
};

export {WrongUsernamePasswordAlert};
