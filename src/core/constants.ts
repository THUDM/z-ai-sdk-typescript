/**
 * Constants class containing all the configuration values and model identifiers used
 * throughout the ZAI TypeScript SDK.
 *
 * This class provides centralized access to:
 * - API base URLs
 * - Model identifiers for different AI capabilities
 * - Environment variable names
 */

// =============================================================================
// API Configuration
// =============================================================================

/**
 * Base URL for the ZHIPU AI OpenAPI service. All API requests will be made to
 * endpoints under this base URL.
 */
export const ZHIPU_AI_BASE_URL = 'https://open.bigmodel.cn/api/paas/v4/';

/**
 * Base URL for the Z.AI OpenAPI service. All API requests will be made to endpoints
 * under this base URL.
 */
export const Z_AI_BASE_URL = 'https://api.z.ai/api/paas/v4/';

// =============================================================================
// Environment Variable Names
// =============================================================================

/**
 * Environment variable name for the API key
 */
export const ENV_API_KEY = 'ZAI_API_KEY';

/**
 * Environment variable name for the base URL
 */
export const ENV_BASE_URL = 'ZAI_BASE_URL';

// =============================================================================
// Text Generation Models
// =============================================================================

/**
 * GLM-4 Plus model - Enhanced version with improved capabilities.
 */
export const ModelChatGLM4Plus = 'glm-4-plus';

/**
 * GLM-4 Air model - Lightweight version optimized for speed.
 */
export const ModelChatGLM4Air = 'glm-4-air';

/**
 * GLM-4 Flash model - Ultra-fast response model.
 */
export const ModelChatGLM4Flash = 'glm-4-flash';

/**
 * GLM-4 standard model - Balanced performance and capability.
 */
export const ModelChatGLM4 = 'glm-4';

/**
 * GLM-4 model version 0520 - Specific version release.
 */
export const ModelChatGLM40520 = 'glm-4-0520';

/**
 * GLM-4 AirX model - Extended Air model with additional features.
 */
export const ModelChatGLM4Airx = 'glm-4-airx';

/**
 * GLM-4 Long model - Optimized for long-context conversations.
 */
export const ModelChatGLMLong = 'glm-4-long';

/**
 * GLM-4 Voice model - Specialized for voice-related tasks.
 */
export const ModelChatGLM4Voice = 'glm-4-voice';

// =============================================================================
// Vision Models (Image Understanding)
// =============================================================================

/**
 * GLM-4V Plus model - Enhanced vision model for image understanding.
 */
export const ModelChatGLM4VPlus = 'glm-4v-plus';

/**
 * GLM-4V standard model - Standard vision model for image analysis.
 */
export const ModelChatGLM4V = 'glm-4v';

/**
 * GLM-4V Flash model - Free and powerful image understanding model.
 */
export const ModelChatGLM4VFlash = 'glm-4v-flash';

// =============================================================================
// Image Generation Models
// =============================================================================

/**
 * CogView-3 Plus model - Enhanced image generation capabilities.
 */
export const ModelCogView3Plus = 'cogview-3-plus';

/**
 * CogView-3 standard model - Standard image generation model.
 */
export const ModelCogView3 = 'cogview-3';

// =============================================================================
// Embedding Models
// =============================================================================

/**
 * Embedding-2 model - Text embedding model for semantic similarity.
 */
export const ModelEmbedding2 = 'embedding-2';

/**
 * Embedding-3 model - Enhanced text embedding model.
 */
export const ModelEmbedding3 = 'embedding-3';