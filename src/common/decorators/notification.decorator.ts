export function Notification() {
  return function (
    target: any,
    property: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...data: any) {
      const result = await originalMethod.apply(this, data);
      console.log(data.at(-1), property);
      return result;
    };
  };
}
