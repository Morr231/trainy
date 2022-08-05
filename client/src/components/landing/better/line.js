const MainLine = ({ which }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 800 800"
        className={`${which} line line-small`}
    >
        <path
            d="M226.925 233q411 76 334 334"
            markerEnd="url(#a)"
            transform="rotate(67 399.5 399.245)"
            strokeWidth={7}
            stroke="hsl(227, 71%, 57%)"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="63 11"
        />
        <defs>
            <marker
                markerWidth={10}
                markerHeight={10}
                refX={5}
                refY={5}
                viewBox="0 0 10 10"
                orient="auto"
                id="a"
            >
                <path
                    fill="none"
                    strokeWidth={1.667}
                    stroke="hsl(227, 71%, 57%)"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m1.667 7.5 5-2.5-5-2.5"
                />
            </marker>
        </defs>
    </svg>
);

export default MainLine;
