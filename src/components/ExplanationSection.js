import React, { useEffect, useRef } from "react";
import "../style/ExplanationSection.css";

const ExplanationSection = ({ step, pseudoCode }) => {
	const explanationRef = useRef(null);
	const pseudoCodeRef = useRef(null);

	const adjustMargin = (element, maxMargin) => {
		let currentMargin = maxMargin;
		element.style.margin = `${currentMargin}px`;

		while (element.scrollHeight > element.clientHeight && currentMargin > 0) {
			currentMargin -= 1;
			element.style.margin = `${currentMargin}px`;
		}
	};

	useEffect(() => {
		if (explanationRef.current) {
			adjustMargin(explanationRef.current, 10);
		}
		if (pseudoCodeRef.current) {
			adjustMargin(pseudoCodeRef.current, 10);
		}
	}, [step, pseudoCode]);

	return (
		<div className="explanation-section">
			<div className="explanation" ref={explanationRef} dangerouslySetInnerHTML={step?.explanation}></div>
			{Array.isArray(pseudoCode) && pseudoCode.length > 0 && (
				<pre className="pseudo-code" ref={pseudoCodeRef}>
					{pseudoCode.map((line, index) => (
						<div key={index} className={`code-line ${step?.action === line.action ? "highlighted" : ""}`}>
							{line.code}
						</div>
					))}
				</pre>
			)}
		</div>
	);
};

export default ExplanationSection;
