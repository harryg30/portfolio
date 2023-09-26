import React, { useEffect } from "react";
import * as d3 from "d3";
import { useRouter } from 'next/navigation';

export default function BikeBreakdown({
    data,
    width = 500,
    height = 270,
    marginTop = 40,
    marginRight = 20,
    marginBottom = 60,
    marginLeft = 60, // Increased marginLeft for rotated labels
}) { 
    const router = useRouter();
    const title = "Top 25 Bikes at the Station";
    
    useEffect(() => {
        // Clear the previous chart
        d3.select("#bikes").selectAll("*").remove();

        // Check if data is empty
        if (data.size === 0) {
            return;
        }

        // Sort the data in descending order by value
        const sortedData = [...data.entries()].sort((a, b) => b[1] - a[1]);

        // Filter to only include the top 25 bikes
        const top25Data = sortedData.slice(0, 25);

        const svg = d3.select("#bikes");

        const xScale = d3
            .scaleBand()
            .domain(top25Data.map(d => d[0]))
            .range([0, width - marginLeft - marginRight])
            .padding(0.2); // Increased padding for wider bars

        const yScale = d3
            .scaleLinear()
            .domain([0, d3.max(top25Data.map(d => d[1]))])
            .nice()
            .range([height - marginTop - marginBottom, 0]);

        const g = svg
            .append("g")
            .attr("transform", `translate(${marginLeft},${marginTop})`);

        // Create bars without rounded corners
        g.selectAll("rect")
            .data(top25Data)
            .enter()
            .append("rect")
            .attr("x", d => xScale(d[0]))
            .attr("y", d => yScale(d[1]))
            .attr("width", xScale.bandwidth())
            .attr("height", d => height - marginTop - marginBottom - yScale(d[1]))
            .attr("fill", "steelblue");

        // Create x-axis with rotated labels
        const xAxis = g.append("g")
            .attr("class", "x-axis")
            .attr("transform", `translate(0,${height - marginTop - marginBottom})`)
            .call(d3.axisBottom(xScale))
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-0.5em")
            .attr("dy", "0.15em")
            .attr("transform", "rotate(-45)")
            .attr("fill", "blue");

        // Add click event listener to x-axis labels
        xAxis
            .attr("class", "clickable-label")
            .on("click", (event, label) => router.push(label));

        // Create y-axis
        g.append("g")
            .attr("class", "y-axis")
            .call(d3.axisLeft(yScale).ticks(5).tickFormat(d3.format("d")));

        // Add x-axis label
        svg
            .append("text")
            .attr("x", width / 2)
            .attr("y", height - 10)
            .attr("text-anchor", "middle")
            .attr("fill", "white")
            .attr("font-size", 12)
            .text("Bike");

        // Add y-axis label
        svg
            .append("text")
            .attr("x", -height / 2)
            .attr("y", marginLeft / 4)
            .attr("transform", "rotate(-90)")
            .attr("fill", "white")
            .attr("text-anchor", "middle")
            .attr("font-size", 12)
            .text("Rides");

        // Add chart title
        svg
            .append("text")
            .attr("x", width / 2)
            .attr("y", marginTop / 2)
            .attr("text-anchor", "middle")
            .attr("fill", "white")
            .attr("font-size", "1.5em")
            .text(title);
    }, [data, height, width, marginLeft, marginTop, marginRight, marginBottom, title]);

    return (
        <svg id="bikes" width={width} height={height} />
    );
}
