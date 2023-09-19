import { useEffect, useRef } from "react"
import * as d3 from "d3";

export default function DeparturesByDay({
    data,
    width = 500,
    height = 250,
    marginTop = 20,
    marginRight = 20,
    marginBottom = 20,
    marginLeft = 20
}) {

  // Declare the x (horizontal position) scale.
  const x = d3.scaleUtc(d3.extent(data, d => d.date), [marginLeft, width - marginRight]);

  // Declare the y (vertical position) scale.
  const y = d3.scaleLinear([0, d3.max(data, d => d.count)], [height - marginBottom, marginTop]);

  // Declare the line generator.
  const line = d3.line()
      .x(d => x(d.date))
      .y(d => y(d.count));

  // Create the SVG container.
  const svg = d3.select("#chart")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

  // Add the x-axis.
  svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0));

  // Add the y-axis, remove the domain line, add grid lines and a label.
  svg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y).ticks(height / 40))
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").clone()
          .attr("x2", width - marginLeft - marginRight)
          .attr("stroke-opacity", 0.1))
      .call(g => g.append("text")
          .attr("x", -marginLeft)
          .attr("y", 10)
          .attr("fill", "white")
          .attr("text-anchor", "start")
          .text("Daily rides"));

  // Append a path for the line.
  svg.append("path")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", line(data));

return (
    <div>
        <svg id="chart"/>
    </div>
)





    // const date: any[] = []
    // const count: any[] = []

    // for (const i in data) {
    //     date.push(data[i]['date'])
    //     count.push(data[i]['count'])
    // }
    // const gx = useRef();
    // const gy = useRef();
    // // Declare the x (vertical position) scale.
    // const x = d3.scaleUtc([date[0], date[date.length - 1]], [marginLeft, width - marginRight])
    // // Declare the y (vertical position) scale.
    // const y = d3.scaleLinear(d3.extent(count), [height - marginBottom, marginTop]);
    // const line = d3.line()
    //     .x((d) => x(d['date']))
    //     .y((d) => y(d['count']));

    // return (
    //     <svg width={width} height={height}>
    //         <path fill="none" stroke="currentColor" strokeWidth="1.5" d={line(data)} />
    //         <g fill="white" stroke="currentColor" strokeWidth="1.5">
    //             {data.map((d, i) => (<circle key={i} cx={x(d['date'])} cy={y(d['count'])} r="2.5" />))}
    //         </g>
    //     </svg>
    // );
}

