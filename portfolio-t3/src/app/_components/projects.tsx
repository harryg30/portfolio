"use client";

import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export default function Projects(): JSX.Element {
  return (
    <div className="flex flex-row gap-5">
      <Dialog>
        <DialogTrigger className="rounded bg-blue-950 px-1">
          BlueBike Data Visualization
        </DialogTrigger>
        <DialogContent className="rounded bg-blue-950 px-1 text-white">
          <DialogHeader>
            <DialogTitle>BlueBike Data Visualization</DialogTitle>
            <DialogDescription>
              <p> ADD LINK TO BBV </p>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger className="rounded bg-blue-950 px-1">
          Strava API App
        </DialogTrigger>
        <DialogContent className="rounded bg-blue-950 px-1 text-white">
          <DialogHeader>
            <DialogTitle>Strava API App</DialogTitle>
            <DialogDescription>
              <div className="flex flex-col">
                <p>Work in progress...</p>{" "}
                <Link
                  href="https://github.com/harryg30/gpx-ui-exploration/tree/t3-strava"
                  className="w-auto rounded bg-slate-950 py-1"
                >
                  Check out the project on GitHub
                </Link>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
