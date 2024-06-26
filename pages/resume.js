import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Cursor from "../components/Cursor";
import Header from "../components/Header";
import ProjectResume from "../components/ProjectResume";
import Socials from "../components/Socials";
import Button from "../components/Button";
import { useTheme } from "next-themes";
import ProjCard from "../components/ProjCard";

// Data
import { name, showResume } from "../data/portfolio.json";
import { resume } from "../data/portfolio.json";
import data from "../data/portfolio.json";

const Resume = () => {
  const workRef = useRef();
  const router = useRouter();
  const theme = useTheme();
  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
    if (!showResume) {
      router.push("/");
    }
  }, [router]);
  return (
    <>
      {process.env.NODE_ENV === "development" && (
        <div className="fixed bottom-6 right-6">
          <Button onClick={() => router.push("/edit")} type={"primary"}>
            Edit Resume
          </Button>
        </div>
      )}
      {data.showCursor && <Cursor />}
      <div
        className={`container mx-auto mb-10 ${
          data.showCursor && "cursor-none"
        }`}
      >
        <Header isBlog />
        {mount && (
          <div className="mt-10 w-full flex flex-col items-center">
            <div
              // className={`w-full ${
              //   mount && theme.theme === "dark" ? "bg-slate-800" : "bg-gray-50"
              // } max-w-6xl p-20 mob:p-5 desktop:p-20 rounded-lg shadow-sm`}
              className={`w-full max-w-6xl p-20 mob:p-5 desktop:p-20 rounded-lg shadow-sm border-2 border-slate-700`}
            >
              <h1 className="text-3xl font-bold">{name}</h1>
              <h2 className="text-xl mt-5">{resume.tagline}</h2>
              <h2 className="w-4/5 text-xl mt-5 opacity-50">
                {resume.description}
              </h2>
              <div className="mt-2">
                <Socials />
              </div>

              <div className="mt-5">
                <h1 className="text-2xl font-bold">Education</h1>
                <div className="mt-2">
                  <h2 className="text-lg">{resume.education.universityName}</h2>
                  <h3 className="text-sm opacity-75">
                    {resume.education.universityDate}
                  </h3>
                  <p className="text-sm mt-2 opacity-50">
                    {resume.education.universityPara}
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <h1 className="text-2xl font-bold">Experience</h1>

                {resume.experiences.map(
                  ({ id, dates, type, position, bullets }) => (
                    <ProjectResume
                      key={id}
                      dates={dates}
                      type={type}
                      position={position}
                      bullets={bullets}
                    ></ProjectResume>
                  )
                )}
              </div>

              <div className="mt-10 laptop:mt-10 p-0 laptop:p-0" ref={workRef}>
                <h1 className="text-2xl font-bold">Independent Project Work</h1>

                <div className="mt-2 laptop:mt-2 grid grid-cols-3 mob:grid-cols-1 tablet:grid-cols-1 gap-0">
                  {data.projects.map((project) => (
                    <ProjCard
                      key={project.id}
                      img={project.imageSrc}
                      name={project.title}
                      dates={project.dates}
                      description={project.description}
                      onClick={() => window.open(project.url)}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-10">
                <h1 className="text-2xl font-bold">Skills</h1>
                <div className="flex mob:flex-col desktop:flex-row justify-between">
                  {resume.languages && (
                    <div className="mt-2 mob:mt-5">
                      <h2 className="text-lg mb-1">Languages</h2>
                      <div className="flex flex-wrap gap-2">
                        {resume.languages.map((language, index) => (
                          <div
                            key={index}
                            className={`px-2 py-1 mb-1 border-2 border-slate-700 opacity-75 rounded transition-colors duration-200`}
                          >
                            {language}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {resume.frameworks && (
                    <div className="mt-2 mob:mt-5">
                      <h2 className="text-lg mb-1">Frameworks</h2>
                      <div className="flex flex-wrap gap-2">
                        {resume.frameworks.map((framework, index) => (
                          <div
                            key={index}
                            className={`px-2 py-1 mb-1 border-2 border-slate-700 opacity-75 rounded transition-colors duration-200`}
                          >
                            {framework}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* {resume.others && (
                    <div className="mt-2 mob:mt-5">
                      <h2 className="text-lg">Others</h2>
                      <ul className="list-disc">
                        {resume.others.map((other, index) => (
                          <li key={index} className="ml-5 py-2">
                            {other}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )} */}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Resume;
