import React, { memo, useState } from "react";

interface TruncateTextProps {
  text: string;
  maxLength: number;
}

const TruncateText: React.FC<TruncateTextProps> = ({ text, maxLength }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleText = () => {
    setIsExpanded((prev) => !prev);
  };

  const shouldTruncate = text.length > maxLength;
  const displayText =
    isExpanded || !shouldTruncate ? text : text.slice(0, maxLength);

  return (
    <>
      <span>{displayText}</span>
      {shouldTruncate && (
        <button
          onClick={toggleText}
          style={{
            marginLeft: "8px",
            color: "blue",
            cursor: "pointer",
            background: "none",
            border: "none",
            padding: 0,
            fontSize: "14px",
          }}
        >
          {isExpanded ? "Show Less" : "Show More"}
        </button>
      )}
    </>
  );
};

export default memo(TruncateText);
