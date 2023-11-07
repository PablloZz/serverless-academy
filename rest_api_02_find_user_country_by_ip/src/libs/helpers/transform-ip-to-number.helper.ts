function transformIpToNumber(ip: string) {
  const [firstOctet, secondOctet, thirdOctet, fourthOctet] = ip.split(".");

  return (
    Number(firstOctet) * 256 ** 3 +
    Number(secondOctet) * 256 ** 2 +
    Number(thirdOctet) * 256 +
    Number(fourthOctet)
  );
}

export { transformIpToNumber };
