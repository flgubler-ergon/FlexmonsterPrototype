import { Injectable } from '@angular/core';
import * as DOMPurify from "dompurify"

@Injectable({ providedIn: "root" })
export class TrustedTypesService {
  // This policy will sanitize any unsafe injection sinks that are not covered by another policy
  // See https://web.dev/trusted-types/#create-a-default-policy
  createDefaultPolicy(): TrustedTypePolicy | null {
    if (window.trustedTypes) {
      return window.trustedTypes.createPolicy("default", {
        createHTML: (input) => DOMPurify.sanitize(input),
        createScript: (input) => DOMPurify.sanitize(input),
        createScriptURL: (input) => DOMPurify.sanitize(input),
      })
    } else {
      return null
    }
  }
}
