import { BaseRequestOptions } from "./shared";

/**
 * The intended purpose of the uploaded file
 */
export type FilePurpose = 
  | "batch"
  | "retrieval" 
  | "file-extract"
  | "code-interpreter"
  | "fine-tune"
  | "fine-tune-function-calling"
  | "fine-tune-vision-cogview"
  | "fine-tune-vision-cogvlm";

/**
 * The order to sort the files in
 */
export type FileListOrder = "asc" | "desc";

/**
 * Parameters for creating a file
 */
export interface FileCreateParams extends BaseRequestOptions {
  /**
   * The File object (not file name) to be uploaded
   */
  file: File | Buffer;

  /**
   * The intended purpose of the uploaded file
   */
  purpose: FilePurpose;

  /**
   * The name of the file
   */
  filename?: string;
}

/**
 * Parameters for listing files
 */
export interface FileListParams extends BaseRequestOptions {
  /**
   * Only return files with the given purpose
   */
  purpose?: FilePurpose;

  /**
   * The order to sort the files in
   */
  order?: FileListOrder;

  /**
   * A limit on the number of objects to be returned
   */
  limit?: number;

  /**
   * A cursor for use in pagination
   */
  after?: string;
}

/**
 * The File object represents a document that has been uploaded to OpenAI
 */
export interface FileObject {
  /**
   * The file identifier, which can be referenced in the API endpoints
   */
  id: string;

  /**
   * The object type, which is always "file"
   */
  object: "file";

  /**
   * The size of the file, in bytes
   */
  bytes: number;

  /**
   * The Unix timestamp (in seconds) for when the file was created
   */
  created_at: number;

  /**
   * The name of the file
   */
  filename: string;

  /**
   * The intended purpose of the file
   */
  purpose: FilePurpose;

  /**
   * Deprecated. The current status of the file, which can be either uploaded, processed, or error
   */
  status?: "uploaded" | "processed" | "error";

  /**
   * Deprecated. For details on why a fine-tuning training file failed validation, see the error field on fine-tuning job
   */
  status_details?: string;
}

/**
 * Represents a list of files
 */
export interface FileListResponse {
  /**
   * The object type, which is always "list"
   */
  object: "list";

  /**
   * The list of files
   */
  data: FileObject[];

  /**
   * Whether there are more files available
   */
  has_more: boolean;
}

/**
 * Represents a file deletion response
 */
export interface FileDeleteResponse {
  /**
   * The file identifier
   */
  id: string;

  /**
   * The object type, which is always "file"
   */
  object: "file";

  /**
   * Whether the file was successfully deleted
   */
  deleted: boolean;
}
