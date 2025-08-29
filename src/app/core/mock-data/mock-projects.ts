import { ProjectData } from "@core/models/project.model";

export const mockProjectData: ProjectData[] = [
  {
    "generalInformation": {
      "projectName": "[MOCK] Rijks-Testprogramma Digitale Inclusie",
      "projectPeriodFrom": "2023-04-01",
      "projectPeriodTo": "2026-03-31"
    },
    "actorInformation": [
      "Ministerie van Binnenlandse Zaken en Koninkrijksrelaties (BZK)",
      "Vereniging van Nederlandse Gemeenten (VNG) - Testomgeving",
      "SeniorWeb (Fictieve Samenwerking)",
      "Mw. A. de Wit (Testcoördinator)"
    ],
    "projectId": "TEST-BZK-DI-001"
  },
  {
    "generalInformation": {
      "projectName": "[MOCK] Nationaal Deltaplan Waterkwaliteit Simulatie",
      "projectPeriodFrom": "2022-09-15",
      "projectPeriodTo": "2025-08-31"
    },
    "actorInformation": [
      "Ministerie van Infrastructuur en Waterstaat (IenW)",
      "Rijkswaterstaat (Simulatie Afdeling)",
      "Hoogheemraadschap De Stichtse Rijnlanden (Test-case)",
      "Dhr. Dr. Ir. B. van Dijk (Model-specialist)"
    ],
    "projectId": "TEST-RWS-NDWK-S03"
  },
  {
    "generalInformation": {
      "projectName": "[MOCK] Proefproject Energietransitie Gebouwde Omgeving",
      "projectPeriodFrom": "2024-01-10",
      "projectPeriodTo": "2027-06-30"
    },
    "actorInformation": [
      "Ministerie van Economische Zaken en Klimaat (EZK)",
      "Rijksdienst voor Ondernemend Nederland (RVO) - Mock-unit",
      "Gemeente Utrecht (Fictieve Pilotwijk 'Groen-Zuid')",
      "TNO (Test en Validatie Partner)"
    ],
    "projectId": "MOCK-EZK-PEGO-U01"
  }
]