import type { StdioOptions } from "node:child_process"

export interface RunOptions {
  cwd?: string
  env?: NodeJS.ProcessEnv
  stdio?: StdioOptions
  timeout?: number
}

export const GIT_TIMEOUT_MS: number
export const NPM_TIMEOUT_MS: number
export function assertCommit(commit: unknown): string
export function assertRef(ref: unknown): string
export function assertRepoUrl(url: unknown): string
export function assertNpmSpec(spec: unknown): string
export function git(args: string[], opts?: RunOptions): string
export function gitAsync(
  args: string[],
  opts?: RunOptions,
): Promise<{ stdout: string; stderr: string }>
export function npm(args: string[], opts?: RunOptions): string
export function npmAsync(
  args: string[],
  opts?: RunOptions,
): Promise<{ stdout: string; stderr: string }>
export function jsString(value: unknown): string
export function isIdentifier(name: unknown): boolean
export function npmCommand(
  args: string[],
  platform?: string,
): { file: string; args: string[]; shell: boolean }
