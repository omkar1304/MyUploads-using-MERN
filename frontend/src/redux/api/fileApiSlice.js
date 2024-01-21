import { apiSlice } from "./apiSlice";
import { FILE_URL } from "../constants";

export const fileApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadFile: builder.mutation({
      query: (data) => ({
        url: `${FILE_URL}/upload`,
        method: "POST",
        body: data,
      }),
    }),

    getFiles: builder.query({
      query: () => ({
        url: `${FILE_URL}`,
      }),
    }),

    deleteFile: builder.mutation({
      query: (data) => ({
        url: `${FILE_URL}/${data.fileId}`,
        method: "DELETE",
      }),
    }),

    downloadFile: builder.query({
      query: (data) => ({
        url: `${FILE_URL}/download/${data.code}`,
      })
    })
  }),
});

export const {
  useUploadFileMutation,
  useGetFilesQuery,
  useDeleteFileMutation,
  useDownloadFileQuery,
} = fileApiSlice;
