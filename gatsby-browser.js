import React from "react";
import { UserProvider } from "./src/utils/UserContext";

import "./src/scss/style.scss";

export const wrapRootElement = ({ element }) => (
	<UserProvider>
	  	{element}
	</UserProvider>
);