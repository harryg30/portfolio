import { useEffect, useRef } from "react"
import * as d3 from "d3";

export default function DeparturesByDay({
    data,
    width = 500,
    height = 270,
    marginTop = 30,
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
    const svg = d3.select("#departChart")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto; height: intrinsic")
        .style("-webkit-tap-highlight-color", "transparent")
        .style("overflow", "visible")
        .on("pointerenter pointermove", pointerMoved)
        .on("pointerleave", pointerLeft)
        .on("touchstart", event => event.preventDefault());

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
            .attr("y", marginTop - 10)
            .attr("fill", "white")
            .attr("text-anchor", "start")
            .attr("font-size", 15)
            .text("Number of rides leaving the station by date"));

    // Append a path for the line.
    svg.append("path")
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", line(data));

    // Create the tooltip container.
    const tooltip = svg.append("g");
      
      function formatDate(date) {
        return date.toLocaleString("en", {
          month: "short",
          day: "numeric",
          year: "numeric",
          timeZone: "UTC"
        });
      }
      
      // Add the event listeners that show or hide the tooltip.
      const bisect = d3.bisector(d => d.Date).center;
      function pointerMoved(event) {
        const i = bisect(data, x.invert(d3.pointer(event)[0]));
        tooltip.style("display", null);
        tooltip.attr("transform", `translate(${x(data[i].date)},${y(data[i].count)})`);
    
        const path = tooltip.selectAll("path")
          .data([,])
          .join("path")
            .attr("fill", "white")
            .attr("stroke", "black");
    
        const text = tooltip.selectAll("text")
          .data([,])
          .join("text")
          .call(text => text
            .selectAll("tspan")
            .data([formatDate(data[i].date), data[i].count])
            .join("tspan")
              .attr("x", 0)
              .attr("y", (_, i) => `${i * 1.1}em`)
              .attr("font-weight", (_, i) => i ? null : "bold")
              .text(d => d));
    
        size(text, path);
      }
    
      function pointerLeft() {
        tooltip.style("display", "none");
      }
    
      // Wraps the text with a callout path of the correct size, as measured in the page.
      function size(text, path) {
        const {x, y, width: w, height: h} = text.node().getBBox();
        text.attr("transform", `translate(${-w / 2},${15 - y})`);
        path.attr("d", `M${-w / 2 - 10},5H-5l5,-5l5,5H${w / 2 + 10}v${h + 20}h-${w + 20}z`);
      }


    return (
        <svg id="departChart" />
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

