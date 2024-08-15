export interface IFileRepository {
  transfer(location: string, newLocation: string, fileName: string): string | null;
  verify(path: string): void;
}
