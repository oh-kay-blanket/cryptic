import React from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { UserProvider } from "./src/utils/UserContext";

import "./src/scss/style.scss";

export const wrapRootElement = ({ element }) => (
	<UserProvider>
		{element}
		<Analytics />
		<SpeedInsights />
	</UserProvider>
)

// Disable Gatsby's automatic scroll restoration to prevent scroll jumps during navigation
// Combined with body.fixed-page CSS, this ensures pages always start at top position
export const shouldUpdateScroll = () => {
	return false;
}