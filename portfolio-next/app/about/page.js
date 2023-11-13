import React from 'react';

export default function About() {

  return (
    <>
      <div className="container about-page">
        <div className="text-zone">
          <h1>
            Experience
          </h1>
          <b align="LEFT">
            Full-stack Developer/Data Scientist | CIO Network Analytics | IBM | 2020 – 2023
          </b>
          <p align="LEFT">
            Spearheaded the development of powerful new enterprise web applications and tools designed to improve staff effectiveness and performance.
            Determined the steps needed to swiftly and comprehensively resolve quality issues and feature updates during customer support activities.
          </p>
          <p>
            <ul>
              <li>Improved the user experience of 20 clients while slashing required Network team troubleshooting time by recreating an outdated web app using React and JPA Hibernate. </li>
              <li>Worked with customers to automate workflows and ensure a high level of data quality. </li>
              <li>Fine tuned API response time for high traffic dashboards by optimizing SQL queries and preprocessing data.</li>
              <li>Established desired content moderation reports by authoring Python and Scala Apache Spark jobs to run daily on AirFlow (scanning 2B DNS records) and freeing up time for customers by reducing dependencies on slow and difficult to use analytics tools.</li>
              <li>Awarded with promotion from internship role due to track record of success.</li>
            </ul>
          </p>
          <b align="LEFT">
            Software Developer Intern | IBM | 2019 – 2020
          </b>
          <p align="LEFT">
            Demonstrated continued success as a member of an agile team during the end-to-end completion of multiple development project lifecycles.
          </p>
          <p>
            <ul>
              <li>Enabled new views into firewall logs by running Apache Spark pipelines to extract meaningful insights.</li>
              <li>Drove accurate back-end data by scheduling AirFlow jobs and maintaining reporting infrastructure. </li>
            </ul>
          </p>
          <b align="LEFT">
            ServiceNow Developer Intern | Integration Partners LLC | 2018 – 2018
          </b>
          <p align="LEFT">
            Spearheaded the development of new ServiceNow dashboards designed to close gaps and increase the performance of sales and IT team workflows.
          </p>
          <h1>
            Skills
          </h1>
          <p>
            JavaScript (React) | Python (Flask) | Java | Hibernate | SQL | Scala | RESTful APIs | TypeScript | Spark | MongoDB | HDFS | Git | Jenkins | Docker | Jira | CI/CD | Pip | npm | UX/UI | Airflow | HTML | CSS | Apache | PostMan |
          </p>
          <h1>
            Education
          </h1>
          <b>Bachelor of Science in Computer Science| Wentworth Institute of Technology, Boston, MA, 2016-2020</b>
          <p>
            Projects
            <ul>
              <li>
                <p>Wikipedia Article Recommendation</p>
                <p>Calculated similarity scores using a bag of words approach combined with sentiment analysis between all English articles using Apache Spark and Facebook’s NLP model </p>
              </li>
              <li>
                <p>Path Finding Algorithm Web App</p>
                <p> Dijkstra's, A*, bfs, dfs algorithms in a React Redux interactive web app.</p>
              </li>
            </ul>
          </p>
        </div>
      </div>
      {/* <Loader type="ball-pulse-rise" /> */}
    </>
  )
}
