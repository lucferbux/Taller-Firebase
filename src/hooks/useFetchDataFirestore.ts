/* eslint-disable import/no-extraneous-dependencies */
import { useFirestore, useFirestoreCollectionData } from 'reactfire';
import { collection, CollectionReference, DocumentData } from '@firebase/firestore';
import { AboutMe } from '../model/aboutme';
import { Project } from '../model/project';

type FetchDataResult = {
  data: DashboardInfo | null;
  isLoading: boolean;
  error: boolean;
};

interface AboutMeResponse {
  status: string;
  data: DocumentData[];
}

interface ProjectResponse {
  status: string;
  data: DocumentData[];
}

export interface DashboardInfo {
  aboutMe: AboutMe[];
  projects: Project[];
}

export default function useFetchDataFirestore(): FetchDataResult {
  const aboutMeCollectionRef: CollectionReference<DocumentData> = collection(
    useFirestore(),
    'aboutme'
  );
  const projectsCollectionRef: CollectionReference<DocumentData> = collection(
    useFirestore(),
    'project'
  );

  const { status: statusAboutme, data: dataAboutMe }: AboutMeResponse =
    useFirestoreCollectionData(aboutMeCollectionRef);
  const { status: statusProjects, data: dataProjects }: ProjectResponse =
    useFirestoreCollectionData(projectsCollectionRef);

  const isLoading = statusAboutme === 'loading' || statusProjects === 'loading';
  const error = statusAboutme === 'error' || statusProjects === 'error';
  const data =
    statusAboutme === 'success' && statusProjects === 'success'
      ? { aboutMe: dataAboutMe as AboutMe[], projects: dataProjects as Project[] }
      : null;

  return { data, isLoading, error };
}
