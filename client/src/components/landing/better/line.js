const MainLine = ({ which }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 800 800"
        className={`${which} line`}
    >
        <path
            d="M184 190q504 64 420 420"
            markerEnd="url(#a)"
            transform="rotate(77 400.5 400.629)"
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

export default MainLine;
