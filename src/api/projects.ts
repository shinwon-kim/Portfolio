import { collection, getDocs } from "firebase/firestore";
import { fireDB } from "../firebase/firebasedb";
import { ProjectsData } from "../types/projectData";

export const getProjects = async (): Promise<ProjectsData[]> => {
  const QuerySnapshot = await getDocs(collection(fireDB, "projects"));
  const projectList: ProjectsData[] = QuerySnapshot.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as Omit<ProjectsData, "id">)
  }));
  return projectList;
};
