import React from "react";
import { CookieConsentProvider } from "./src/utils/CookieConsentContext";
import { AuthProvider } from "./src/utils/AuthContext";
import { UserProvider } from "./src/utils/UserContext";
import CookieConsentBanner from "./src/components/CookieConsentBanner";

export const wrapRootElement = ({ element }) => (
	<CookieConsentProvider>
		<AuthProvider>
			<UserProvider>
				{element}
				<CookieConsentBanner />
			</UserProvider>
		</AuthProvider>
	</CookieConsentProvider>
)
