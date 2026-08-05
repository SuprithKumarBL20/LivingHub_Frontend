import { fileApi } from './api/fileApi';
import { fileMapper } from './mappers/fileMapper';
import { fileQueries } from './queries/fileQueries';

export const fileService = {
  uploadFile: async (fileObject) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return Promise.resolve({
      success: true,
      message: 'Attachment uploaded successfully to S3 storage bucket',
      data: {
        fileUrl: `https://cdn.livinghub.com/uploads/${Date.now()}_${fileObject.name}`,
        fileName: fileObject.name,
        fileSize: fileObject.size
      },
      errors: [],
      meta: null
    });
  }
};

export { fileQueries, fileApi, fileMapper };
