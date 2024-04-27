"use client";

import useSWR from "swr";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FaCalendar, FaYenSign } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

type JobDetail = {
  contents: string;
  name: string;
  type: string;
  publication_date: string;
  short_name: string;
  model_type: string;
  id: number;
  locations: {
    name: string;
  }[];
  categories: {
    name: string;
  }[];
  levels: {
    name: string;
    short_name: string;
  }[];
  refs: {
    landing_page: string;
  };
  company: {
    id: number;
    short_name: string;
    name: string;
  };
}[];

export default function Jobs() {
  const fetcher = (endpoint: string) =>
    fetch(endpoint).then((res) => res.json().then((data) => data.results));

  const [currJob, setCurrJob] = useState<string>("");
  const [currJobList, setCurrJobList] = useState<JobDetail>();

  const { data, isLoading, error } = useSWR<JobDetail>(
    "https://www.themuse.com/api/public/jobs?location=Aalen%2C%20Germany&page=1",
    fetcher
  );

  useEffect(() => {
    setCurrJobList(data);
  }, [data]);

  return (
    <>
      <div></div>
      <section className="h-[98vh] pt-24 px-3 flex">
        <div className="min-w-80 me-4 bg-[#ececec]">
          {isLoading ? (
            <div className="text-center">
              <h3>Loading Jobs...</h3>
            </div>
          ) : (
            <ScrollArea className="h-full rounded-md border">
              <div className="pt-4 px-2">
                <h4 className="mb-4 text-sm font-medium leading-none">Jobs</h4>
                <div>
                  {currJobList?.map((job) => (
                    <div
                      className="rounded-lg max-h-60 bg-slate-50 my-2 p-1 pb-3 drop-shadow-2xl"
                      key={job.id}
                      onClick={() => setCurrJob(job.contents)}
                    >
                      <h4 className="line-clamp-1">{job.name}</h4>
                      <div className="text-sm">
                        <p className="line-clamp-1">{job.company?.name}</p>
                        <div className="my-3">
                          <div className="flex items-center">
                            <FaYenSign />
                            <span className="line-clamp-1">---</span>
                          </div>
                          <div className="flex items-center">
                            <FaLocationDot />
                            {job.locations.map((location) => (
                              <span
                                className="line-clamp-1"
                                key={location.name}
                              >
                                {location.name}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center">
                            <FaCalendar />
                            {job.levels?.map((level) => (
                              <span
                                className="line-clamp-1"
                                key={level.short_name}
                              >
                                {level.name}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex pt-3">
                          {job.categories.map((category) => (
                            <Badge className="bg-jp-red rounded-sm">
                              {category.name}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollArea>
          )}
        </div>
        <div className="grow bg-[#f1f1f1]">
          {isLoading ? (
            <div className="flex size-full items-center justify-center">
              <h2>Loading Job Description....</h2>
            </div>
          ) : error ? (
            <div className="flex size-full items-center justify-center">
              <h2>Failed to load, try refreshing the page</h2>
            </div>
          ) : (
            <ScrollArea className="h-full  rounded-md border">
              <div className="p-4">
                <h4 className="mb-4 text-sm font-medium leading-none">
                  Job Description
                </h4>
                <div dangerouslySetInnerHTML={{ __html: currJob }}></div>
              </div>
            </ScrollArea>
          )}
        </div>
      </section>
    </>
  );
}