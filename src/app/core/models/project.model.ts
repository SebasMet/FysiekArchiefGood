export interface ProjectData {
  generalInformation: {
    projectName: string;
    projectPeriodFrom: string;
    projectPeriodTo: string;
  };
  actorInformation: string[];
  projectId?: string;
}
