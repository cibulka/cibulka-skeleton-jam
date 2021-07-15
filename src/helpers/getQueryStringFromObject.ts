export default function getQueryStringFromObject(payload: Record<string, unknown>): string {
  const params = new URLSearchParams();
  Object.keys(payload).forEach((name: string) => {
    params.set(name, payload[name].toString());
  });
  return params.toString();
}
