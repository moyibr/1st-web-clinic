import { clinicConfig } from "@/config/clinic.config";
import type { ClinicConfig } from "@/config/clinic.config.schema";

/**
 * Single access point for the active client's config anywhere in the component tree.
 * Swapping clients never means touching a component — only this config module's source.
 */
export function useClinicConfig(): ClinicConfig {
  return clinicConfig;
}
