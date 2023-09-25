import * as d3 from "d3";
import Destinations from "./Destinations";
import { useEffect, useState } from "react";

export default function DeparturesByDay({
    data,
    destinations,
    width = 500,
    height = 270,
    marginTop = 30,
    marginRight = 20,
    marginBottom = 20,
    marginLeft = 20
}) {
    const [destList, setDestList] = useState([])
    const [selectedDate, setSelectedDate] = useState("")
    // Declare the x (horizontal position) scale.

    useEffect(() => {
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


        function formatDate(date) {
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const year = date.getFullYear();
            return `${month}/${day}/${year}`;
        }

        // Function to handle the click event on inline counts
        const handleInlineCountClick = (event) => {
            // Retrieve the date from the data attribute
            const clickedDate = formatDate(new Date(event.target.getAttribute("data-date")));
            setDestList(destinations.get(clickedDate))
            setSelectedDate(clickedDate)
        };

        // inline counts
        svg.append("g")
            .attr("stroke-linecap", "round")
            .attr("stroke-linejoin", "round")
            .attr("text-anchor", "middle")
            .selectAll()
            .data(data)
            .join("text")
            .text(d => d.count)
            .attr("dy", "0.35em")
            .attr("x", d => x(d.date))
            .attr("y", d => y(d.count))
            .attr("class", "clickable-label")
            .attr("font-size", 10)
            .attr("data-date", (d) => d.date) // Store the date in a data attribute
            .on("click", handleInlineCountClick) // Add click event listener here
            .clone(true).lower()
            .attr("fill", "none")
            .attr("stroke", "white")
            .attr("stroke-width", 4);
    }, [data]);
    return (
        <>
            <svg id="departChart" />
            <Destinations data={destList} selectedDate={selectedDate} />
        </>

    )
}

