import React from "react";

export default function ModalContent({ onClose }) {
	return (
		<div className="modal-bg" onClick={onClose}>
			<div className="modal">
				<div>I'm a modal dialog</div>
				<button className="show-btn secondary" onClick={onClose}>Close</button>
			</div>
		</div>
	);
}