import { BaseAPI } from "../core/base-api";
import {
  FileCreateParams,
  FileListParams,
  FileObject,
  FileListResponse,
  FileDeleteResponse,
} from "../types/files";
import { RequestOptions } from "../types/client";

/**
 * Files API
 */
export class Files extends BaseAPI {
  /**
   * Upload a file that can be used across various endpoints
   */
  async create(
    params: FileCreateParams,
    options?: RequestOptions,
  ): Promise<FileObject> {
    const formData = new FormData();

    if (params.file instanceof Buffer) {
      const blob = new Blob([params.file]);
      formData.append("file", blob, params.filename || "file");
    } else {
      formData.append("file", params.file as Blob, params.filename);
    }

    formData.append("purpose", params.purpose);

    const mergedOptions = this.mergeOptions(options, {
      timeout: params.timeout,
      headers: params.extraHeaders,
    });

    try {
      return await this.client.postForm<FileObject>(
        "/files",
        formData,
        mergedOptions,
      );
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Returns a list of files that belong to the user's organization
   */
  async list(
    params?: FileListParams,
    options?: RequestOptions,
  ): Promise<FileListResponse> {
    const queryParams = new URLSearchParams();

    if (params?.purpose) queryParams.append("purpose", params.purpose);
    if (params?.order) queryParams.append("order", params.order);
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.after) queryParams.append("after", params.after);

    const url = `/files${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;

    const mergedOptions = this.mergeOptions(options, {
      timeout: params?.timeout,
      headers: params?.extraHeaders,
    });

    try {
      return await this.client.get<FileListResponse>(url, mergedOptions);
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Returns information about a specific file
   * Unavailable as of 2025-07-17
   */
  // async retrieve(
  //   fileId: string,
  //   options?: RequestOptions,
  // ): Promise<FileObject> {
  //   try {
  //     return await this.client.get<FileObject>(`/files/${fileId}`, options);
  //   } catch (error) {
  //     this.handleError(error);
  //   }
  // }

  /**
   * Delete a file
   */
  async del(
    fileId: string,
    options?: RequestOptions,
  ): Promise<FileDeleteResponse> {
    try {
      return await this.client.delete<FileDeleteResponse>(
        `/files/${fileId}`,
        options,
      );
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Alias for del method
   */
  delete = this.del;

  /**
   * Returns the contents of the specified file
   */
  async content(fileId: string, options?: RequestOptions): Promise<string> {
    try {
      return await this.client.get<string>(`/files/${fileId}/content`, options);
    } catch (error) {
      this.handleError(error);
    }
  }
}
