import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { AboutMe } from "../../model/aboutme";
import { Project } from "../../model/project";
import AboutMeCard from "../cards/AboutMeCard";
import ProjectCard from "../cards/ProjectCard";
import { themes } from "../../styles/ColorStyles";
import { MediumText } from "../../styles/TextStyles";

import { useFirestore, useFirestoreCollectionData } from "reactfire";
import {
  collection,
  CollectionReference,
  DocumentData,
} from "@firebase/firestore";

interface AboutMeResponse {
  status: string;
  data: DocumentData[];
}

interface ProjectResponse {
  status: string;
  data: DocumentData[];
}

const Dashboard = () => {
  const { t } = useTranslation();

  const aboutMeCollectionRef: CollectionReference<DocumentData> = collection(
    useFirestore(),
    "aboutme"
  );
  const projectsCollectionRef: CollectionReference<DocumentData> = collection(
    useFirestore(),
    "project"
  );

  const { status: statusAboutme, data: dataAboutMe }: AboutMeResponse =
    useFirestoreCollectionData(aboutMeCollectionRef);
  const { status: statusProjects, data: dataProjects }: ProjectResponse =
    useFirestoreCollectionData(projectsCollectionRef);

  return (
    <Wrapper>
      <ContentWrapper>
        <ResponseWrapper>
          <AboutMeWrapper>
            {statusAboutme === "error" && <ErrorMsg>{t("dashboard.error")}</ErrorMsg>}
            {statusAboutme === "success" && (
              dataAboutMe?.map((aboutMe, index) => (
                <AboutMeCard aboutMe={aboutMe as AboutMe} key={index} />
              ))
            )}
          </AboutMeWrapper>
          <ProjectWrapper>
            {statusProjects === "error" && <ErrorMsg>{t("dashboard.error")}</ErrorMsg>}
            {statusAboutme === "success" &&
              dataProjects?.map((project, index) => (
                <ProjectCard project={project as Project} key={index} />
              ))}
            {}
          </ProjectWrapper>
        </ResponseWrapper>
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  overflow: hidden;

  @media (min-width: 700px) {
    padding-bottom: 200px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1234px;
  margin: 0 auto;
  padding: 30px 30px 60px 30px;
  display: grid;

  @media (max-width: 450px) {
    padding: 30px 4px 60px 4px;
  }
`;

const ResponseWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto;

  @media (max-width: 1080px) {
    grid-template-columns: auto;
    grid-template-rows: auto auto;
    justify-content: center;
  }
`;

const AboutMeWrapper = styled.div`
  display: grid;
  align-items: flex-start;

  @media (max-width: 810px) {
    align-items: stretch;
    justify-content: stretch;
  }
`;

const ProjectWrapper = styled.div`
  max-width: 2400px;
  margin: 0 auto;
  padding: 20px 30px 120px 30px;
  display: grid;
  grid-template-columns: auto auto auto;
  gap: 40px;

  @media (max-width: 1440px) {
    justify-items: center;
    grid-template-columns: auto auto;
  }

  @media (max-width: 1080px) {
    grid-template-columns: auto auto auto;
    gap: 20px;
  }

  @media (max-width: 940px) {
    grid-template-columns: auto auto;
  }

  @media (max-width: 700px) {
    grid-template-columns: auto;
    gap: 0px;
  }
`;

const ErrorMsg = styled(MediumText)`
  text-align: center;
  @media (prefers-color-scheme: dark) {
    color: ${themes.dark.text1};
  }
`;

export default Dashboard;
