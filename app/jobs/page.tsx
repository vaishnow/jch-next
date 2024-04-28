"use client";

import useSWR from "swr";
import { ChangeEvent, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FaCalendar, FaYenSign } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import jpCities from "@/data/japan-cities.json";
import { Skeleton } from "@/components/ui/skeleton";

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
  const defaultCity = "Tokyo%2C%20Japan";

  const fetcher = (endpoint: string) =>
    fetch(endpoint).then((res) => res.json().then((data) => data.results));

  const [currJob, setCurrJob] = useState<string>("");
  const [currJobList, setCurrJobList] = useState<JobDetail>();
  const [currCity, setCurrCity] = useState<string>(defaultCity);

  const { data, isLoading, error, mutate } = useSWR<JobDetail>(
    `https://www.themuse.com/api/public/jobs?location=${currCity}&page=1`,
    fetcher
  );

  let timeout: ReturnType<typeof setTimeout>;

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    timeout && clearTimeout(timeout);
    timeout = setTimeout(
      () =>
        setCurrJobList(
          data?.filter((job) =>
            job.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
            job.company.name
              .toLowerCase()
              .includes(e.target.value.toLowerCase()) ||
            job.locations.find((loc) =>
              loc.name.toLowerCase().includes(e.target.value.toLowerCase())
            )
              ? true
              : false
          )
        ),
      1000
    );
  };

  useEffect(() => {
    setCurrJobList(data);
  }, [data]);

  useEffect(() => {
    mutate();
  }, [currCity]);

  return (
    <>
      <section className="md:h-[98vh] pt-24 px-3 duration-500">
        <div className="flex h-full max-md:flex-col-reverse">
          <div className="md:me-4 max-md:mt-3">
            <Select onValueChange={(e) => setCurrCity(e)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a City" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {jpCities.map((city) => (
                    <SelectItem value={city.replace(", ", "%2C%20")} key={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="md:min-w-80 md:max-w-96 bg-[#ececec] h-full mt-3">
              {isLoading ? (
                <Skeleton className="bg-slate-300 size-full" />
              ) : (
                <ScrollArea className="h-full rounded-md border">
                  <div className="pt-4 px-2">
                    <h4 className="mb-4 text-sm font-medium leading-none">
                      Jobs
                    </h4>
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
                                <Badge
                                  className="bg-jp-red rounded-sm"
                                  key={category.name}
                                >
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
          </div>
          <div className="grow max-h-auto">
            <div className="flex w-full items-center space-x-2">
              <Input
                type="text"
                placeholder="Search Jobs"
                onChange={(e) => handleSearch(e)}
              />
            </div>
            <div className="bg-[#f1f1f1] h-full mt-3 max-md:hidden">
              {isLoading ? (
                <Skeleton className="bg-slate-300 size-full" />
              ) : error ? (
                <div className="flex size-full items-center justify-center">
                  <h2>Failed to load, try refreshing the page</h2>
                </div>
              ) : (
                <ScrollArea className="h-full rounded-md border">
                  <div className="p-4">
                    <h4 className="mb-4 text-sm font-medium leading-none">
                      Job Description
                    </h4>
                    <div dangerouslySetInnerHTML={{ __html: currJob }}></div>
                  </div>
                </ScrollArea>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
