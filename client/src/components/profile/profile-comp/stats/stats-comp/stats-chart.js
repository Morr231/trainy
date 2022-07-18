import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const dataTemp = [
    {
        name: "Page A",
        uv: 4000,
    },
    {
        name: "Page B",
        uv: 3000,
    },
    {
        name: "Page C",
        uv: 2000,
    },
    {
        name: "Page D",
        uv: 2780,
    },
    {
        name: "Page E",
        uv: 1890,
    },
    {
        name: "Page F",
        uv: 2390,
    },
    {
        name: "Page G",
        uv: 3490,
    },
];

const LineRendered = ({ data, name }) => {
    const tempData = data.map((el) => {
        let elDate = new Date(el.date).toString().split(" ");
        elDate = `${elDate[2]} ${elDate[1]} ${elDate[3]}`;

        if (name === "dailyTime") {
            return {
                name: elDate,
                count: el.timeSpend,
            };
        }
        return {
            name: elDate,
            count: el.wordCount,
        };
    });

    console.log("data", tempData);

    return (
        <ResponsiveContainer width="99%" height={300}>
            <AreaChart
                width="100%"
                height={400}
                data={tempData}
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                    type="monotone"
                    dataKey="count"
                    stroke="#8884d8"
                    fill="#8884d8"
                />
            </AreaChart>
        </ResponsiveContainer>
    );
};

export default LineRendered;
