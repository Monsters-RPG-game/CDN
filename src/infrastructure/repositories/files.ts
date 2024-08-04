import { FileMovedError } from '../../errors';
import Log from '../../tools/logger';
import type { IFileRepository } from '../../application/file/repository';
import fs from 'fs';

export default class FilesRepository implements IFileRepository {
  transfer(location: string, newLocation: string, fileName: string): string | null {
    try {
      if (!fs.existsSync(newLocation)) {
        fs.mkdirSync(newLocation, { recursive: true });
      }

      const newFullPath = `${newLocation}/${fileName}`;
      fs.renameSync(`${location}/${fileName}`, newFullPath);
      this.secure(newFullPath);

      return newFullPath;
    } catch (err) {
      Log.error('File repository', `Cannot move file ${fileName} from ${location} to ${newLocation}`, err);
      return null;
    }
  }

  verify(path: string): void {
    try {
      const parts = path.split('/');
      const pathOnly = parts.splice(0, parts.length - 1).join('/');
      const fileName = parts.splice(parts.length - 1, parts.length).join('/');

      const files = fs.readdirSync(pathOnly);
      if (!files.includes(fileName)) throw new FileMovedError();
    } catch (err) {
      Log.error('File repository', `Cannot load file from path ${path}`);
      throw new FileMovedError();
    }
  }
  // Chmod file to restrict executing it
  private secure(path: string): void {
    try {
      fs.chmodSync(path, '0664');
    } catch (err) {
      Log.error('Chmoding', err);
    }
  }
}
