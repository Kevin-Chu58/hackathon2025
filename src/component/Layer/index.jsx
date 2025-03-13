import { useEffect } from "react";

const Layer = ({ isExpanded, setIsExpanded, hasBgColor }) => {
    useEffect(() => {}, [isExpanded]);

    const transStyle = {
        background: hasBgColor && isExpanded ? "#00000066" : "transparent",
        width: isExpanded ? window.innerWidth : 0,
        height: isExpanded ? window.innerHeight : 0,
        zIndex: isExpanded ? 0 : 1000,
        top: 0,
        left: 0,
        position: "absolute",
    };

    return (
        <div
            onClick={() => setIsExpanded((b) => !b)}
            style={{ ...transStyle, transition: "background .2s ease-in-out" }}
        />
    );
};

export default Layer;
