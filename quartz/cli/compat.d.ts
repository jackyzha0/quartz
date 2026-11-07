export type RequirementStatus = "ok" | "incompatible" | "invalid" | "unknown" | "none"

export interface RequirementResult {
  status: RequirementStatus
  range: string | undefined
  version: string | undefined
}

export interface QuartzCheckout {
  describe?: string
  commit?: string
  branch?: string
  dirty?: boolean
  upstream?: string
  origin?: string
}

export function readQuartzVersion(root?: string): string | undefined
export function checkQuartzRequirement(
  range: unknown,
  version: string | undefined,
): RequirementResult
export function describeRequirementProblem(
  pluginName: string,
  result: RequirementResult,
  pluginVersion?: string,
): { message: string; hint: string } | undefined
export function describeDeprecation(
  pluginName: string,
  deprecated: unknown,
): { message: string; hint: string } | undefined
export function describeQuartzCheckout(root?: string): QuartzCheckout
export function formatQuartzVersion(version: string | undefined, checkout?: QuartzCheckout): string
export function incompatiblePluginsFailBuild(env?: Record<string, string | undefined>): boolean
export function brokenPluginsFailBuild(env?: Record<string, string | undefined>): boolean
export function isCI(env?: Record<string, string | undefined>): boolean
