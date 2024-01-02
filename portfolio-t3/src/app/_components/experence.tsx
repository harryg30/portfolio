"use client";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export default function Experience(): JSX.Element {
  return (
    <div className="flex flex-row gap-5">
      <Popover>
        <PopoverTrigger className="rounded  bg-blue-950 px-1">
          IBM | Full Stack Developer
        </PopoverTrigger>
        <PopoverContent className="rounded bg-blue-950">
          <IbmFullTime />
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger className="rounded  bg-blue-950 px-1">
          IBM | Back End Internship
        </PopoverTrigger>
        <PopoverContent className="rounded bg-blue-950">
          <IbmIntern />
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger className="rounded bg-blue-950 px-1">
          Integration Partners | Service Now Developer Internship
        </PopoverTrigger>
        <PopoverContent className="rounded bg-blue-950">
          <IntegrationPartners />
        </PopoverContent>
      </Popover>
    </div>
  );
}

function IbmFullTime(): JSX.Element {
  return (
    <>
      <b>
        Full-stack Developer/Data Scientist | CIO Network Analytics | IBM | 2020
        – 2023
      </b>
      <p>
        Spearheaded the development of powerful new enterprise web applications
        and tools designed to improve staff effectiveness and performance.
        Determined the steps needed to swiftly and comprehensively resolve
        quality issues and feature updates during customer support activities.
      </p>
      <p>
        <ul>
          <li>
            Improved the user experience of 20 clients while slashing required
            Network team troubleshooting time by recreating an outdated web app
            using React and JPA Hibernate.{" "}
          </li>
          <li>
            Worked with customers to automate workflows and ensure a high level
            of data quality.{" "}
          </li>
          <li>
            Fine tuned API response time for high traffic dashboards by
            optimizing SQL queries and preprocessing data.
          </li>
          <li>
            Established desired content moderation reports by authoring Python
            and Scala Apache Spark jobs to run daily on AirFlow (scanning 2B DNS
            records) and freeing up time for customers by reducing dependencies
            on slow and difficult to use analytics tools.
          </li>
          <li>
            Awarded with promotion from internship role due to track record of
            success.
          </li>
        </ul>
      </p>
    </>
  );
}

function IbmIntern(): JSX.Element {
  return (
    <>
      <b>Software Developer Intern | IBM | 2019 – 2020</b>
      <p>
        Demonstrated continued success as a member of an agile team during the
        end-to-end completion of multiple development project lifecycles.
      </p>
      <p>
        <ul>
          <li>
            Enabled new views into firewall logs by running Apache Spark
            pipelines to extract meaningful insights.
          </li>
          <li>
            Drove accurate back-end data by scheduling AirFlow jobs and
            maintaining reporting infrastructure.{" "}
          </li>
        </ul>
      </p>
    </>
  );
}

function IntegrationPartners(): JSX.Element {
  return (
    <>
      <b>
        ServiceNow Developer Intern | Integration Partners LLC | 2018 – 2018
      </b>
      <p>
        Spearheaded the development of new ServiceNow dashboards designed to
        close gaps and increase the performance of sales and IT team workflows.
      </p>
    </>
  );
}
