// eslint-disable-next-line import/prefer-default-export
export interface IFileRepository {
  transfer(location: string, newLocation: string, fileName: string): string | null;
  verify(path: string): void;
}
