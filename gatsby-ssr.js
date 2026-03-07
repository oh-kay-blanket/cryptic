import React from "react";
import { AuthProvider } from "./src/utils/AuthContext";
import { UserProvider } from "./src/utils/UserContext";

export const wrapRootElement = ({ element }) => (
	<AuthProvider>
		<UserProvider>
			{element}
		</UserProvider>
	</AuthProvider>
)
