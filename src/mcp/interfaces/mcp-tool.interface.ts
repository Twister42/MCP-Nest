import {
  CallToolRequestSchema,
  GetPromptRequestSchema,
  Progress,
  ReadResourceRequestSchema,
} from '@socotra/modelcontextprotocol-sdk/types.js';
import { z } from 'zod';
import { McpServer } from '@socotra/modelcontextprotocol-sdk/server/mcp.js';

export type Literal = boolean | null | number | string | undefined;

export type SerializableValue =
  | Literal
  | SerializableValue[]
  | { [key: string]: SerializableValue };

const u = z.union([
  CallToolRequestSchema,
  ReadResourceRequestSchema,
  GetPromptRequestSchema,
]);
export type McpRequest = z.infer<typeof u>;

/**
 * Enhanced execution context that includes user information
 */
export type Context = {
  reportProgress: (progress: Progress) => Promise<void>;
  log: {
    debug: (message: string, data?: SerializableValue) => void;
    error: (message: string, data?: SerializableValue) => void;
    info: (message: string, data?: SerializableValue) => void;
    warn: (message: string, data?: SerializableValue) => void;
  };
  mcpServer: McpServer;
  mcpRequest: McpRequest;
};
