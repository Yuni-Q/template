import QueryString from 'qs';
import useSWR, { SWRResponse } from 'swr';

import API from './API';

const defaultApi = new API();

interface Factory<RES, T, ERROR, K> {
  prefix?: API;
  onSuccess?: (res: RES | undefined) => T | RES | null;
  onFailure?: (error: ERROR) => K;
}

export const fetcherFactory = <RES, T = Record<string, any> | null | RES, ERROR = string, K = void>({
  prefix,
  onSuccess,
  onFailure,
}: Factory<RES, T, ERROR, K>) => {
  const api = prefix || defaultApi;
  return (url: string) => {
    return api
      .get(url)
      .then((res: RES): T | RES | null => {
        if (onSuccess) {
          return onSuccess(res);
        }
        return res || null;
      })
      .catch((error: ERROR): K | void => {
        if (onFailure) {
          return onFailure(error);
        }
        // TODO : TOAST 필요하지 않을까?
        console.log('error', error);
      });
  };
};

const defaultFetcher = fetcherFactory({ prefix: defaultApi });

export type APIResponse<T> = () => SWRResponseWrapper<T>;

export type APIResponseWithParams<T, P = unknown> = (params: P) => SWRResponseWrapper<T>;

type SWRResponseWrapper<T, E = unknown> = SWRResponse<T, E>;

export const useCommonSWR = <Data, Error = unknown>(
  url: string | null,
  data?: Record<string, string>,
  fetcher?: (url: string, prefix?: API<Record<string, unknown>> | undefined) => Promise<any>,
): SWRResponseWrapper<Data, Error> => {
  // QueryString
  if (!!url && data && typeof data !== 'string') {
    url += (url.match(/\?/) ? '&' : '?') + QueryString.stringify(data);
  }
  return useSWR(url, fetcher || defaultFetcher, { revalidateOnFocus: false, suspense: true });
};
