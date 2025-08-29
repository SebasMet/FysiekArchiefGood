export type ProcessedArchive = {
  id: string;
  name: string;
  ministry: string;
  assignedEmployee: string;
  status: 'Geaccepteerd' | 'Geweigerd' | 'To be processed';
};