import React from "react";
import "../style/ExplanationSection.css";

const ExplanationSection = ({ step, pseudoCode }) => {
	let { explanation, action } = step || {};

	return (
		<div className="explanation-section">
			<div className="explanation" dangerouslySetInnerHTML={explanation}></div>
			{Array.isArray(pseudoCode) && pseudoCode.length > 0 && (
				<pre className="pseudo-code">
					{pseudoCode.map((line, index) => (
						<div key={index} className={`code-line ${action === line.action ? "highlighted" : ""}`}>
							{line.code}
						</div>
					))}
				</pre>
			)}
		</div>
	);
};

export default ExplanationSection;
