const LineLeft = ({ style, lineClass }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 800 800"
        style={style}
        className={`${lineClass} line-left line line-small`}
    >
        <path
            d="M186.5 184.042q63 478 427 427"
            markerEnd="url(#a)"
            transform="rotate(1 399.5 342.706)"
            strokeWidth={13}
            stroke="hsl(227, 71%, 57%)"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="37 22"
        />
        <defs>
            <marker
                markerWidth={8}
                markerHeight={8}
                refX={4}
                refY={4}
                viewBox="0 0 8 8"
                orient="auto"
                id="a"
            >
                <path
                    fill="none"
                    strokeWidth={1.333}
                    stroke="hsl(227, 71%, 57%)"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m1.333 6 4-2-4-2"
                />
            </marker>
        </defs>
    </svg>
);

export default LineLeft;
