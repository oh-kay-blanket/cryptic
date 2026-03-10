import React from "react";
import { CookieConsentProvider } from "./src/utils/CookieConsentContext";
import { AuthProvider } from "./src/utils/AuthContext";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { UserProvider } from "./src/utils/UserContext";
import CookieConsentBanner from "./src/components/CookieConsentBanner";

import "./src/scss/style.scss";

export const wrapRootElement = ({ element }) => (
	<CookieConsentProvider>
		<AuthProvider>
			<UserProvider>
				{element}
				<CookieConsentBanner />
				<Analytics />
				<SpeedInsights />
			</UserProvider>
		</AuthProvider>
	</CookieConsentProvider>
)

// Disable Gatsby's automatic scroll restoration to prevent scroll jumps during navigation
// Combined with body.fixed-page CSS, this ensures pages always start at top position
export const shouldUpdateScroll = () => {
	return false;
}