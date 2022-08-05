const LineLeft = ({ style, lineClass }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 800 800"
        style={style}
        className={`${lineClass} line-left line line-small`}
    >
        <path
            d="M176.5 175.556q80 478 447 447"
            markerEnd="url(#a)"
            transform="rotate(1 399.5 342.706)"
            strokeWidth={7}
            stroke="hsl(227, 71%, 57%)"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="63 11"
        />
        <defs>
            <marker
                markerWidth={15}
                markerHeight={15}
                refX={7.5}
                refY={7.5}
                viewBox="0 0 15 15"
                orient="auto"
                id="a"
            >
                <path
                    fill="none"
                    strokeWidth={2.5}
                    stroke="hsl(227, 71%, 57%)"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.5 11.25 10 7.5 2.5 3.75"
                />
            </marker>
        </defs>
    </svg>
);

export default LineLeft;
