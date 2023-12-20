import type { EnvironmentKind, HttpMethod } from '@Utility/Types';

export type RouterStructure<T extends string> = {
  [key in T]: {
    [key in HttpMethod]?: {
      environment: EnvironmentKind;
      service: string;
      domain: string;
      isPrivateUser?: boolean;
      isPrivateOrganization?: boolean;
    };
  };
};

export type DomainDocuments = {
  router?: RouterStructure<string>;
};

export type CollectorStructure = {
  domain: string;
  documents: DomainDocuments;
};
