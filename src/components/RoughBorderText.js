import { useEffect, useRef } from "react";
import { annotate } from "rough-notation";

const RoughBorderText = ({ text, color }) => {
  const textRef = useRef(null);

  useEffect(() => {
    const annotation = annotate(textRef.current, {
      type: "highlight",
      color: color,
      padding: 5,
      iterations: 3, // More sketchy effect
      multiline: true,
    });
    annotation.show();
  }, []);

  return (
    <span ref={textRef} className="font-bold text-white px-2">
      {text}
    </span>
  );
};

export default RoughBorderText;