import React, { useEffect } from "react";
import * as d3 from "d3";
import { useRouter } from 'next/navigation';

export default function Destinations({
    data,
    selectedDate,
    width = 500,
    height = 270,
    marginTop = 40,
    marginRight = 20,
    marginBottom = 40,
    marginLeft = 40
}) {
    const router = useRouter();
    const title = selectedDate ? "Top destinations on " + selectedDate : "Select a data point from the line chart";

    const handleXLabelClick = (label) => {
        // Handle the click event for x-axis labels
        router.push(label);
        console.log("Clicked label:", label);
        // You can perform any custom action here based on the clicked label.
    };

    useEffect(() => {
        // Clear the previous chart
        d3.select("#destinations").selectAll("*").remove();

        // Check if data is empty
        if (data.size === 0) {
            return;
        }

        // Sort the data in descending order by value
        const sortedData = [...data.entries()].sort((a, b) => b[1] - a[1]);

        const svg = d3.select("#destinations");

        const xScale = d3
            .scaleBand()
            .domain(sortedData.map(d => d[0]))
            .range([0, width - marginLeft - marginRight])
            .padding(0.1);

        const yScale = d3
            .scaleLinear()
            .domain([0, d3.max(sortedData.map(d => d[1]))])
            .nice()
            .range([height - marginTop - marginBottom, 0]);

        const g = svg
            .append("g")
            .attr("transform", `translate(${marginLeft},${marginTop})`);

        // Create bars
        g.selectAll("rect")
            .data(sortedData)
            .enter()
            .append("rect")
            .attr("x", d => xScale(d[0]))
            .attr("y", d => yScale(d[1]))
            .attr("width", xScale.bandwidth())
            .attr("height", d => height - marginTop - marginBottom - yScale(d[1]))
            .attr("fill", "steelblue");

        // Create x-axis
        g.append("g")
            .attr("class", "x-axis")
            .attr("transform", `translate(0,${height - marginTop - marginBottom})`)
            .call(d3.axisBottom(xScale));

        // Create y-axis with integer values
        g.append("g")
            .attr("class", "y-axis")
            .call(
                d3
                    .axisLeft(yScale)
                    .ticks(5)
                    .tickFormat(d3.format("d")) // Display integer values
            );

        // Add x-axis label
        svg
            .append("text")
            .attr("x", width / 2)
            .attr("y", height - 10)
            .attr("text-anchor", "middle")
            .attr("fill", "white")
            .text("Station");

        // Create x-axis
        const xAxis = g.append("g")
            .attr("class", "x-axis")
            .attr("transform", `translate(0,${height - marginTop - marginBottom})`)
            .call(d3.axisBottom(xScale));
        // Add click event listener to x-axis labels
        xAxis.selectAll(".tick text")
            .attr("class", "clickable-label")
            .on("click", (event, label) => router.push(label));

        // Add y-axis label
        svg
            .append("text")
            .attr("x", -height / 2)
            .attr("y", marginLeft / 2)
            .attr("transform", "rotate(-90)")
            .attr("fill", "white")
            .attr("text-anchor", "middle")
            .text("Weight");

        // Add chart title
        svg
            .append("text")
            .attr("x", width / 2)
            .attr("y", marginTop / 2) // Adjusted position
            .attr("text-anchor", "middle")
            .attr("fill", "white")
            .attr("font-size", "1.5em") // Adjust font size
            .text(title);
    }, [data, height, width, marginLeft, marginTop, marginRight, marginBottom, title]);

    return <svg id="destinations" width={width} height={height} />;
}
